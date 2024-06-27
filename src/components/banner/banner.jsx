'use client'
import { useState, useEffect } from 'react';
import styles from './banner.module.css'
import { useRouter } from 'next/navigation';

export default function Banner({ movies })
{


  const [slideIndex, setSlideIndex] = useState(0);
  const router = useRouter();
  const totalSlides = movies.items.length

  useEffect(() =>
  {
    //Tự động chuyển slide sau mỗi 5 giây
    const interval = setInterval(() =>
    {
      setSlideIndex((slideIndex + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [slideIndex]);
  const nextSlide = () =>
  {
    setSlideIndex((slideIndex + 1) % totalSlides);
  };

  const prevSlide = () =>
  {
    setSlideIndex((slideIndex - 1 + totalSlides) % totalSlides);
  };
  const handleCardClick = (movie) =>
  {
    router.push(`/${movie.slug}`);
  };
  return <div className={styles['banner-container']}>
    <div className={styles["banner-slides"]} style={{ transform: `translateX(${-slideIndex * 100}%)` }}>
      {movies.items.map((slide, index) =>
      {
        return <div key={index} className={styles["banner-slide"]} onClick={() => handleCardClick(slide)}>
          <img src={slide.thumb_url} alt={slide.thumb_url} />
          <p>{slide['origin_name']}</p>
        </div>
      }
      )}
    </div>

    <button className={styles["prev-btn"]} onClick={prevSlide}>&lt;</button>
    <button className={styles["next-btn"]} onClick={nextSlide}>&gt;</button>
  </div>
}