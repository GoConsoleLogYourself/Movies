import { FC } from "react";
import styles from "./favouriteMoviesList.module.scss";
import { useGetFavouriteMoviesQuery } from "../../store/moviesApi";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const FavouriteMoviesList: FC = () => {
  const { data = [] } = useGetFavouriteMoviesQuery(40);
  const navigate = useNavigate();
  return (
    <div className={styles.favouritesList}>
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
          Ваш список избранного пуст.{" "}
          <span onClick={() => navigate("/movies")}>
            Перейти ко всем фильмам.
          </span>
        </p>
      )}
    </div>
  );
};

export default FavouriteMoviesList;
