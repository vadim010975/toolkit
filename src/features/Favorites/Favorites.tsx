import "./Favorites.css";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { removeMovie, selectFavorites } from "./favoritesSlice";
import { Movie } from "../../entities/Movies";
import { fetchCardMovie } from "../Card/cardSlice";


export default function Favorites() {
  const navigate = useNavigate();
  const favoritesList = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  const handleClick = (item: Movie) => {
    dispatch(removeMovie(item));
  }

  const unfavourite = () => {
    navigate("/");
  }

  const showMovieCard = (imdbID: string)  => {
    dispatch(fetchCardMovie(imdbID));
    navigate("/card");
  }

  return (
    <div className="favorites">
      <h3 className="favorites__title">Избранное</h3>
      <button onClick={unfavourite} className="favorites__btn_cancel">Выйти из избранного</button>
      <div className="favorites-list">
        {favoritesList.map(item => (
          <div className="favorites-list__item" key={item.imdbID}>
            <div onClick={() => showMovieCard(item.imdbID)} className="favorites-list__item_wrapper">
              <div className="favorites-list__item_title">Название: {item.Title}</div>
              <div className="favorites-list__item_year">Год: {item.Year}</div>
              <img src={item.Poster} alt="images" className="favorites-list__item_img" />
            </div>
            <button onClick={() => handleClick(item)} className="favorites-list__item_btn">Удалить из избранного</button>
          </div>
        ))}
      </div>
    </div>
  );
}