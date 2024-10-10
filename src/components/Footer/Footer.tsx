import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { RootState } from "../../redux/store";

export const Footer = () => {
  const unresolved = useSelector((state: RootState) => state.tasks.unresolved);
  const resolved = useSelector((state: RootState) => state.tasks.resolved);
  return (
    <footer className={styles.container}>
      <div className={styles.footerContent}>
        <p className={styles.AmmountInfo}>New: {unresolved.length}</p>
        <p className={styles.AmmountInfo}>Finished: {resolved.length}</p>
      </div>
      <div className={styles.sigContainer}>
        <h3 className={styles.signature}>HackerMan 2024</h3>
      </div>
    </footer>
  );
};
