'use client'
import { useState } from 'react';
import styles from './new-movies-card.module.css'
import { useRouter } from 'next/navigation';
export default function NewMoviesCard({ movie })
{
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${movie.poster_url})`;
  const overlayColor = isHovered
    ? "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(95, 250, 242, 0.3))"
    : "linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1))"
  const handleCardClick = () =>
  {
    router.push(`/${movie.slug}`); // Use router.push to navigate to /tên-phim
  };
  return <div className={styles.card} style={{ backgroundImage }} onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)} onClick={handleCardClick}>
    <div
      style={{
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "50%",
        background: overlayColor,
        transition: "background 0.3s ease",
      }}
    ></div>
    <p>{movie.year}</p>
    <p>{movie.name}</p>
  </div>
}