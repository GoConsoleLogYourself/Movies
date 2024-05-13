import { FC } from "react";
import styles from "./watchLaterList.module.scss";
import { useGetWatchLaterMoviesQuery } from "../../store/moviesApi";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const WatchLaterList: FC = () => {
  const { data = [] } = useGetWatchLaterMoviesQuery(40);
  const navigate = useNavigate();
  return ( 
    <div className={styles.watchLaterList}>
      {data.length > 0 ? (
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
        <p>
          Ваш список отложенных фильмов пуст.{" "}
          <span onClick={() => navigate("/movies")}>
            Перейти ко всем фильмам.
          </span>
        </p>
      )}
    </div>
  );
};

export default WatchLaterList;
