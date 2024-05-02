import { FC } from "react";
import styles from "./header.module.scss";
import img from "../../assets/Header.png";
import poisk from "../../assets/poisk.png";

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <img src={img} alt="NiggerFlex" />
      <form>
        <input className={styles.search} type="search" placeholder="Поиск..." />
        <button className={styles.searchBtn}>
          <div>
            <img src={poisk} alt="poisk" />
          </div>
        </button>
      </form>
      <div className={styles.accLink}>Account</div>
    </div>
  );
};

export default Header;
