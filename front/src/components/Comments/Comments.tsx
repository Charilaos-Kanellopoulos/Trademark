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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance required to trigger a slide change
  const minSwipeDistance = 50;

  // Calculate total number of slides
  const totalSlides = Math.ceil(reviews.length / cardsToShow);

  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      let newCardsToShow;
      
      if (width <= 480) {
        newCardsToShow = 1; // Mobile
      } else if (width <= 768) {
        newCardsToShow = 1; // Small tablet
      } else if (width <= 1024) {
        newCardsToShow = 2; // Tablet
      } else {
        newCardsToShow = 3; // Desktop
      }
      
      setCardsToShow(newCardsToShow);
      // Reset to beginning when cards to show changes to avoid out of bounds
      setCurrentSlide(0);
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide: number) => {
        return (prevSlide + 1) % totalSlides;
      });
    }, 5000); // Increased to 5 seconds for better mobile UX

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide: number) => {
      return (prevSlide + 1) % totalSlides;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide: number) => {
      return prevSlide === 0 ? totalSlides - 1 : prevSlide - 1;
    });
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  // Get current reviews to display
  const getCurrentReviews = () => {
    const startIndex = currentSlide * cardsToShow;
    const endIndex = startIndex + cardsToShow;
    return reviews.slice(startIndex, endIndex);
  };

  return (
    <section className="comments">
      <div className="comments__container">
        <h2 className="comments__title">Τι είπαν για την ομάδα του Trademark Radar;</h2>
        
        <div className="comments__carousel">
          <button className="comments__nav comments__nav--prev" onClick={prevSlide}>
            &#8249;
          </button>
          
          <div 
            className="comments__track-container"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="comments__cards-container">
              {getCurrentReviews().map((review, index) => (
                <div key={currentSlide * cardsToShow + index} className="comments__card">
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
