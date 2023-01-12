import Image from "next/image";
import Layout from "../../../components/layout";
import styles from "../../../styles/Content.module.css";
import Link from "next/link";

export default function Videos() {
  return (
    <Layout page="/courses" width={100}>
      <div className={styles.container}>
        <div></div>
        {/* <div>
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
            <div>
              <div className={styles.category_wrapper}>
                <div>
                  <Image
                    className={styles.adv_image}
                    src="/courses/facebook_category.png"
                    alt=" "
                    width={60}
                    height={60}
                  />
                </div>
                <div>
                  <p>إعلانات الفيسبوك وإنستجرام</p>
                  <p>Tuesday, Sep 06, 2022</p>
                </div>
              </div>
            </div>
          </div> */}
        <div>
          <div>
            <video controls className={styles.video}>
              <source src="/courses/videos.mp4" type="video/mp4" />
            </video>
          </div>
          <h2 className={styles.title}>إعلانات الفيسبوك وأنستجرام</h2>
          <div>
            <div>
              <h3>Courses content</h3>
              <div>12 lectures *2 hours</div>
            </div>
            <div>
              <div></div>
              <div>
                <div>
                  <div>03:29 mins</div>
                  <div>مفدمة عن التسويق</div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
