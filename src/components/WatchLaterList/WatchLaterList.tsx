import { FC } from "react";
import styles from "./watchLaterList.module.scss";
import {
  useDeleteWatchLaterMoviesMutation,
  useGetWatchLaterMoviesQuery,
} from "../../store/moviesApi";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const WatchLaterList: FC = () => {
  const { data = [] } = useGetWatchLaterMoviesQuery(40);
  const [deleteMovie] = useDeleteWatchLaterMoviesMutation();
  const navigate = useNavigate();
  const { id } = useAuth();
  const currentUserWatchLater = data.filter((item) =>
    item.id.toString().includes(id)
  );
  const handleDeleteFromWatchLater = async (id: number) => {
    await deleteMovie(id).unwrap();
  };
  return (
    <div className={styles.watchLaterList}>
      {currentUserWatchLater.length > 0 ? (
        currentUserWatchLater.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            rating={item.rating}
            date={item.date}
            img={item.img}
            janre={item.janres}
            noDesc
            deleteBtn
            onDeleteBtnClick={() => handleDeleteFromWatchLater(item.id)}
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
