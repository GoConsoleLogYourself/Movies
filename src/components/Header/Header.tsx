import { FC, useMemo, useState } from "react";
import styles from "./header.module.scss";
import img from "../../assets/Header.png";
import poisk from "../../assets/poisk.png";
import { IMovie } from "../../models/IMovie";
import { useAppDispatch } from "../../hooks";
import { addSearchedMovies } from "../../store/slices/movieSlice";
import { useNavigate } from "react-router-dom";

interface HeadersProps {
  data: IMovie[];
}
const Header: FC<HeadersProps> = ({ data }) => {
  const [search, setSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchedMovies = useMemo(() => {
    return data.filter((movie) => movie.title.toLowerCase().includes(search));
  }, [search, data]);
  const searchMoviesByTitle = (event: any) => {
    event.preventDefault();
    dispatch(addSearchedMovies(searchedMovies));
    setSearch("");
  };
  return (
    <div className={styles.header}>
      <img onClick={() => navigate("/movies")} src={img} alt="NiggerFlex" />
      <form>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
          type="search"
          placeholder="Поиск..."
        />
        <button onClick={searchMoviesByTitle} className={styles.searchBtn}>
          <div>
            <img src={poisk} alt="poisk" />
          </div>
        </button>
      </form>
      <div onClick={() => navigate("/account")} className={styles.accLink}>
        Account
      </div>
    </div>
  );
};

export default Header;
