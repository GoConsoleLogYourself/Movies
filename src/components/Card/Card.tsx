import { FC } from "react";
import styles from "./card.module.scss";
import close from "../../assets/close.png";

interface CardProps {
  id?: number;
  title: string;
  img: string;
  rating: number;
  date: string;
  janre: string;
  noDesc?: boolean;
  deleteBtn?: boolean;
  onClick: () => void;
  onDeleteBtnClick?: (id: number) => void;
}

const Card: FC<CardProps> = ({
  id,
  title,
  img,
  rating,
  date,
  janre,
  noDesc,
  deleteBtn,
  onClick,
  onDeleteBtnClick,
}) => {
  return (
    <div className={styles.container}>
      <div
        onClick={() => onDeleteBtnClick!(id!)}
        className={deleteBtn ? styles.close : styles.none}
      >
        <img src={close} alt="close" />
      </div>
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
    </div>
  );
};

export default Card;
