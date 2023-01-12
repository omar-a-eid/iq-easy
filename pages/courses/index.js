import Image from "next/image";
import styles from "../../styles/Courses.module.css";
import Layout from "../../components/layout";
import Link from "next/link";

export default function Courses({ data }) {
  return (
    <Layout page="/courses" width={100} title="All courses">
      <div>
        <div>
          <div className={styles.courses_container}>
            <div className={styles.status}>
              <div>
                <Link href="/courses" className={styles.active}>
                  All courses
                </Link>
              </div>
              <div>
                <Link href="/courses/current">Current</Link>
              </div>
            </div>
            <div className={styles.category_container}>
              {data.map((course, id) => (
                <Link
                  key={id}
                  href={`/courses/${course._id.toString()}`}
                  className={styles.category_wrapper}
                >
                  <div>
                    <Image
                      className={styles.adv_image}
                      src={course.icon}
                      alt=" "
                      width={60}
                      height={60}
                    />
                  </div>
                  <div>
                    <p>{course.name}</p>
                    <p>
                      {new Date(course.createdAt).toLocaleDateString("en-us", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/fetch", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
