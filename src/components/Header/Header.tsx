import { FC, useMemo, useState } from "react";
import styles from "./header.module.scss";
import img from "../../assets/Header.png";
import day from "../../assets/day.png";
import night from "../../assets/night.png";
import poisk from "../../assets/poisk.png";
import { IMovie } from "../../models/IMovie";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addSearchedMovies } from "../../store/slices/movieSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { setDarkTheme, setLightTheme } from "../../store/slices/themeSlice";

interface HeadersProps {
  data: IMovie[];
}
const Header: FC<HeadersProps> = ({ data }) => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { light, dark } = useAppSelector((state) => state.theme);
  const searchedMovies = useMemo(() => {
    return data.filter((movie) => movie.title.toLowerCase().includes(search));
  }, [search, data]);
  const searchMoviesByTitle = (event: any) => {
    event.preventDefault();
    dispatch(addSearchedMovies(searchedMovies));
    setSearch("");
  };
  const handleCheckLogin = () => {
    if (isAuth) {
      navigate("/account");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className={styles.header}>
      <img
        className={styles.logo}
        onClick={() => navigate("/movies")}
        src={img}
        alt="NiggerFlex"
      />
      <form>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={light ? styles.search : styles.searchDark}
          type="search"
          placeholder="Поиск..."
        />
        <button onClick={searchMoviesByTitle} className={styles.searchBtn}>
          <div>
            <img src={poisk} alt="poisk" />
          </div>
        </button>
      </form>
      <div className={styles.themeAndAcc}>
        <div className={styles.theme}>
          <div>
            <span
              onClick={() => dispatch(setLightTheme())}
              className={light ? styles.themeIcon : styles.nothig}
            >
              <img src={day} alt="day" />
            </span>
            <span
              onClick={() => dispatch(setDarkTheme())}
              className={dark ? styles.themeIcon : styles.nothig}
            >
              <img src={night} alt="night" />
            </span>
          </div>
        </div>
        <div
          onClick={() => handleCheckLogin()}
          className={light ? styles.accLink : styles.accLinkDark}
        >
          Account
        </div>
      </div>
    </div>
  );
};

export default Header;
