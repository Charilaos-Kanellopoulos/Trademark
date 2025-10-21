import React, { useState, useEffect } from "react";
import "./Comments.css";

type Review = {
  rating: number;
  comment: string;
  author: string;

};

const reviews: Review[] = [
  {
    rating: 5,
    comment: "Εξαιρετικοί επαγγελματίες στην μέχρι τώρα συνεργασία μας. Σωστές κατευθύνσεις και τήρηση χρονοδιαγράμματος. Σημαντικό ότι υιοθετούν συνεχή ενημέρωση ως προς την εξέλιξη της διαδικασίας σε κάθε στάδιο υλοποίησης.",
    author: "Κυριάκος Φ."
  },
  {
    rating: 5,
    comment: "Άμεση και εύκολη συνεργασία μαζί τους. Πολύ ευγενικοί στην επικοινωνία.",
    author: "Νίκος Μ."

  },
  {
    rating: 5,
    comment: "Άμεση εξυπηρέτηση, υπευθυνότητα, επαγγελματική νοοτροπία",
    author: "Παρασκευή Τ."

  },
  {
    rating: 5,
    comment: "Σαφής πληροφόρηση, ευγένεια, ταχύτητα και καλή τιμή",
    author: "Αστέριος Π."
  },
  {
    rating: 5,
    comment: "Πολύτιμοι συνεργάτες με αξιοπιστία, υπευθυνότητα και άμεση εξυπηρέτηση. Επαρκής ενημέρωση του πελάτη με διακριτικότητα.",
    author: "Αγγελική Φ."

  },
  {
    rating: 5,
    comment: "Πολύ εξυπηρετικοί, απαντούν άμεσα και λύση με το κλειδί στο χέρι. Θα τους προτιμήσω και για άλλες επιχειρήσεις μας.",
    author: "Στυλιανός Φ."

  },
  {
    rating: 5,
    comment: "Η εταιρεία ανταποκρίθηκε άμεσα για την περίπτωση μου, ενημερώθηκα για όλες τις λεπτομέρειες και προχωρήσαμε πολύ γρήγορα με επιτυχία ! Επαγγελματισμός πέντε αστέρων χωρίς υπερβολή.",
    author: "Μιχαήλ Π."

  },
  {
    rating: 5,
    comment: "Πολύ καλή συνεργασία, άμεση επικοινωνία, πολύ λογικό κόστος, εξαιρετικά καταρτισμένοι και οργανωμένοι στο αντικείμενο τους! Συστήνονται.",
    author: "Συμεών Γ."

  },
  {
    rating: 5,
    comment: "Γνωρίζουν το αντικείμενο άριστα, σε ειδοποιούν πριν τη λήξη του και στέλνουν την ανανέωση στο email, να τους προτιμήσετε !!!!",
    author: "Δημήτρης Χ."

  },
  {
    rating: 5,
    comment: "Απολύτως ικανοποιημένοι από τη συνεργασία για τη διεκπεραίωση της υπόθεσής μας",
    author: "Ελευθερία Κ."

  },
  {
    rating: 5,
    comment: "Εξαιρετικοί επαγγελματίες! Μας καθοδήγησαν με σαφήνεια και συνέπεια σε κάθε στάδιο της διαδικασίας κατοχύρωσης σήματος. Η ευγένεια, η επαγγελματική προσέγγιση και η προσήλωση αποτυπώνονται σε κάθε ενέργειά τους. Τους συστήνουμε ανεπιφύλακτα.",
    author: "Opto Hellas"

  },
  {
    rating: 5,
    comment: "H συνεργασία μας ήταν πολύ καλή. Είναι γρήγοροι και συνεπείς. Σε γλυτώνουν από χρόνο και ψάξιμο και έχεις άμεσα μόλις ζητήσεις την εξέλιξη του θέματός σου. Θα συνεργαζόμουνα ξανά ευχαρίστως μαζί τους.",
    author: "Ασπασία Κ."
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
    }, 30000); // Increased to 30 seconds for better mobile UX

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
        <div className="container mb-3">
          <div className="text-center">
            <a href="https://www.google.com/search?sca_esv=952d9a3ded5a8be7&sxsrf=AE3TifMugzsqf9PM8J1aj7hQqdUT6HSHSA:1760364121380&q=smiles+trademarks&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E1Z4gQ8-Q0LhGMPI1k3yLZf5R4z8Z6YMEZS9tCs2r7vxumAIpQRD0t1E86TNs4ArF9jSsPA%3D&uds=AOm0WdF1eg4P3bLopmERYJ1GWcYkWKWSdDrN-HJPEkxUDtm2MCwLEP_rG2aOwygImSfGIhFagwXn9OmHC7ng_3cYVNP8cORbHszsfEdwMLDmFyTk-zeFSss&sa=X&ved=2ahUKEwjgg4Wxq6GQAxXihP0HHXZhIwkQ3PALegQIGhAE&biw=1536&bih=695&dpr=1.25" target="_blank" className="google_reviews_button">
              Δες όλες τις αξιολογήσεις
            </a>
          </div>
        </div>
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
