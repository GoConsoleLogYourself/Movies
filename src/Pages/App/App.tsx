import { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./app.module.scss";
import Input from "../../components/Input/Input";
import { useGetMoviesQuery } from "../../store/moviesApi";
import fail from "../../assets/fail.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  addSearchedMovies,
  sortMoviesByHighestRating,
  sortMoviesByLowestRating,
} from "../../store/slices/movieSlice";

function App() {
  const [minYear, setMinYear] = useState<string>("1980");
  const [maxYear, setMaxYear] = useState<string>("2024");
  const [rating, setRating] = useState<string>("1");
  const [janre, setJanre] = useState<string>("");
  const [highestRatingChoosen, setHighestRatingChoosen] =
    useState<boolean>(false);
  const [lowestRatingChoosen, setLowestRatingChoosen] =
    useState<boolean>(false);
  const [failedFilter, setFailedFilter] = useState<boolean>(false);
  const { data = [] } = useGetMoviesQuery(40);
  const { movies } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();
  const filterMovies = () => {
    const filtredMovies = data.filter(
      (item) =>
        item.year >= Number(minYear) &&
        item.year <= Number(maxYear) &&
        item.rating >= Number(rating)
    );
    dispatch(addSearchedMovies(filtredMovies));
    if (filtredMovies.length === 0) setFailedFilter(true);
    if (filtredMovies.length > 0) setFailedFilter(false);
    if (janre !== "") {
      const filtredMovies1 = filtredMovies.filter(
        (item) => item.janres === janre
      );
      dispatch(addSearchedMovies(filtredMovies1));
      if (filtredMovies1.length === 0) setFailedFilter(true);
      if (filtredMovies1.length > 0) setFailedFilter(false);
    }
  };
  const sortByHighestRating = () => {
    if (movies.length == 0) {
      const key = "rating";
      const sorted = data.sort((a, b) => b[key] - a[key]);
      dispatch(addSearchedMovies(sorted));
    }
    if (movies.length) {
      dispatch(sortMoviesByHighestRating());
    }
    setLowestRatingChoosen(false);
    setHighestRatingChoosen(true);
  };
  const sortByLowestRating = () => {
    if (movies.length == 0) {
      const key = "rating";
      const sorted = data.sort((a, b) => a[key] - b[key]);
      dispatch(addSearchedMovies(sorted));
    }
    if (movies.length) {
      dispatch(sortMoviesByLowestRating());
    }
    setHighestRatingChoosen(false);
    setLowestRatingChoosen(true);
  };
  return (
    <div className={styles.app}>
      <Header data={data} />
      <div className={styles.main}>
        <div className={styles.sortByRating}>
          <button
            onClick={() => sortByHighestRating()}
            className={
              highestRatingChoosen
                ? `${styles.best} ${styles.choosen}`
                : styles.best
            }
          >
            Сначала лучшие
          </button>
          <button
            onClick={() => sortByLowestRating()}
            className={
              lowestRatingChoosen
                ? `${styles.worst} ${styles.choosen}`
                : styles.worst
            }
          >
            Сначала худшие
          </button>
        </div>
        <div className={styles.cards}>
          <div className={failedFilter ? styles.failedFilter : styles.none}>
            <p>К сожалению поиск не дал результатов...</p>
            <img src={fail} alt="fail" />
          </div>
          {movies.length <= 0
            ? data.map((item) => (
                <div
                  key={item.id}
                  className={failedFilter ? styles.none : styles.card}
                >
                  <div className={styles.rating}>
                    <p>{item.rating}</p>
                  </div>
                  <img src={item.img} alt={item.title} />
                  <div className={styles.info}>
                    <h5>{item.title}</h5>
                    <p>{item.date}</p>
                    <p>{item.janres}</p>
                    <div>Смотреть позже</div>
                  </div>
                </div>
              ))
            : movies.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.rating}>
                    <p>{item.rating}</p>
                  </div>
                  <img src={item.img} alt={item.title} />
                  <div className={styles.info}>
                    <h5>{item.title}</h5>
                    <p>{item.date}</p>
                    <p>{item.janres}</p>
                    <div>Смотреть позже</div>
                  </div>
                </div>
              ))}
        </div>
        <div className={styles.filter}>
          <form>
            <p>
              Выберите год <br /> от:
            </p>
            <Input
              value={minYear}
              min={1980}
              max={2024}
              step={1}
              onChange={(e) => setMinYear(e.target.value)}
            />
            <p>до:</p>
            <Input
              value={maxYear}
              min={1980}
              max={2024}
              step={1}
              onChange={(e) => setMaxYear(e.target.value)}
            />
          </form>
          <div className={styles.changeRating}>
            <p>Рейтинг от:</p>
            <Input
              value={rating}
              min={1}
              max={10}
              step={1}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className={styles.janres}>
            <p>Выберите жанр:</p>
            <select
              defaultValue="Выберите"
              onChange={(e) => setJanre(e.target.value)}
            >
              <option value="Выберите" disabled>
                Выберите
              </option>
              <option value="драма">Драма</option>
              <option value="боевик">Боевик</option>
              <option value="криминал">Криминал</option>
              <option value="комедия">Комедия</option>
              <option value="фантастика">Фантастика</option>
              <option value="триллер">Триллер</option>
            </select>
          </div>
          <button className={styles.filterBtn} onClick={filterMovies}>
            Поиск
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
