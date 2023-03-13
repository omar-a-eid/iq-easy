import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Category from "../components/category";
import { useState, useEffect } from "react";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import * as jose from "jose";
function Home({ verified, categories }) {
  const [cate, setCate] = useState([]);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1.05, spacing: 1 },
  });
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
    <Layout page="/" verified={verified}>
      <div>
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
  const cate = await fetch(`${process.env.DOMAIN}/api/getCategory`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const categories = await cate.json();

  const data = await res.json();
  return {
    props: {
      data,
      verified,
      categories: categories,
    },
  };
}

export default Home;
