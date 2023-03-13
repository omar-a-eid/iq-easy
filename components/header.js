import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import Search from "./search";

export default function Header({
  title,
  name,
  enc = "We're looking forward to have you on board",
}) {
  const router = useRouter();
  return (
    <div>
      {title ? (
        <div>
          <h1 className={styles.welcome}>{title}</h1>
        </div>
      ) : (
        <div>
          <h1 className={styles.welcome}>
            Welcome back, <span>{name}</span>!
          </h1>
          <p className={styles.encouragement}>{enc}</p>
        </div>
      )}
      <div className={styles.header_search}>
        <Search />
      </div>
    </div>
  );
}
