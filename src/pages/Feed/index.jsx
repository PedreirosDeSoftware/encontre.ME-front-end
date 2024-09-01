import { useState, useEffect } from 'react';
import styles from './css/style.module.css';
import Post from './../../components/Post';
import Search from './../../components/Search';
import Account from './../../components/Account';
import { CreatePost } from '../../components/CreatePost';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UseAuth } from '../../context/AuthContext';
import { Loading } from '../../components/Loading';

function Feed() {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState(null); // State to hold the current account data
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { account: token, logout } = UseAuth(); // Get the token from the AuthContext

  const handleLogout = () => logout();

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    const fetchAccount = async () => {
      try {
        const authResponse = await axios.get("http://localhost:3333/api/account/authorization", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (authResponse.data.authToken) {
          const accountResponse = await axios.get(`http://localhost:3333/api/account/${authResponse.data.authToken.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (accountResponse.data && accountResponse.data.account) {
            setCurrentAccount(accountResponse.data.account); // Set the current account data in state
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
          const accountCreator = await axios.get(`http://localhost:3333/api/account/${post.account_id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const creator = accountCreator.data.account;
          return {
            id: post.id,
            avatarImage: creator.avatarImage,
            accountname: creator.name,
            location: `${creator.state} - ${creator.city}`,
            image: `http://localhost:3333/uploads/${post.photo}`,
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

    fetchAccount();
    fetchPosts();
  }, [navigate, token]);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  if (loading) return <Loading/>;
  if (error) return navigate('/login');

  return (
    <main className={styles.container}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src="logo.svg" alt="Logo" />
        </div>
        <div className={styles.links}>
            <Link to={'/'}><span className={styles.item}>Encontrar pessoas</span></Link>
            <Link to={'/sos'}><span className={`${styles.item} ${styles.alert}`}>S.O.S</span></Link>
            <Link to={'/instituicoes'}><span className={styles.item}>Encontrar instituições</span></Link>
        </div>
        <div className={styles.accountContainer}>
          {currentAccount ? (
            <Account.Short
                image={currentAccount.avatarImage || ""} // Replace with actual image URL
                accountname={currentAccount.name} // Replace with actual accountname
                />
          ) : (
            <p>Loading account data...</p>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn}><img src="logout.png" alt="logout"/></button>
        </div>
      </nav>
      
        <Search onSearch={handleSearch} />
      
      <section className={styles.createPostContainer}>
        {currentAccount ? (
          <CreatePost accountAvatar={currentAccount.avatarImage} accountname={currentAccount.name} />
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
              creatorName={post.accountname}
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
