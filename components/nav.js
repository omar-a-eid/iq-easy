import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Nav.module.css";
import { CiSearch, CiLogin } from "react-icons/ci";
import Logout from "./logout";
import Search from "./search";
import { useState } from "react";

export default function Nav({ page, verified }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      className={styles.nav_container}
      style={page == "/courses" ? { width: "130px" } : {}}
    >
      <nav>
        <Link href="/dashboard" className={styles.logo}>
          <Image
            src="/nav/logo.png"
            width={50}
            height={50}
            alt="Iq easy's logo"
          />
          {page == "/courses" ? " " : <p>Iq easy-t Online</p>}
        </Link>

        <div className={styles.links_container}>
          <Link href="/dashboard" className={page == "/" ? styles.active : " "}>
            <Image
              src={page == "/" ? "/nav/home_active.png" : "/nav/home.png"}
              width={25}
              height={25}
              alt="A house icon"
            />
            {page == "/courses" ? (
              " "
            ) : (
              <p
                className={styles.links}
                style={page == "/" ? { color: "black" } : {}}
              >
                Home
              </p>
            )}
            <span className={styles.circle}></span>
          </Link>
          <Link
            href="/courses"
            className={page == "/courses" ? styles.active : " "}
          >
            <Image
              src={
                page == "/courses"
                  ? "/nav/folder_active.png"
                  : "/nav/folder.png"
              }
              width={25}
              height={25}
              alt="A folder icon"
            />
            <p
              className={styles.links}
              style={page == "/courses" ? { display: "none" } : {}}
            >
              Courses
            </p>
          </Link>
          <div className={styles.search_container} onClick={handleIconClick}>
            <CiSearch className={styles.search} />
          </div>
          {verified ? (
            <div className={styles.logout}>
              <Logout page={page} />
            </div>
          ) : (
            <Link href="/login">
              <CiLogin style={{ height: "24px", width: "24px" }} />
              <p
                className={styles.links}
                style={page == "/courses" ? { display: "none" } : {}}
              >
                Login
              </p>
            </Link>
          )}
        </div>
      </nav>
      {page == "/courses" ? (
        " "
      ) : (
        <div className={styles.support_container}>
          <div>
            <p>Support 24/7</p>
            <p>Contact us anytime</p>
          </div>
          <div>
            <Link
              href="https://web.facebook.com/people/Easytonline/100089240949977/"
              className={styles.button}
            >
              Start
            </Link>
          </div>
          <div>
            <div className={styles.color}></div>
            <Image
              className={styles.support_image}
              src="/nav/support.png"
              alt="A woman holding a mobilephone"
              width={160}
              height={180}
            />
          </div>
        </div>
      )}
      <Link
        href="https://web.facebook.com/people/Easytonline/100089240949977/"
        className={styles.contact}
      >
        <Image
          className={styles.support_image}
          src="/nav/contact.png"
          alt=" "
          width={50}
          height={50}
        />
      </Link>
      <div
        className={`${styles.search_bar} ${
          isOpen ? styles.search_bar_active : " "
        }`}
      >
        <div className={styles.x} onClick={handleIconClick}>
          x
        </div>
        <Search />
      </div>
    </div>
  );
}
