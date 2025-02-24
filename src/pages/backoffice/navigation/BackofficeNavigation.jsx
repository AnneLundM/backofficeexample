import { NavLink } from "react-router-dom";
import styles from "./BackofficeNavigation.module.css";

const BackofficeNavigation = () => {
  return (
    <ul className={styles.backofficeNavigation}>
      <li>
        <NavLink
          to='/activities'
          className={({ isActive }) => (isActive ? styles.active : "")}>
          Aktiviteter
        </NavLink>
      </li>
    </ul>
  );
};

export default BackofficeNavigation;
