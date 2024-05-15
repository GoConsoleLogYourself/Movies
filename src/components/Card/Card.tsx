import { FC } from "react";
import styles from "./card.module.scss";

interface CardProps {
  title: string;
  img: string;
  rating: number;
  date: string;
  janre: string;
  noDesc?: boolean;
  onClick: () => void;
}

const Card: FC<CardProps> = ({
  title,
  img,
  rating,
  date,
  janre,
  noDesc,
  onClick,
}) => {
  return (
    <div onClick={onClick} className={styles.card}>
      <div className={styles.rating}>
        <p>{rating}</p>
      </div>
      <img src={img} alt={title} />
      <div className={noDesc ? styles.none : styles.info}>
        <h5>{title}</h5>
        <p>{date}</p>
        <p>{janre}</p>
      </div>
    </div>
  );
};

export default Card;
