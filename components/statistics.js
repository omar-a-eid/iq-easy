import styles from "../styles/Statistics.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Statistics({ completed, progress, hours = 0 }) {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(max-width: 770px)": {
        slides: { perView: 3.4 },
      },
      "(max-width: 535px)": {
        slides: { perView: 2.5, spacing: 5 },
      },
      "(max-width: 435px)": {
        slides: { perView: 1.3, spacing: 5 },
      },
    },
    slides: { perView: 3.2 },
  });

  return (
    <div>
      <p>Statistics</p>
      <div className={`${styles.container} keen-slider`} ref={sliderRef}>
        <div className={`${styles.comp} keen-slider__slide`}>
          <div className={styles.text}>{completed}</div>
          <div>Courses completed</div>
        </div>
        <div className={`${styles.prog} keen-slider__slide`}>
          <div className={styles.text}>{progress}</div>
          <div>Courses in progress</div>
        </div>
        <div className={`${styles.spent} keen-slider__slide`}>
          <div>
            <div className={styles.text}>
              {hours < 60 ? hours : Math.round((hours / 60) * 10) / 10}
            </div>
            <div>Total {hours / 60 < 60 ? "Minutes" : "Hours"} spent</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
