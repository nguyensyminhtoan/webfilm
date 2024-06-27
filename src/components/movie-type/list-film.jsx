import styles from "./list-film.module.css"

import MovieCard from "../movie-card/movie-card"
export default function ListFilm({ movies })
{


  return <section >
    <div className={styles.movies}>
      {movies.data.items.map((movie) =>
      {
        return <MovieCard movie={movie} key={movie._id} r></MovieCard>
      })}
    </div>
  </section>
}