import Image from "next/image";
import styles from "../../styles/Courses.module.css";
import Layout from "../../components/layout";
import Link from "next/link";
import * as jose from "jose";

export default function Courses({ data }) {
  return (
    <Layout page="/courses" width={100} title="Current courses">
      <div className={styles.main}>
        <div>
          <div className={styles.courses_container}>
            <div className={styles.status}>
              <div>
                <Link href="/courses">All courses</Link>
              </div>
              <div>
                <Link href="/courses/current" className={styles.active}>
                  Current
                </Link>
              </div>
            </div>
            {data.length > 0 ? (
              <div className={styles.category_height}>
                <div className={styles.category_container}>
                  {data.map((course, id) => (
                    <Link
                      key={id}
                      href={`/courses/${course.course._id.toString()}`}
                      className={styles.category_wrapper}
                    >
                      <div>
                        <Image
                          className={styles.adv_image}
                          src={course.course.icon}
                          alt=" "
                          width={60}
                          height={60}
                        />
                      </div>
                      <div>
                        <p>{course.course.name}</p>
                        <p>
                          {new Date(course.course.createdAt).toLocaleDateString(
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
            ) : (
              <p>No courses found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(req) {
  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );
  const { token } = req.req.cookies;
  const { payload } = await jose.jwtVerify(token, secret);

  const res = await fetch(
    `${process.env.DOMAIN}/api/studentGET?id=${payload.aud}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return {
    props: {
      data: data.courses,
    },
  };
}
