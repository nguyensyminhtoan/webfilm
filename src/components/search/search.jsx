'use client'
import styles from './search.module.css'
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'
export default function Search({ setMenu })
{
  const [isSearchBoxVisible, setIsSearchBoxVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const searchBoxRef = useRef(null);
  const debounceTimeout = useRef(null);
  const router = useRouter();
  const handleFocus = () =>
  {
    setIsSearchBoxVisible(true);
  };
  const handleBlur = (event) =>
  {

    setTimeout(() =>
    {
      if (!searchBoxRef.current.contains(document.activeElement))
      {
        setIsSearchBoxVisible(false);
      }
    }, 100);
  };
  const handleSearch = (event) =>
  {
    setSearchTerm(event.target.value);
    if (debounceTimeout.current)
    {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() =>
    {
      if (event.target.value)
      {
        fetchData(event.target.value);
      } else
      {
        setResults([]);
      }
    }, 500)
  };
  const fetchData = async (query) =>
  {
    try
    {
      setIsLoading(true)
      const response = await fetch(` https://phimapi.com/v1/api/tim-kiem?keyword=${query}&limit=12`)
      if (!response.ok)
      {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data.data);
      setIsLoading(false)
    } catch (error)
    {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  const handleCardClick = (slug) =>
  {
    setSearchTerm('')
    router.push(`/${slug}`); // Use router.push to navigate to /tên-phim
  };
  return <div className={styles.search}>
    <input
      placeholder="Tìm phim"
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={searchTerm}
      onChange={handleSearch}
    ></input>
    <div
      ref={searchBoxRef}
      className={`${styles['search-box']} ${isSearchBoxVisible ? styles.visible : ''}`}
    >
      <ul className={styles.list} >
        {results.items && !isLoading ? results.items.map((movie, index) => (
          < li key={index} style={{ display: 'flex', gap: "10px", padding: "5px", width: "100%" }} onClick={() =>
          {
            handleCardClick(movie.slug)
            setMenu(false)
          }}>
            <img src={`https://img.phimapi.com/${movie.thumb_url}`} alt={movie.name} />
            <span>{movie.name}</span>
          </li>
        )) : !searchTerm && <div className={styles.centered}><p >Nhập tên phim để tìm kiếm</p></div>}
        {isLoading && <div className={styles.spinner}>
          <div className={`${styles.blob} ${styles["blob-0"]}`}></div>
        </div>}
        {results.items && !isLoading && results.items.length === 0 ? <p className={styles.centered}>không tìm thấy phim</p> : ''}
      </ul>
    </div>
  </div >
}