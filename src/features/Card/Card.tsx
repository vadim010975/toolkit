import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectCard, clear } from "./cardSlice";


export default function Favorites() {
  const navigate = useNavigate();
  const card = useAppSelector(selectCard);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(clear());
    navigate(-1);
  }

  return (
    <div className="card">
      <h3 className="card__title">Карта фильма</h3>
      {card.poster && <img src={card.poster} alt="images" className="card__img" />}
      <div className="card__title">{card.title}</div>
      <div className="card__year">{card.year}</div>
      <div className="card__genre">{card.genre}</div>
      <div className="card__runtime">{card.runtime}</div>
      <div className="card__director">{card.director}</div>
      <div className="card__actors">{card.actors}</div>
      <div className="card__imdb-rating">{card.imdbRating}</div>
      <button onClick={handleClick} className="card__btn_cancel">Вернуться</button>
    </div>
  );
}