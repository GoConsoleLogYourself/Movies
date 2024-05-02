import { useState } from "react";
import Header from "../../components/Header/Header";
import styles from "./app.module.scss";
import Input from "../../components/Input/Input";
import { useGetMoviesQuery } from "../../store/moviesApi";
import { IMovie } from "../../models/IMovie";

function App() {
  const [val, setVal] = useState("1980");
  const [val2, setVal2] = useState("2024");
  const [val3, setVal3] = useState("1");
  const [janre, setJanre] = useState("");
  const [arr, setArr] = useState<IMovie[]>([]);
  const { data = [] } = useGetMoviesQuery(40);
  const filterMovies = () => {
    const filtredMovies = data.filter(
      (item) =>
        item.year >= Number(val) &&
        item.year <= Number(val2) &&
        item.rating >= Number(val3)
    );
    setArr(filtredMovies);
    if (janre !== "") {
      const filtredMovies1 = filtredMovies.filter(
        (item) => item.janres === janre
      );
      setArr(filtredMovies1);
    }
  };
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <div className={styles.paginate}>
          <div className={styles.cards}>
            {arr.length <= 0
              ? data.map((item) => (
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
                ))
              : arr.map((item) => (
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
        </div>
        <div className={styles.filter}>
          <form>
            <p>
              Выберите год <br /> от:
            </p>
            <Input
              value={val}
              min={1980}
              max={2024}
              step={1}
              onChange={(e) => setVal(e.target.value)}
            />
            <p>до:</p>
            <Input
              value={val2}
              min={1980}
              max={2024}
              step={1}
              onChange={(e) => setVal2(e.target.value)}
            />
          </form>
          <div className={styles.changeRating}>
            <p>Рейтинг от:</p>
            <Input
              value={val3}
              min={1}
              max={10}
              step={1}
              onChange={(e) => setVal3(e.target.value)}
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
