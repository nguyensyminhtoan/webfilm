import ListFilm from "../components/movie-type/list-film";
import styles from "./page.module.css";
import Banner from "@/components/banner/banner";
import fetchMovies from "../fetch-api.js/fetch-movies";
import NewMoviesCard from "../components/movie-card/new-movies-card";
import Link from "next/link";
async function fetchAllMovies()
{
  try
  {
    const [newMovies, featureMovies, moviesSeries, moviesAnimation, tvShows] = await Promise.all([
      fetchMovies('danh-sach/phim-moi-cap-nhat', 0),
      fetchMovies('v1/api/danh-sach/phim-le', 0),
      fetchMovies('v1/api/danh-sach/phim-bo', 0),
      fetchMovies('v1/api/danh-sach/hoat-hinh', 0),
      fetchMovies('v1/api/danh-sach/tv-shows', 0),
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
      tvShows: []
    };
  }
}


export default async function Home()
{
  const { newMovies, featureMovies, moviesSeries, moviesAnimation, tvShows } = await fetchAllMovies();
  return (
    <main className={styles.main}>
      <Banner movies={newMovies} />
      <section>
        <Link href='/phim-moi-cap-nhat'><h2>Phim Mới Cập Nhật</h2></Link>
        <div className={styles['new-movies']}>
          {newMovies ? (
            newMovies.items.map((movie) => (
              <NewMoviesCard key={movie._id} movie={movie} />
            ))
          ) : (
            <p>Đang update</p>
          )}
        </div>

      </section>
      <section>
        <Link href='/phim-le'><h2>Phim Lẻ</h2></Link>
        <ListFilm movies={featureMovies} />
      </section>
      <section>
        <Link href='/phim-bo'><h2>Phim Bộ</h2></Link>
        <ListFilm movies={moviesSeries} />
      </section>
      <section>
        <Link href='/phim-hoat-hinh'><h2>Phim Hoạt Hình</h2></Link>
        <ListFilm movies={moviesAnimation} />
      </section>
      <section>
        <Link href='/tv-shows'><h2>TV Shows</h2></Link>
        <ListFilm movies={tvShows} />
      </section>
    </main>
  );
}

