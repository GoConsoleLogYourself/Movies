import { FC, FormEvent, useState } from "react";
import styles from "./comments.module.scss";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IComment } from "../../models/IComment";
import {
  addComment,
  decrementLikes,
  deleteComment,
  incrementLikes,
} from "../../store/slices/commentSlice";

interface CommentsProps {
  comments: IComment[];
  title: string;
}
const Comments: FC<CommentsProps> = ({ comments, title }) => {
  const [comment, setComment] = useState<string>("");
  const [likesID, setLikesID] = useState<number>(0);
  const [likes, setLikes] = useState<string>("");
  const [dislikesID, setDislikesID] = useState<number>(0);
  const [dislikes, setDislikes] = useState<string>("");
  const { userName } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
    dispatch(
      addComment({
        date: currentDate,
        id: Date.now(),
        comment,
        likes: 0,
        title,
        userName,
      })
    );
    setComment("");
  };
  const handleLike = (id: number) => {
    if (likes === userName && likesID === id) {
      return undefined;
    } else {
      dispatch(incrementLikes(id));
      setLikes(userName);
      setLikesID(id);
      setDislikes("");
      setDislikesID(0);
    }
  };
  const handleDislike = (id: number) => {
    if (dislikes === userName && dislikesID === id) {
      return undefined;
    } else {
      dispatch(decrementLikes(id));
      setDislikes(userName);
      setDislikesID(id);
      setLikes("");
      setLikesID(0);
    }
  };
  return (
    <>
      <h2 className={styles.header}>Оставьте комментарий!</h2>
      <form className={styles.form}>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Отправить</button>
      </form>
      <section className={styles.comments}>
        {comments.length ? (
          comments.map((item) => (
            <div className={styles.comment} key={item.id}>
              <div className={styles.dateAndUserName}>
                <span>{item.userName}</span> <span>{item.date}</span>{" "}
              </div>
              <p className={styles.commentText}>{item.comment}</p>
              <div className={styles.likesAndDeleteComment}>
                <div className={styles.likes}>
                  <div onClick={() => handleLike(item.id)}>
                    <img src={like} alt="like" />
                  </div>
                  <p
                    className={
                      item.likes >= 0
                        ? styles.likesCountPositive
                        : styles.likesCountNegative
                    }
                  >
                    {item.likes}
                  </p>
                  <div onClick={() => handleDislike(item.id)}>
                    <img src={dislike} alt="dislike" />
                  </div>
                </div>
                <span
                  className={
                    userName === item.userName
                      ? styles.deleteComment
                      : styles.none
                  }
                  onClick={() => dispatch(deleteComment(item.id))}
                >
                  Удалить комментарий
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Комментариев пока нет,будьте первыми!</p>
        )}
      </section>
    </>
  );
};

export default Comments;
