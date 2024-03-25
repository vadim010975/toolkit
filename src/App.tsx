import './App.css';
import Search from './features/Search/Search';
import Card from './features/Card/Card';
import Favorites from './features/Favorites/Favorites';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./entities/Movies/Layout";
import MovieNotFound from './widgets/MovieNotFound';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Search,
      },
      {
        path: "/card",
        Component: Card,
      },
      {
        path: "/favorites",
        Component: Favorites,
      },
      {
        path: "/movieNotFound",
        Component: MovieNotFound,
      },
    ],
  },
]);


export default function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}