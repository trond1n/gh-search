import React from "react";
import { IRepo } from "../models/models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

const Repocard: React.FC<{ repo: IRepo }> = ({ repo }) => {
  const { addFavorite, removeFavorite } = useActions();
  const { favorites } = useAppSelector((state) => state.github);
  const [isFav, setIsFav] = React.useState(favorites.includes(repo.html_url));
  const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    addFavorite(repo.html_url);
    setIsFav(true);
  };
  const removeFromFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault;
    removeFavorite(repo.html_url);
    setIsFav(false);
  };
  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank"></a>
      <h2 className="text-lg font-bold">{repo.full_name}</h2>
      <p className="text-sm">
        Forks: <span className="font-bold mr-2">{repo.forks}</span>
        Watchers: <span className="font-bold mr-2">{repo.watchers}</span>
      </p>
      <p className="text-sm font-thin">{repo?.description}</p>
      {!isFav ? (
        <button
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={addToFavorite}
        >
          Add
        </button>
      ) : (
        <button
          className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
          onClick={removeFromFavorite}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default Repocard;
