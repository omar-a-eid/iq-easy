import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Category from "../components/category";
import Statistics from "../components/statistics";
import Progress from "../components/progress";
import * as jose from "jose";
import { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function Dashboard({ data, hours, categories }) {
  const [comp, setComp] = useState(0);
  const [prog, setProg] = useState(0);
  const [cate, setCate] = useState([]);

  const name = data.name.split(" ")[0];
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.05, spacing: 1 },
  });
  useEffect(() => {
    let p = 0,
      c = 0;
    for (let i = 0; i < data.courses.length; i++) {
      if (data.courses[i].status == "Completed") {
        p += 1;
      } else {
        c += 1;
      }
    }
    setComp(p);
    setProg(c);
  }, []);
  const handleClick = (e) => {
    fetch(`api/getCateCourse?category=${e.currentTarget.id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCate(data.course);
      });
  };
  return (
    <Layout
      page="/"
      name={name}
      enc="You're doing great this week, Keep it up!"
      verified={true}
    >
      <div>
        <div className={styles.info}>
          <Statistics completed={comp} progress={prog} hours={hours} />
          <Progress videos={data.videosInProg} />
        </div>

        <div ref={sliderRef} className={`keen-slider`}>
          {categories.categories.map((cate, id) => (
            <div key={id} className=" keen-slider__slide">
              <div
                className={styles.adv}
                id={cate._id}
                onClick={(e) => handleClick(e)}
              >
                <div className={styles.adv_container}>
                  <div className={styles.adv_text}>
                    <p>{cate.name}</p>
                    <p>{cate.desc}</p>
                  </div>

                  <div>
                    <Image
                      className={styles.adv_image}
                      src={cate.icon}
                      alt="A student studying"
                      width={200}
                      height={170}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.courses.length > 0 ? (
          <div className={styles.cate}>
            <Category title="Your courses" studentCourses={data.courses} />
          </div>
        ) : (
          ""
        )}
        {cate.length > 0 ? (
          <div>
            <Category title="Courses" courses={cate} />{" "}
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(req) {
  const token = req.req.cookies.token;
  const secret = new TextEncoder().encode(
    "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2"
  );
  const { payload } = await jose.jwtVerify(token, secret);

  const res = await fetch(
    `${process.env.DOMAIN}/api/studentGET?id=${payload.aud}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const cate = await fetch(`${process.env.DOMAIN}/api/getCategory`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  const categories = await cate.json();

  return {
    props: {
      data: data,
      hours: data.hours,
      categories: categories,
    },
  };
}
