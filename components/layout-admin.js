import styles from "../styles/Layout.module.css";
import Nav from "./admin/nav-admin";

export default function Layout({ children, page, width }) {
  return (
    <div className={styles.container}>
      <Nav page={page} />
      <div className={styles.main} style={{ width: `${width}%` }}>
        {children}
      </div>
    </div>
  );
}
