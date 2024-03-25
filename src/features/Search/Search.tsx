import "./Search.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { fetchListMovies, selectListMovies, reset, selectResponse, selectStatus } from "./searchSlice";
import { Movie } from "../../entities/Movies";
import { addMovie, selectFavorites } from "../Favorites/favoritesSlice";
import { fetchCardMovie } from "../Card/cardSlice";


export default function Search() {
  const navigate = useNavigate();
  const listMovies = useAppSelector(selectListMovies);
  const response = useAppSelector(selectResponse);
  const status = useAppSelector(selectStatus);
  const favoritesList = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (response === "False") {
      navigate("/movieNotFound");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

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
      <h3 className="search__title">Поиск фильма</h3>
      <form onSubmit={handleSubmit} className="search__form">
        <div className="search__form_input-wrapper">
          <input className="search__form_input" value={data.name ?? ''} name='name' onInput={handleUpdatePostField} required />
          <button type="reset" onClick={resetForm} className="search__form_btn_reset">X</button>
        </div>
        <button type="submit" className="search__form_btn_submit">Найти</button>
        {favoritesList.length > 0 && <button onClick={goToFavorites} type="button" className="search__btn_favorites">Перейти в избранное</button>}
      </form>
      {status === "loading" && <div className="search__status">...Загружается</div>}
      {status === "idle" && <div className="search-list">
        {listMovies.map(item => (
          <div className="search-list__item" key={item.imdbID}>
            <div onClick={() => showMovieCard(item.imdbID)} className="search-list__wrapper">
              <div className="search-list__item_title">Название: {item.Title}</div>
              <div className="search-list__item_year">Год: {item.Year}</div>
              <img src={item.Poster} alt="images" className="search-list__item_img" />
            </div>
            <button onClick={() => handleClick(item)} className="search-list__item_btn">Добавить в избранное</button>
          </div>
        ))}
      </div>}
    </div>
  );
}