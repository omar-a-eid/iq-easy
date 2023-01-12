import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import Category from "../components/category";

function Home(props) {
  return (
    <Layout page="/">
      <div>
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
        <Category courses={props.data} />
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

export default Home;
