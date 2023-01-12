import Image from "next/image";
import styles from "../styles/Category.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";

export default function Category({ title = "What we offer", courses }) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 3.5, spacing: 30 },
    range: {
      min: -5,
      max: 5,
    },
  });
  return (
    <div>
      <div className={styles.we_offer}>
        <p>{title}</p>
        <div ref={sliderRef} className={`keen-slider`}>
          {courses.map((course, id) => (
            <Link
              href={`courses/${course._id.toString()}`}
              key={id}
              className={`${styles.course_card}  keen-slider__slide`}
            >
              <p>{course.name}</p>
              <div className={styles.image_container}>
                <p className={styles.creator}>by: IqEasyT Online</p>
                <div>
                  <Image src={course.avatar} alt=" " fill />
                </div>
              </div>
              <div className={styles.details}>
                <p>0/{course.lectureNum} lessons</p>
                <div>
                  <Image
                    src="/content/arrow.png"
                    alt=" "
                    width={25}
                    height={15}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
