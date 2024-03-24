const _URL = "http://www.omdbapi.com/?apikey=64405bd2&";

export async function fetchListMovies (name: string ) {
  const r = await fetch(_URL + "s=" + name + "&type=movie");
  const response = await r.json();
  return response;
}

export async function fetchCardMovie (imdbID: string ) {
  const r = await fetch(_URL + "i=" + imdbID);
  const response = await r.json();
  return response;
}