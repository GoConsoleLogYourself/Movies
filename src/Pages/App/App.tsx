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
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card/Card";
import Loading from "../../components/Loading/Loading";

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
  const { data = [], isError, isLoading } = useGetMoviesQuery(40);
  const { movies } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    setFailedFilter(false);
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
    setFailedFilter(false);
    setHighestRatingChoosen(false);
    setLowestRatingChoosen(true);
  };
  return (
    <main className={styles.app}>
      <Header data={data} />
      <main className={styles.main}>
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
        <section className={styles.cards}>
          <div className={failedFilter ? styles.failedFilter : styles.none}>
            <p>К сожалению поиск не дал результатов...</p>
            <img src={fail} alt="fail" />
          </div>
          {isError ? (
            <div className={styles.failedFilter}>
              <p>Произошла ошибка при загрузке данных...</p>
              <img src={fail} alt="fail" />
            </div>
          ) : isLoading ? (
            <Loading />
          ) : movies.length <= 0 ? (
            data.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                rating={item.rating}
                date={item.date}
                img={item.img}
                janre={item.janres}
                onClick={() => navigate(`/movies/${item.title}`)}
              />
            ))
          ) : (
            movies.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                rating={item.rating}
                date={item.date}
                img={item.img}
                janre={item.janres}
                onClick={() => navigate(`/movies/${item.title}`)}
              />
            ))
          )}
        </section>
        <section className={styles.filter}>
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
        </section>
      </main>
    </main>
  );
}

export default App;
