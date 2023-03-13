import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Nav.module.css";

export default function Nav({ page }) {
  return (
    <div
      className={styles.nav_container}
      style={page == "/admin/courses" ? { width: "130px" } : {}}
    >
      <nav>
        <Link href="/admin" className={styles.logo}>
          <Image
            src="/nav/logo.png"
            width={50}
            height={50}
            alt="Iq easy's logo"
          />
          {page == "/admin/courses" ? " " : <p>Iq easy-t Online</p>}
        </Link>

        <div className={styles.links_container}>
          <Link
            href="/admin"
            className={page == "/admin" ? styles.active : " "}
          >
            <Image
              src={page == "/admin" ? "/nav/home_active.png" : "/nav/home.png"}
              width={25}
              height={25}
              alt="A house icon"
            />
            {page == "/admin/courses" ? (
              " "
            ) : (
              <p
                className={styles.links}
                style={page == "/admin" ? { color: "black" } : {}}
              >
                Home
              </p>
            )}
            <span className={styles.circle}></span>
          </Link>
          <Link
            href="/admin/category"
            className={page == "/admin/courses" ? styles.active : " "}
          >
            <Image
              src={
                page == "/admin/courses"
                  ? "/nav/folder_active.png"
                  : "/nav/folder.png"
              }
              width={25}
              height={25}
              alt="A folder icon"
            />
            <p
              className={styles.links}
              style={page == "/admin/courses" ? { display: "none" } : {}}
            >
              Courses
            </p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
