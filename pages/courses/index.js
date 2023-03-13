import Image from "next/image";
import styles from "../../styles/Courses.module.css";
import Layout from "../../components/layout";
import Link from "next/link";
import * as jose from "jose";

export default function Courses({ data, verified }) {
  function addProgress(e) {
    fetch(`/api/addProgress?id=${e.currentTarget.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }
  return (
    <Layout page="/courses" width={100} title="All courses" verified>
      <div>
        <div>
          <div className={styles.courses_container}>
            <div className={styles.status}>
              <div>
                <Link href="/courses" className={styles.active}>
                  All courses
                </Link>
              </div>

              <div className={verified ? "" : styles.not_verified}>
                {verified ? (
                  <Link href="/courses/current">Current</Link>
                ) : (
                  <div>Current</div>
                )}
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
                    onClick={verified ? (e) => addProgress(e) : ""}
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
  let verified = false;
  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );
  const { token } = req.req.cookies;
  if (token !== undefined) {
    const { payload } = await jose.jwtVerify(token, secret);
    if (payload) {
      verified = true;
    }
  }
  const res = await fetch(`${process.env.DOMAIN}/api/fetch`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return {
    props: {
      data,
      verified,
    },
  };
}
