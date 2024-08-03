import { useState } from 'react';
import styles from './css/style.module.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  }

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Qual o nome da pessoa que deseja encontrar?"
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

export default Search;
