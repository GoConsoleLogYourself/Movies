import { FC } from "react";
import styles from "./moviePage.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { useGetMoviesQuery } from "../../store/moviesApi";
import Player from "../../components/Player/Player";

const MoviePage: FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data = [] } = useGetMoviesQuery(40);
  const currentMovie = data.find((item) => item.title === params.title);
  return (
    <>
      <Header data={data} />
      <div className={styles.goBack} onClick={() => navigate(-1)}>
        {"< Назад"}
      </div>
      <div className={styles.movieContainer}>
        <div className={styles.movieInfo}>
          <img src={currentMovie?.img} alt="img" />
          <div className={styles.movieDesc}>
            <p>{currentMovie?.title}</p>
            <p>Дата выхода: {currentMovie?.date}</p>
            <p>Рейтинг Kinopoisk: {currentMovie?.rating}</p>
            <p>Жанр: {currentMovie?.janres}</p>
            <p>{currentMovie?.desc}</p>
          </div>
        </div>
        <div className={styles.player}>
          <Player poster={currentMovie!.poster} />
        </div>
      </div>
    </>
  );
};

export default MoviePage;
