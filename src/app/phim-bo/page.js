'use client'
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PhimBo()
{
  const [dataMovies, setDataMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  useEffect(() =>
  {
    async function fetchMovies(page)
    {
      const response = await fetch(`https://phimapi.com/v1/api/danh-sach/phim-bo?page=${page}`)
      if (!response.ok)
      {
        throw new Error('Fetch lỗi');
      }
      const data = await response.json()
      setDataMovies(data.data.items)
      setTotalPages(data.data.params.pagination.totalPages)
      setTitle(data.data.seoOnPage.titleHead)
      setDescription(data.data.seoOnPage.descriptionHead)
    }
    fetchMovies(currentPage)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }
    , [currentPage])
  const nextPage = () =>
  {
    if (currentPage < totalPages)
    {
      setCurrentPage(currentPage + 1);
    }
  }
  const prePage = () =>
  {
    if (currentPage > 2)
    {
      setCurrentPage(currentPage - 1);
    }
  }
  const handlePageInputChange = (e) =>
  {
    let pageNumber = parseInt(e.target.value, 10);
    if (!isNaN(pageNumber))
    {
      if (pageNumber < 1)
      {
        pageNumber = 1;
      } else if (pageNumber > totalPages)
      {
        pageNumber = totalPages;
      }
      setCurrentPage(pageNumber);
    }
  };
  const handleCardClick = (slug) =>
  {
    router.push(`/${slug}`);
  };

  return <>
    <title>{title}</title>
    <meta name='description' content={description}></meta>
    <main className={styles.phimle}>
      <h1 className={styles.heading}> Phim bộ </h1>
      <div className={styles.container}>
        {dataMovies && dataMovies.map((movie, index) =>
        {
          return <div className={styles.card} key={index} onClick={() => handleCardClick(movie.slug)}>
            <img src={`https://img.phimapi.com/${movie.poster_url}`} alt={movie.name}></img>
            <h2 className={styles['vn-name']}>{movie.name}</h2>
            <h3 className={styles['origin-name']}>{`${movie['origin_name']} (${movie.year})`}</h3>
          </div>
        })}
        <div className={styles.pagination}>
          <svg onClick={prePage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M32 96C14.3 96 0 110.3 0 128s14.3 32 32 32l208 0 0-64L32 96zM192 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0zm-64-64c0 17.7 14.3 32 32 32l48 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-48 0c-17.7 0-32 14.3-32 32zm96 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0zm88-96l-.6 0c5.4 9.4 8.6 20.3 8.6 32c0 13.2-4 25.4-10.8 35.6c24.9 8.7 42.8 32.5 42.8 60.4c0 11.7-3.1 22.6-8.6 32l8.6 0c88.4 0 160-71.6 160-160l0-61.7c0-42.4-16.9-83.1-46.9-113.1l-11.6-11.6C429.5 77.5 396.9 64 363 64l-27 0c-35.3 0-64 28.7-64 64l0 88c0 22.1 17.9 40 40 40s40-17.9 40-40l0-56c0-8.8 7.2-16 16-16s16 7.2 16 16l0 56c0 39.8-32.2 72-72 72z" /></svg>
          <input
            type='number'
            min='1'
            max={totalPages}
            value={currentPage}
            onChange={handlePageInputChange}
          >
          </input>
          <p>of {totalPages} pages</p>
          <svg onClick={nextPage} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M480 96c17.7 0 32 14.3 32 32s-14.3 32-32 32l-208 0 0-64 208 0zM320 288c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm64-64c0 17.7-14.3 32-32 32l-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0c17.7 0 32 14.3 32 32zM288 384c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0zm-88-96l.6 0c-5.4 9.4-8.6 20.3-8.6 32c0 13.2 4 25.4 10.8 35.6C177.9 364.3 160 388.1 160 416c0 11.7 3.1 22.6 8.6 32l-8.6 0C71.6 448 0 376.4 0 288l0-61.7c0-42.4 16.9-83.1 46.9-113.1l11.6-11.6C82.5 77.5 115.1 64 149 64l27 0c35.3 0 64 28.7 64 64l0 88c0 22.1-17.9 40-40 40s-40-17.9-40-40l0-56c0-8.8-7.2-16-16-16s-16 7.2-16 16l0 56c0 39.8 32.2 72 72 72z" /></svg>
        </div>
      </div>
    </main>
  </>
}