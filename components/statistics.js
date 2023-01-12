import Image from "next/image";
import styles from "../styles/Statistics.module.css";

export default function Statistics({ completed, progress, hours = 0 }) {
  return (
    <div>
      <p>Statistics</p>
      <div className={styles.container}>
        <div className={styles.comp}>
          <div className={styles.text}>{completed}</div>
          <div>Courses completed</div>
        </div>
        <div className={styles.prog}>
          <div className={styles.text}>{progress}</div>
          <div>Courses in progress</div>
        </div>
        <div className={styles.spent}>
          <div>
            <div className={styles.text}>{hours}</div>
            <div>Hours spent this week</div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
