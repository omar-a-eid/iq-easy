import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Category from "../components/category";
import Statistics from "../components/statistics";
import Progress from "../components/progress";
import * as jose from "jose";
import { useState } from "react";

export default function Dashboard({ data, courses }) {
  const [comp, setComp] = useState(0);
  const [prog, setProg] = useState(0);

  const name = data.name.split(" ")[0];

  if (data.courses.length > 0) {
    setComp(data.courses);
    setProg(data.courses);

    //const hours
  }
  return (
    <Layout
      page="/"
      name={name}
      enc="You're doing great this week, Keep it up!"
    >
      <div>
        <div className={styles.info}>
          <Statistics completed={comp} progress={prog} />
          <Progress />
        </div>
        <div className={styles.adv}>
          <div className={styles.adv_text}>
            <p>
              دبلومة التسويق الإلكتروني الشاملة الاحترافية Digital Marketing
              Diploma
            </p>
            <p>
              إعلانات فيسبوك وانستجرام - إعلانات جوجل ويوتيوب - إعلانات تويتر و
              سناب شات وتيك توك - الكوبي رايتنج - إيميل ماركيتنج
            </p>
          </div>
          <div>
            <Image
              className={styles.adv_image}
              src="/home/student.png"
              alt="A student studying"
              width={200}
              height={170}
            />
          </div>
        </div>
        {courses ? <Category /> : ""}
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
    `http://localhost:3000/api/studentGET?id=${payload.aud}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
