import styles from "./Components.module.scss";
import { PuffLoader } from "react-spinners";

export default function Loader() {
  return (
    <div id="loader" className={styles.loaderContainer}>
      <PuffLoader color="#0071ff" speedMultiplier={2} size={100} />
    </div>
  );
}
