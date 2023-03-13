import Image from "next/image";
import Layout from "../../../components/layout";
import styles from "../../../styles/Content.module.css";
import Link from "next/link";
import * as jose from "jose";
import { useState } from "react";

export default function Videos({ data, verified }) {
  const { all, currentCourse, student } = data;
  const [src, setSrc] = useState(currentCourse.videos[0].videoUrl);
  const [vdId, setVdId] = useState(currentCourse.videos[0]._id);
  const [active, setActive] = useState(false);

  let interval;
  function pause() {
    const video = document.querySelector("#time");
    const duration = video.duration.toString().split(".")[0];
    const id = video.dataset.vdid;
    if (Math.round(video.currentTime) < duration - 5) {
      fetch(
        `/api/progress?id=${id}&courseId=${currentCourse._id}&courseName=${currentCourse.name}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }
  function play(e) {
    fetch(`/api/getVideo?id=${e.currentTarget.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        pause();
        return res.json();
      })
      .then((data) => {
        setVdId(data._id);
        setSrc(data.videoUrl);
      });
  }
  function time() {
    const video = document.querySelector("#time");
    const duration = video.duration.toString().split(".")[0];
    const id = video.dataset.vdid;
    interval = setInterval(function () {
      if (Math.round(video.currentTime) >= duration - 5) {
        fetch(`/api/completed?id=${id}&duration=${duration}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      }
    }, 1000);
  }
  function displayAll(params) {
    document.querySelector("#all").style.display = "flex";
    document.querySelector("#current").style.display = "none";
    setActive(false);
  }
  function displayCurrent(params) {
    document.querySelector("#current").style.display = "flex";
    document.querySelector("#all").style.display = "none";
    setActive(true);
  }
  return (
    <Layout page="/courses" width={100} title="Courses" verified>
      <div className={styles.container}>
        <div>
          <div className={styles.status_container}>
            <div>
              <div
                className={!active ? styles.active : styles.notActive}
                onClick={displayAll}
              >
                All courses
              </div>
              <div
                className={active ? styles.active : styles.notActive}
                onClick={displayCurrent}
                style={{ padding: " 0 0.5em" }}
              >
                Current
              </div>
            </div>
          </div>
          <div className={styles.courses_container} id="all">
            {all.map((course, id) => (
              <Link
                key={id}
                href={`/courses/${course._id.toString()}`}
                className={styles.course}
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
          <div
            className={styles.courses_container}
            id="current"
            style={{ display: "none" }}
          >
            {verified
              ? student.courses.map((course, id) => (
                  <Link
                    key={id}
                    href={`/courses/${course.course._id}`}
                    className={styles.course}
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
                ))
              : ""}
          </div>
        </div>
        <div>
          <div>
            <video
              controlsList="nodownload"
              id="time"
              onPlay={(e) => time(e)}
              onPause={(e) => {
                clearInterval(interval);
                pause();
              }}
              controls
              className={styles.video}
              data-vdid={vdId}
              src={src}
              type="video/*"
            ></video>
          </div>
          <h2 className={styles.title}>{currentCourse.name}</h2>
          <div>
            <div className={styles.details}>
              <h3>Courses content</h3>
              <div>
                {currentCourse.lectureNumber} lectures *
                {currentCourse.hours / 60 >= 1
                  ? `${Math.round(currentCourse.hours / 60)} hours.`
                  : `${
                      (currentCourse.hours / 60)
                        .toFixed(2)
                        .toString()
                        .split(".")[1]
                    } mins`}
              </div>
            </div>
            <div className={styles.videos_container}>
              {currentCourse.videos.map((video, id) =>
                !verified && id !== 0 ? (
                  <div
                    key={id}
                    className={`${styles.video_container} ${styles.video_not_active}`}
                    id={video._id.toString()}
                  >
                    <div className={styles.imgText}>
                      <div className={styles.image}>
                        <Image
                          src="/content/play.png"
                          alt=" "
                          width={20}
                          height={20}
                        />
                      </div>
                      <div>
                        <div>
                          <div className={styles.time}>
                            <Image
                              src="/content/time.png"
                              alt=" "
                              width={20}
                              height={20}
                            />
                            {video.time} mins
                          </div>
                        </div>
                        <div className={styles.name}>{video.name}</div>
                      </div>
                    </div>
                    <div className={styles.play2}>
                      <Image
                        src="/content/play2.png"
                        alt=" "
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    key={id}
                    className={styles.video_container}
                    id={video._id.toString()}
                    onClick={(e) => play(e)}
                  >
                    <div className={styles.imgText}>
                      <div className={styles.image}>
                        <Image
                          src="/content/play.png"
                          alt=" "
                          width={20}
                          height={20}
                        />
                      </div>
                      <div>
                        <div>
                          <div className={styles.time}>
                            <Image
                              src="/content/time.png"
                              alt=" "
                              width={20}
                              height={20}
                            />
                            {video.time} mins
                          </div>
                        </div>
                        <div className={styles.name}>{video.name}</div>
                      </div>
                    </div>
                    <div className={styles.play2}>
                      <Image
                        src="/content/play2.png"
                        alt=" "
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                )
              )}
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
  const { videoId } = req.params;
  let res;
  if (token !== undefined) {
    const { payload } = await jose.jwtVerify(token, secret);
    if (payload) {
      verified = true;
    }
    res = await fetch(`${process.env.DOMAIN}/api/getCourse?course=${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
  } else {
    res = await fetch(`${process.env.DOMAIN}/api/getCourse?course=${videoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const data = await res.json();
  return {
    props: {
      data: data,
      verified,
    },
  };
}
