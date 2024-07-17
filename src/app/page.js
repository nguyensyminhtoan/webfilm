
import ListFilm from '../components/movie-type/list-film';
import styles from './page.module.css';
import Banner from '@/components/banner/banner';
import fetchMovies from '../fetch-api.js/fetch-movies';
import NewMoviesCard from '../components/movie-card/new-movies-card';
import Link from 'next/link';



async function fetchAllMovies()
{
  try
  {
    const fetchOptions = {
      headers: {
        'Cache-Control': 'no-store',
      },
      next: { revalidate: 3600 }
    };

    const [newMovies, featureMovies, moviesSeries, moviesAnimation, tvShows] = await Promise.all([
      fetch('https://phimapi.com/danh-sach/phim-moi-cap-nhat', fetchOptions).then(res => res.json()),
      fetch('https://phimapi.com/v1/api/danh-sach/phim-le', fetchOptions).then(res => res.json()),
      fetch('https://phimapi.com/v1/api/danh-sach/phim-bo', fetchOptions).then(res => res.json()),
      fetch('https://phimapi.com/v1/api/danh-sach/hoat-hinh', fetchOptions).then(res => res.json()),
      fetch('https://phimapi.com/v1/api/danh-sach/tv-shows', fetchOptions).then(res => res.json()),
    ]);

    return { newMovies, featureMovies, moviesSeries, moviesAnimation, tvShows };
  } catch (error)
  {
    console.error('Fetch lỗi:', error.message);
    return {
      newMovies: [],
      featureMovies: [],
      moviesSeries: [],
      moviesAnimation: [],
      tvShows: [],
    };
  }
}



export default async function Home()
{
  const { newMovies, featureMovies, moviesSeries, moviesAnimation, tvShows } = await fetchAllMovies();

  return (<>
    <title>Phim247 | Phim247.vn | Xem phim mới | Phim hay | Phim chiếu rạp</title>
    <meta name='description' content='Phim Mới chất lượng cao miễn phí. Xem phim hd VietSub. Phim thuyết minh chất lượng HD. Kho phim247.vn chuẩn nhanh online hay hấp dẫn.'></meta>
    <main className={styles.main}>
      <Banner movies={newMovies} />
      <section>
        <Link href="/phim-moi-cap-nhat">
          <h2>Phim Mới Cập Nhật</h2>
        </Link>
        <div className={styles['new-movies']}>
          {newMovies ? (
            newMovies.items.map((movie) => <NewMoviesCard key={movie._id} movie={movie} />)
          ) : (
            <p>Đang update</p>
          )}
        </div>
      </section>
      <section>
        <Link href="/phim-le">
          <h2>Phim Lẻ</h2>
        </Link>
        <ListFilm movies={featureMovies} />
      </section>
      <section>
        <Link href="/phim-bo">
          <h2>Phim Bộ</h2>
        </Link>
        <ListFilm movies={moviesSeries} />
      </section>
      <section>
        <Link href="/phim-hoat-hinh">
          <h2>Phim Hoạt Hình</h2>
        </Link>
        <ListFilm movies={moviesAnimation} />
      </section>
      <section>
        <Link href="/tv-shows">
          <h2>TV Shows</h2>
        </Link>
        <ListFilm movies={tvShows} />
      </section>

    </main>

  </>
  );
}
