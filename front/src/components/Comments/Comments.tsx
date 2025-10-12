import React, { useState, useEffect } from "react";
import "./Comments.css";

type Review = {
  rating: number;
  timeAgo: string;
  title: string;
  comment: string;
  author: string;
  
};

const reviews: Review[] = [
  {
    rating: 5,
    timeAgo: "1 year ago",
    title: "Excellent trademark protection!",
    comment: "Great service and very professional team. If you want to protect your trademark effectively, this is the place to go.",
    author: "Maria Papadopoulou"
   
  },
  {
    rating: 5,
    timeAgo: "8 months ago", 
    title: "Outstanding support service!",
    comment: "The Trademark Radar team provided exceptional guidance throughout the entire process. Highly recommended for any business.",
    author: "Dimitris Kostas"
    
  },
  {
    rating: 4,
    timeAgo: "6 months ago",
    title: "Professional and reliable",
    comment: "Very satisfied with the service quality. The monitoring system works perfectly and alerts are sent promptly.",
    author: "Sofia Alexandrou"
    
  },
  {
    rating: 5,
    timeAgo: "3 months ago",
    title: "Best trademark monitoring!",
    comment: "Comprehensive protection for our brand. The team is always available to help and provide expert advice.",
    author: "Nikos Petridis"
    
  },
  {
    rating: 5,
    timeAgo: "2 months ago",
    title: "Highly professional service",
    comment: "Excellent experience from start to finish. The trademark registration process was smooth and well-guided.",
    author: "Elena Stavrou"
    
  },
  {
    rating: 4,
    timeAgo: "1 month ago",
    title: "Great value for money",
    comment: "Quality service at competitive prices. The monitoring alerts have saved us from potential trademark conflicts.",
    author: "Kostas Nikolaou"
    
  }
];

const Comments: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // Calculate total number of slides
  const totalSlides = Math.ceil(reviews.length / cardsToShow);
  const currentSlide = Math.floor(currentIndex / cardsToShow);

  useEffect(() => {
    const updateCardsToShow = () => {
      const newCardsToShow = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
      setCardsToShow(newCardsToShow);
      // Reset to beginning when cards to show changes to avoid out of bounds
      setCurrentIndex(0);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + cardsToShow;
        return nextIndex >= reviews.length ? 0 : nextIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [cardsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + cardsToShow;
      return nextIndex >= reviews.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        // Go to last complete slide
        const lastCompleteSlide = Math.floor((reviews.length - 1) / cardsToShow) * cardsToShow;
        return lastCompleteSlide;
      }
      return prevIndex - cardsToShow;
    });
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex * cardsToShow);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section className="comments">
      <div className="comments__container">
        <h2 className="comments__title">Τι είπαν για την ομάδα του Trademark Radar;</h2>
        
        <div className="comments__carousel">
          <button className="comments__nav comments__nav--prev" onClick={prevSlide}>
            &#8249;
          </button>
          
          <div className="comments__track-container">
            <div 
              className="comments__track"
              style={{
                transform: `translateX(-${(currentIndex / reviews.length) * 100}%)`,
                width: `${reviews.length * (100 / cardsToShow)}%`
              }}
            >
              {reviews.map((review, i) => (
                <div key={i} className="comments__card" style={{ width: `${100 / reviews.length}%` }}>
                  <div className="comments__rating">
                    {renderStars(review.rating)}
                  </div>
                  
                  <div className="comments__time">{review.timeAgo}</div>
                  
                  <h3 className="comments__card-title">{review.title}</h3>
                  
                  <p className="comments__comment">{review.comment}</p>
                  
                  <div className="comments__author">
                    
                    <span className="comments__author-name">{review.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="comments__nav comments__nav--next" onClick={nextSlide}>
            &#8250;
          </button>
        </div>

        <div className="comments__dots">
          {Array.from({ length: totalSlides }, (_, i) => (
            <button
              key={i}
              className={`comments__dot ${currentSlide === i ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Comments;
