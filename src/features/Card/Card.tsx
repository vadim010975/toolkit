import "./Card.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCard, clear, selectCardStatus } from "./cardSlice";


export default function Favorites() {
  const navigate = useNavigate();
  const card = useAppSelector(selectCard);
  const status = useAppSelector(selectCardStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (card.response === "False") {
      navigate("/movieNotFound");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card]);

  const handleClick = () => {
    dispatch(clear());
    navigate(-1);
  }

  return (
    <div className="card">
      <h3 className="card__title">Карта фильма</h3>
      {status === "loading" && <div className="card__loading">...Загружается</div>}
      {status === "idle" && <div className="card__wrapper">
        {card.poster && <img src={card.poster} alt="images" className="card__img" />}
        <div className="card__data">
          <div className="card__movie-title">Название: {card.title}</div>
          <div className="card__year">Год: {card.year}</div>
          <div className="card__genre">Жанр: {card.genre}</div>
          <div className="card__runtime">Продолжительность: {card.runtime}</div>
          <div className="card__director">Режиссер: {card.director}</div>
          <div className="card__actors">Актеры: {card.actors}</div>
          <div className="card__imdb-rating">imdb рейтинг: {card.imdbRating}</div>
          <button onClick={handleClick} className="card__btn_cancel">Вернуться</button>
        </div>
      </div>}
    </div>
  );
}