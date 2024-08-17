import { useState, useEffect } from 'react';
import styles from './css/style.module.css';
import Post from './../../components/Post';
import Search from './../../components/Search';
import User from './../../components/User';
import { CreatePost } from '../../components/CreatePost';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UseAuth } from '../../context/AuthContext';

function Feed() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null); // State to hold the current user data
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: token, logout } = UseAuth(); // Get the token from the AuthContext

  const handleLogout = () => logout();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    const fetchUser = async () => {
      try {
        const authResponse = await axios.get("http://localhost:3333/api/user/authorization", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authResponse.data.authToken) {
          const userResponse = await axios.get(`http://localhost:3333/api/user/${authResponse.data.authToken.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.data && userResponse.data.user) {
            setCurrentUser(userResponse.data.user); // Set the current user data in state
          } else {
            navigate('/login');
          }
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3333/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const postList = response.data.posts || [];
        const postPromises = postList.map(async (post) => {
          const userCreator = await axios.get(`http://localhost:3333/api/user/${post.user_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const creator = userCreator.data.user;
          return {
            id: post.id,
            avatarImage: creator.avatarImage,
            username: creator.name,
            location: `${creator.state} - ${creator.city}`,
            image: post.photo,
            description: post.description
          };
        });

        const newPostList = await Promise.all(postPromises);
        setPosts(newPostList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchPosts();
  }, [navigate, token]);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src="" alt="Logo" />
        </div>
        <div className={styles.userContainer}>
          {currentUser ? (
            <div className={styles.navbar}>
              <User.Short
                image={currentUser.avatarImage || ""} // Replace with actual image URL
                username={currentUser.name} // Replace with actual username
              />
              <button onClick={handleLogout} className={styles.logoutBtn}>{'>'}</button>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </nav>
      <section className={styles.searchContainer}>
        <Search onSearch={handleSearch} />
      </section>
      
      <section className={styles.createPostContainer}>
        {currentUser ? (
          <CreatePost userAvatar={currentUser.avatarImage} username={currentUser.name} />
        ) : (
          <p>Loading create post section...</p>
        )}
      </section>
      
      <section className={styles.feedContainer}>
        {posts.length === 0 ? (
          <h1>No posts found...</h1>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id} // Use a unique identifier if available
              creatorProfile={post.avatarImage}
              image={post.image}
              creatorName={post.username}
              location={post.location}
              description={post.description}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Feed;
