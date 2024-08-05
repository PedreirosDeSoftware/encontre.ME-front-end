import { useState, useEffect } from 'react';
import styles from './css/style.module.css';
import User from './../../components/User';
import Post from './../../components/Post';
import Search from './../../components/Search';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // Adiciona estado para o usuário logado

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/user'); // Ajuste o endpoint se necessário
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCurrentUser(data);
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3333/api/posts'); // Ajuste o endpoint se necessário
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchPosts();
  }, []); // Dependência vazia significa que isso roda uma vez quando o componente monta

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implemente a funcionalidade de busca aqui
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
          {currentUser && (
            <User.Short
              image={currentUser.profileImage} // Supondo que a resposta da API tenha um campo profileImage
              username={currentUser.username}  // Supondo que a resposta da API tenha um campo username
            />
          )}
        </div>
      </nav>
      <section className={styles.searchContainer}>
        <Search onSearch={handleSearch} />
      </section>
      <section className={styles.feedContainer}>
        {posts.map((post) => (
          <Post
            key={post.id} // Use um identificador único se disponível
            image={post.image}
            username={post.profileName}
            location={post.location}
            description={post.description}
          />
        ))}
      </section>
    </main>
  );
}

export default Feed;
