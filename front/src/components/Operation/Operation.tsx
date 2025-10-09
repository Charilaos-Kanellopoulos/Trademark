import React from "react";
import "./Operation.css";

type Tile = {
  image: string;        // url ή import
  ribbonTitle: string;  // κείμενο στην μοβ κορδέλα
  ribbonSub?: string;   // μικρό κείμενο κάτω από το ribbonTitle (προαιρετικό)
  caption: string;      // λεζάντα κάτω από το εξώφυλλο
};

type Props = {
  title?: string;
  subtitle?: string;
  items?: Tile[];
};


const Operation: React.FC<Props> = ({
  title = "Deep-dive into Birketts",
  subtitle = `Find out more about Birketts, what is important to us and our priorities with
our most recent reports and reviews.`,
  items = [],
}) => {
  return (
    <section className="deep">
      <div className="deep__container">
        <h2 className="deep__title">{title}</h2>
        <hr className="deep__rule" />
        <p className="deep__subtitle">{subtitle}</p>

        <div className="deep__grid">
          {items.map((it, i) => (
            <figure key={i} className="deep__card">
              <div
                className="deep__cover"
                style={{
                  // Αν δοθεί URL εικόνας, μπορείς να βάλεις `backgroundImage: url(...)`
                  backgroundImage:
                    it.image.startsWith("http") || it.image.startsWith("/")
                      ? `url(${it.image})`
                      : it.image, // επιτρέπει CSS gradient string από demo
                }}
              >
                <figcaption className="deep__ribbon">
                  <span className="deep__ribbon-title">
                    {it.ribbonTitle.split("\n").map((l, idx) => (
                      <React.Fragment key={idx}>
                        {l}
                        {idx < it.ribbonTitle.split("\n").length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </span>
                  {it.ribbonSub && (
                    <span className="deep__ribbon-sub">{it.ribbonSub}</span>
                  )}
                </figcaption>

                {/* λογότυπο-σκιά κάτω δεξιά (διακριτικό τετράγωνο σχήμα) */}
                <span aria-hidden className="deep__logo-mark" />
              </div>

              <figcaption className="deep__caption">{it.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Operation;
// 