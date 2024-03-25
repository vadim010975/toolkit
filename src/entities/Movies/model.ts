export interface Movie {
  Title: string,
  Year: string,
  imdbID: string,
  Type: string,
  Poster: string,
}


export interface CardMovie {
  poster: string | undefined,
  title: string | undefined,
  year: string | undefined,
  genre: string | undefined,
  runtime: string | undefined,
  director: string | undefined,
  actors: string | undefined,
  imdbRating: string | undefined,
  response: "False" | "True",
}