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
          <img src={slide.thumb_url} alt={slide.name} />
          <p>{slide['origin_name']}</p>
        </div>
      }
      )}
    </div>

    <button className={styles["prev-btn"]} onClick={prevSlide}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg></button>
    <button className={styles["next-btn"]} onClick={nextSlide}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg></button>
  </div>
}