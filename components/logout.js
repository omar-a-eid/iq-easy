import { CiLogout } from "react-icons/ci";
import styles from "../styles/Header.module.css";
import nav from "../styles/Nav.module.css";
import { useRouter } from "next/router";

export default function Logout({ page }) {
  const router = useRouter();

  const logout = () => {
    fetch(`/api/auth/logout`).then((res) => router.push("/login"));
  };
  return (
    <div>
      <div className={styles.profile} onClick={logout}>
        <CiLogout style={{ height: "24px", width: "24px" }} />
        <p
          className={nav.links}
          style={page == "/courses" ? { display: "none" } : {}}
        >
          Logout
        </p>
      </div>
    </div>
  );
}
