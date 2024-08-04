import{ useState } from 'react';
import styles from './css/style.module.css';
import Post from './../../components/Post';
import Search from './../../components/Search';
import { Header } from '../../components/Header';
import { CreatePost } from '../../components/CreatePost';

const mockPosts = [
  {
    fullname: 'Truetel - Kirlin',
    profileIcon: 'https://avatars.githubusercontent.com/u/64737334?v=4',
    profileName: 'Truetel - Kirlin',
    location: 'Westfield - Indie',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://avatars.githubusercontent.com/u/64737334?v=4',
  },
  {
    fullname: 'Ivandro Neto',
    profileIcon: 'https://avatars.githubusercontent.com/u/64737334?v=4',
    profileName: 'Ivandro Neto',
    location: '',
    description: '',
    image: 'https://avatars.githubusercontent.com/u/64737334?v=4',
  },
];

function Feed() {
  const [posts, setPosts] = useState(mockPosts);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // Implement search functionality here
  }

  return (
    <main className={styles.container}>
      <Header />
      <section className={styles.searchContainer}>
        <Search onSearch={handleSearch} />
      </section>
      
      <section className={styles.createPostContainer}>
        <CreatePost/>
      </section>
      
      <section className={styles.feedContainer}>
        {posts.map((post) => (
          <Post
            key={post.fullname}
            creatorProfile={post.profileIcon}
            creatorName={post.profileName}
            location={post.location}
            description={post.description}
            image={post.image}
          />
        ))}
      </section>
    </main>
  );
}

export default Feed;
