import styles from "../styles/Layout.module.css";
import Nav from "./admin/nav-admin";
import { useRouter } from "next/router";

export default function Layout({ children, page, width }) {
  const router = useRouter();

  const logout = () => {
    fetch(`/api/auth/logout`).then((res) => router.push("/login"));
  };
  return (
    <div className={styles.container}>
      <Nav page={page} />
      <div className={styles.main} style={{ width: `${width}%` }}>
        <div className={styles.logout}>
          <p onClick={logout}>Logout</p>
        </div>
        {children}
      </div>
    </div>
  );
}
