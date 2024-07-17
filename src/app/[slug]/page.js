'use client'

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css'
import NewMoviesCard from '@/components/movie-card/new-movies-card';
import { useSearchParams, useRouter } from 'next/navigation';


const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });


export default function Movie({ params })
{
  const [newMovies, setNewMovies] = useState([]);
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true);
  const [movieUrl, setMovieUrl] = useState('')
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [inputEpisode, setInputEpisode] = useState(1);
  const [movieName, setMovieName] = useState('')
  const [description, setDescription] = useState('')
  const searchParams = useSearchParams();
  const router = useRouter();


  useEffect(() =>
  {

    function fetchNewMovies()
    {
      fetch('https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=1')
        .then(response =>
        {
          if (!response.ok)
          {
            throw new Error('Fetch lỗi');
          }
          return response.json();
        })
        .then(data =>
        {

          setNewMovies(data);
        })
        .catch(error =>
        {
          console.error('Fetch lỗi:', error.message);
          setNewMovies([]);
        });
    }

    fetchNewMovies();
  }, []);
  useEffect(() =>
  {
    const tap = searchParams.get('tap');

    if (tap)
    {
      const parsedTap = parseInt(tap, 10);
      setInputEpisode(parsedTap);
      setCurrentEpisode(parsedTap);
    }
  }, [searchParams]);
  useEffect(() =>
  {

    function fetchMovie()
    {
      setLoading(true)
      fetch(`https://phimapi.com/phim/${params.slug}`)
        .then((response) =>
        {
          if (!response.ok)
          {
            throw new Error('Fetch lỗi');
          }
          return response.json();
        })
        .then(data =>
        {

          setLoading(false);
          setMovie(data)
          setMovieName(`${data.movie.name} - ${data.movie.origin_name}(${data.movie.year}) Vietsub fullHD`)
          setDescription(data.movie.content)
          if (data.movie.episode_total === '1')
          {


            setMovieUrl(data.episodes[0].server_data[0].link_m3u8)

          }
          else
          {
            const totalEpisodes = data.episodes[0].server_data.length;
            if (currentEpisode > totalEpisodes)
            {
              setCurrentEpisode(1);
              setMovieUrl(data.episodes[0].server_data[0].link_m3u8);
              router.push(`/${params.slug}?tap=1`, undefined, { shallow: true });
            } else
            {

              setMovieUrl(data.episodes[0].server_data[currentEpisode - 1].link_m3u8);
            }
            setLoading(false)
          }

        })
        .catch(error =>
        {
          console.error('Fetch lỗi:', error.message);
          setMovie(null);
          setLoading(true);
        })
    }
    if (params.slug)
    {

      fetchMovie();
    }
  }, [
    params.slug, currentEpisode, router
  ])
  const handleSvgClick = () =>
  {
    const totalEpisodes = movie.episodes[0].server_data.length;
    const episode = inputEpisode > totalEpisodes ? 1 : inputEpisode;
    setCurrentEpisode(episode);
    router.push(`/${params.slug}?tap=${episode}`, undefined, { shallow: true });
  };
  const handleEpisodeClick = (episode) =>
  {
    setInputEpisode(episode)
    setCurrentEpisode(episode);
    router.push(`/${params.slug}?tap=${episode}`, undefined, { shallow: true });
  };
  return <>
    <title>{movieName}</title>
    <meta name='description' content={description}></meta>
    <main className={styles.main}>
      <div className={styles['container-player-episode']}>
        <div className={styles.playerWrapper}>
          {!loading && movie ? (
            <ReactPlayer
              url={movieUrl}
              controls={true}
              width="100%"
              height="100%"
              className={styles.reactPlayer}
              playing={true}
              playsinline={true}
            />
          ) : (
            <div className={styles.spinner}>
              <div className={`${styles.blob} ${styles["blob-0"]}`}></div>
              <p>loading...</p>
            </div>
          )}

        </div>
        <div className={styles['episode-list']}>
          <h4>Danh sách tập</h4>
          <div className={styles['choose-episode']}>
            <p>Tổng số tập: {movie && movie.movie && movie.movie.episode_total}</p>
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <p>Tập</p>
              <input
                type='number'
                value={inputEpisode}
                min='1'
                max={movie && movie.movie && movie.movie.episode_total}
                onChange={(e) => setInputEpisode(parseInt(e.target.value, 10))}
              ></input>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" onClick={handleSvgClick}><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
            </div>
          </div>
          <div className={styles.episodes}>
            {movie && movie.episodes && movie.episodes[0].server_data.map((episode, index) => (
              <span
                key={index}
                onClick={() => handleEpisodeClick(index + 1)}
                className={index + 1 === currentEpisode ? styles.currentEpisode : ''}
              >
                {episode.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        {movie && movie.movie && <h2>{movie.movie.name}</h2>}
        <div className={styles.detail}>
          {movie && movie.movie && <img src={movie.movie.poster_url}></img>}
          <div className={styles.content}>
            <span>Thể loại:</span>{movie && movie.movie && movie.movie.category.map((category, index) =>
            {
              return <span key={index}>{category.name}</span>
            })}
            {movie && movie.movie && <p>Quốc gia: {movie.movie.country[0].name}</p>}
            {movie && movie.movie && <p>{movie.movie.content}</p>}
          </div>
        </div>
      </div>
      <div className={styles['today']}>
        <h2>HÔM NAY XEM GÌ</h2>
        <div className={styles['new-movies']}>
          {newMovies && newMovies.items ? (
            newMovies.items.map((movie) => (
              <NewMoviesCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p>Đang update</p>
          )}
        </div>
      </div>
    </main >
  </>

}
