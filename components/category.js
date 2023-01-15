import Image from "next/image";
import styles from "../styles/Category.module.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Link from "next/link";

export default function Category({
  title = "What we offer",
  courses,
  studentCourses,
}) {
  const [sliderRef] = useKeenSlider({
    breakpoints: {
      "(max-width: 1390px)": {
        slides: { perView: 2.5, spacing: 5 },
      },
      "(max-width: 950px)": {
        slides: { perView: 1.5, spacing: 5 },
      },
      "(max-width: 430px)": {
        slides: { perView: 1.1, spacing: 5 },
      },
    },
    slides: { perView: 3.5, spacing: 5 },
  });
  return (
    <div>
      <div className={styles.we_offer}>
        <p>{title}</p>
        <div ref={sliderRef} className={`keen-slider ${styles.container} `}>
          {courses
            ? courses.map((course, id) => (
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
                    <p>0/{course.lectureNumber} lessons</p>
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
              ))
            : ""}
          {studentCourses
            ? studentCourses.map((course, id) => (
                <Link
                  href={`courses/${course.course._id.toString()}`}
                  key={id}
                  className={`${styles.course_card}  keen-slider__slide`}
                >
                  <p>{course.course.name}</p>
                  <div className={styles.image_container}>
                    <div>
                      <p className={styles.creator}>by: IqEasyT Online</p>
                      <Image
                        className={styles.play}
                        src="/content/play2.png"
                        alt=" "
                        width={40}
                        height={40}
                      />
                    </div>
                    <div>
                      <Image src={course.course.avatar} alt=" " fill />
                    </div>
                  </div>
                  <div className={styles.details}>
                    <p>
                      {course.videosCompleted.length}/
                      {course.course.lectureNumber} lessons
                    </p>
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
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
