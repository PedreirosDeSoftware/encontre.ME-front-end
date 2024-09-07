import { useState } from 'react';
import styles from './css/style.module.css';
import {MagnifyingGlass } from '@phosphor-icons/react';

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
        placeholder="Quem deseja encontrar?"
      />
      <button className={styles.x} onClick={handleSearch}>
        <MagnifyingGlass/>  
      </button>
    </div>
  );
}

export default Search;
