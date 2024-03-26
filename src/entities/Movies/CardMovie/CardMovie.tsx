import "./CardMovie.css";
import { FC } from "react";
import { Movie } from "../model";


type CardMovieProps = {
  movie: Movie,
  showMovieCard: (str: string) => void;
}


const CardMovie: FC<CardMovieProps> = ({ movie, showMovieCard}) => {

  return (
    <>
      <div onClick={() => showMovieCard(movie.imdbID)} className="card-movies">
        <div className="card-movies__title">Название: {movie.Title}</div>
        <div className="card-movies__year">Год: {movie.Year}</div>
        <img src={movie.Poster} alt="images" className="card-movies__img" />
      </div>
    </>
  );
}

export default CardMovie;