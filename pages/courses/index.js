import Image from "next/image";
import styles from "../../styles/Courses.module.css";
import Layout from "../../components/layout";
import Link from "next/link";

export default function Courses({ data }) {
  function addProgress(e) {
    fetch(`/api/addProgress?id=${e.currentTarget.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }
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
            <div className={styles.category_height}>
              <div className={styles.category_container}>
                {data.map((course, id) => (
                  <Link
                    key={id}
                    id={course._id}
                    href={`/courses/${course._id.toString()}`}
                    className={styles.category_wrapper}
                    onClick={(e) => addProgress(e)}
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
                        {new Date(course.createdAt).toLocaleDateString(
                          "en-us",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(req) {
  const host = req.req.headers.host;
  const proto =
    req.req.headers["x-forwarded-proto"] || req.req.connection.encrypted
      ? "https"
      : "http";
  const res = await fetch(`${proto}://${host}/api/fetch`, {
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
