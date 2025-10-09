import React from "react";
import "./HeroIntro.css";

const HeroIntro: React.FC = () => {
  return (
    <section className="hero-intro">
      <div className="hero-intro__container">
        <h1 className="hero-intro__title">
          To Trademark Radar ειναι ο άγρυπνος φύλακας<br />
          του σήματός σας
        </h1>

        <hr className="hero-intro__rule" />

        <p className="hero-intro__text">
          Το Trademark Radar είναι μια υπηρεσία που σκανάρει καθημερινά τα εμπορικά
          σήματα του ανταγωνισμού και σας ενημερώνει έγκαιρα για να λάβετε τα σωστά 
          μέτρα.
        </p>

        <button className="hero-intro__btn" type="button">
          Πώς λειτουργεί ;
        </button>
      </div>
    </section>
  );
};

export default HeroIntro;
