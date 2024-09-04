import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UseAuth } from '../../context/AuthContext';
import styles from './css/style.module.css';
import Post from './../../components/Post';
import Search from './../../components/Search';
import Account from './../../components/Account';
import { CreatePost } from '../../components/CreatePost';
import { Loading } from '../../components/Loading';
import { Sos } from '../../components/SVG/Sos';

function Feed() {
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { account: token, logout } = UseAuth();

  // Handle logout
  const handleLogout = () => logout();

  // Fetch account data
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAccount = async () => {
      try {
        const authResponse = await axios.get("http://localhost:3333/api/account/authorization", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const authToken = authResponse.data.authToken;
        if (authToken) {
          const accountResponse = await axios.get(`http://localhost:3333/api/account/${authToken.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (accountResponse.data && accountResponse.data.account) {
            setCurrentAccount(accountResponse.data.account);
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
          headers: { Authorization: `Bearer ${token}` },
        });

        const postList = response.data.posts || [];
        const newPostList = await Promise.all(
          postList.map(async (post) => {
            const accountCreator = await axios.get(`http://localhost:3333/api/account/${post.account_id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            const creator = accountCreator.data.account;
            return {
              id: post.id,
              avatarImage: creator.avatarImage ? `http://localhost:3333/uploads/${creator.avatarImage}` : null,
              accountname: creator.name,
              location: `${creator.state} - ${creator.city}`,
              image: `http://localhost:3333/uploads/${post.photo}`,
              description: post.description,
            };
          })
        );

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

  // Handle search functionality (if implemented)
  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  // Display loading or error messages
  if (loading) return <Loading />;
  if (error) return navigate('/login');

  return (
    <main className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img src="Logo.svg" alt="Logo" />
        </div>
        <div className={styles.links}>
          <Link to="/">
            <span className={styles.item}>
              <img src="search.svg" alt="Search Icon" />
              Encontrar pessoas
            </span>
          </Link>
          <Link to="/sos">
            <span className={`${styles.item} ${styles.alert}`}>
              <Sos color="#F44556" />
              S.O.S
            </span>
          </Link>
          <Link to="/instituicoes">
            <span className={styles.item}>
              <img src="binocular.svg" alt="Binocular Icon" />
              Encontrar instituições
            </span>
          </Link>
        </div>
        <div className={styles.accountContainer}>
          {currentAccount ? (
          <Link to={"/profile"}>
            <Account.Short
            image={currentAccount.avatarImage ? `http://localhost:3333/uploads/${currentAccount.avatarImage}` : ""}
            accountname={currentAccount.name}
            />
            </Link>
          ) : (
            <p>Loading account data...</p>
          )}
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <img src="logout.png" alt="Logout" />
          </button>
        </div>
      </nav>

      {/* Search */}
      <Search onSearch={handleSearch} />

      {/* Create Post Section */}
      <section className={styles.createPostContainer}>
        {currentAccount ? (
          <CreatePost
            accountAvatar={currentAccount.avatarImage ? `http://localhost:3333/uploads/${currentAccount.avatarImage}` : null}
            accountname={currentAccount.name}
          />
        ) : (
          <p>Loading create post section...</p>
        )}
      </section>

      {/* Feed Section */}
      <section className={styles.feedContainer}>
        {posts.length === 0 ? (
          <h1>No posts found...</h1>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
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
