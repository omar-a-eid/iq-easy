import Image from "next/image";
import styles from "../styles/Progress.module.css";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Progress({ videos }) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    breakpoints: {
      "(max-width: 1330px)": {
        slides: { perView: 3.5, spacing: 10 },
      },
      "(max-width: 760px)": {
        slides: { perView: 2.5, spacing: 10 },
      },
      "(max-width: 490px)": {
        slides: { perView: 1.2, spacing: 10 },
      },
    },
    slides: { perView: 2.3, spacing: 10 },
  });
  return (
    <div className={styles.container}>
      {videos.length > 0 ? (
        <div>
          <p>Continue to watch</p>
          <div className={styles.wrapper}>
            <div ref={sliderRef} className={`keen-slider`}>
              {videos.map((video, id) => (
                <Link
                  href={`courses/${video.courseId}`}
                  key={id}
                  className={`${styles.course_card}  keen-slider__slide`}
                >
                  <div className={styles.header}>{video.courseName}</div>
                  <div className={styles.text}>
                    <div>
                      <Image
                        src="/content/play.png"
                        alt=" "
                        width={30}
                        height={30}
                      />
                    </div>
                    <p>{video.video.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
