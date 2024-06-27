import ListFilm from "../components/movie-type/list-film";
import styles from "./page.module.css";
import Banner from "@/components/banner/banner";
import fetchMovies from "../fetch-api.js/fetch-movies";
import NewMoviesCard from "../components/movie-card/new-movies-card";
async function fetchAllMovies()
{
  try
  {
    const [newMovies, featureMovies, moviesSeries, moviesAnimation] = await Promise.all([
      fetchMovies('danh-sach/phim-moi-cap-nhat'),
      fetchMovies('v1/api/danh-sach/phim-le'),
      fetchMovies('v1/api/danh-sach/phim-bo'),
      fetchMovies('v1/api/danh-sach/hoat-hinh'),
    ]);

    return { newMovies, featureMovies, moviesSeries, moviesAnimation };
  } catch (error)
  {
    console.error('Fetch lỗi:', error.message);
    return {
      newMovies: [],
      featureMovies: [],
      moviesSeries: [],
      moviesAnimation: [],
    };
  }
}


export default async function Home()
{
  const { newMovies, featureMovies, moviesSeries, moviesAnimation } = await fetchAllMovies();
  return (
    <main className={styles.main}>
      <Banner movies={newMovies} />
      <section>
        <h2>Phim Mới Cập Nhật</h2>
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
        <h2>Phim Lẻ</h2>
        <ListFilm movies={featureMovies} />
      </section>
      <section>
        <h2>Phim Bộ</h2>
        <ListFilm movies={moviesSeries} />
      </section>
      <section>
        <h2>Phim Hoạt Hình</h2>
        <ListFilm movies={moviesAnimation} />
      </section>
    </main>
  );
}

