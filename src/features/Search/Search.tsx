import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchListMovies, selectListMovies, reset } from "./searchSlice";
import { Movie } from "../../entities/Movies";
import { addMovie, selectFavorites } from "../Favorites/favoritesSlice";
import { fetchCardMovie } from "../Card/cardSlice";


export default function Search() {
  const navigate = useNavigate();
  const listMovies = useAppSelector(selectListMovies);
  const favoritesList = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  const [data, setData] = useState<{ name: string }>({ name: "Terminator" });

  const handleUpdatePostField: React.FormEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {

    const { name, value } = event.currentTarget;

    setData(data => {
      return {
        ...data,
        [name]: value
      }
    });
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    dispatch(fetchListMovies(data.name));
  }

  const handleClick = (item: Movie) => {
    dispatch(addMovie(item));
  }

  const goToFavorites = () => {
    navigate("/favorites");
  }

  const resetForm = () => {
    setData({ name: "" });
    dispatch(reset());
  }

  const showMovieCard = (imdbID: string)  => {
    dispatch(fetchCardMovie(imdbID));
    navigate("/card");
  }

  return (
    <div className="search">
      <h3 className="search__title">Введите название фильма</h3>
      <form onSubmit={handleSubmit} className="search__form">
        <input className="search__form_input" value={data.name ?? ''} name='name' onInput={handleUpdatePostField} required />
        <button type="reset" onClick={resetForm} className="search__form_btn_submit">X</button>
        <button type="submit" className="search__form_btn_submit">Найти</button>
      </form>
      {favoritesList.length > 0 && <button onClick={goToFavorites} className="search__btn_favorites">Перейти в избранное</button>}
      {listMovies.length > 0 && <div className="search-list">
        {listMovies.map(item => (
          <div className="search-list__item" key={item.imdbID}>
            <div onClick={() => showMovieCard(item.imdbID)} className="search-list__wrapper">
              <div className="search-list__item_title">{item.Title}</div>
              <div className="search-list__item_year">{item.Year}</div>
              <img src={item.Poster} alt="images" className="search-list__item_img" />
            </div>
            <button onClick={() => handleClick(item)} className="search-list__item_btn">Добавить в избранное</button>
          </div>
        ))}
      </div>}
    </div>
  );
}