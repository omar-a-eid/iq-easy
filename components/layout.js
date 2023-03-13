import styles from "../styles/Layout.module.css";
import Header from "./header";
import Nav from "./nav";

export default function Layout({
  children,
  page,
  width,
  title,
  enc,
  name = "Stranger",
  verified,
}) {
  return (
    <div className={styles.container}>
      <Nav page={page} verified={verified} />
      <div className={styles.main} style={{ width: `${width}%` }}>
        <Header title={title} name={name} enc={enc} />
        {children}
      </div>
    </div>
  );
}
