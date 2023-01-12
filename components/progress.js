import Image from "next/image";
import styles from "../styles/Progress.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Progress() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 2.5, spacing: 10 },
  });
  return (
    <div className={styles.container}>
      <p>Continue to watch</p>
      <div className={styles.wrapper}>
        <div ref={sliderRef} className={`keen-slider`}>
          <div className={`${styles.course_card}  keen-slider__slide`}>
            <div className={styles.header}>Digital Marketing Diploma</div>
            <div className={styles.text}>
              <p>إعلانات الفيسبوك وإنستجرام</p>
              <p>40 min</p>
            </div>
          </div>
          <div className={`${styles.course_card}  keen-slider__slide`}>
            <div className={styles.header}>Digital Marketing Diploma</div>
            <div className={styles.text}>
              <p>إعلانات الفيسبوك وإنستجرام</p>
              <p>40 min</p>
            </div>
          </div>{" "}
          <div className={`${styles.course_card}  keen-slider__slide`}>
            <div className={styles.header}>Digital Marketing Diploma</div>
            <div className={styles.text}>
              <p>إعلانات الفيسبوك وإنستجرام</p>
              <p>40 min</p>
            </div>
          </div>{" "}
          <div className={`${styles.course_card}  keen-slider__slide`}>
            <div className={styles.header}>Digital Marketing Diploma</div>
            <div className={styles.text}>
              <p>إعلانات الفيسبوك وإنستجرام</p>
              <p>40 min</p>
            </div>
          </div>{" "}
          <div className={`${styles.course_card}  keen-slider__slide`}>
            <div className={styles.header}>Digital Marketing Diploma</div>
            <div className={styles.text}>
              <p>إعلانات الفيسبوك وإنستجرام</p>
              <p>40 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
