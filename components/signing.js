import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Signing.module.css";

export default function Signing({ children, page }) {
  return (
    <div className={styles.container}>
      <div className={styles.welcome_signing}>
        <Image
          className={styles.top_color}
          src="/signing/top_color.png"
          width={715}
          height={600}
          alt=" "
        />
        <div className={styles.welcome_wrapper}>
          <h1>Weclome back</h1>
          <p>Iq Easy-t Online</p>
        </div>

        <div className={styles.links_container}>
          <div className={page == "/login" ? styles.active : " "}>
            <Link
              style={page == "/login" ? { color: "#0266ff" } : {}}
              href="/login"
            >
              Login
            </Link>
          </div>
          <div className={page == "/signup" ? styles.active : " "}>
            <Link
              style={page == "/signup" ? { color: "#0266ff" } : {}}
              href="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>

        <div>
          <Image
            className={styles.person}
            src="/signing/person.png"
            fill
            alt=" "
          />
        </div>
        <Image
          className={styles.bottom_color}
          src="/signing/bottom_color.png"
          width={450}
          height={493}
          alt=" "
        />
      </div>
      <div className={styles.form_container}>
        <div className={styles.logo_container}>
          <Image
            src="/signing/logo.png"
            width={80}
            height={80}
            alt="Iq easy-t logo"
          />
          <p>Iq Easy-t Online</p>
        </div>
        {children}
        <div className={styles.base}>
          <div className={styles.change}>
            {page == "/login" ? (
              <p>
                Don&apos;t have an account yet?{" "}
                <Link href="/signup">Sign up</Link>
              </p>
            ) : (
              <p>
                You have an account already! <Link href="/login">Login</Link>
              </p>
            )}
          </div>
          {/* <div className={styles.or}>
            <div className={styles.line}></div>
            <p>Or</p>
            <div className={styles.line}></div>
          </div>
          <div>
            <div></div>
            <div></div>
          </div> */}
        </div>
      </div>
      <div className={styles.guest}>
        <Link href="/">Login As a Guest</Link>
      </div>
    </div>
  );
}
