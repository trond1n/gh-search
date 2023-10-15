import React, { useState, useEffect } from "react";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";
import Repocard from "../components/Repocard";

const HomePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length <= 4,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();
  useEffect(() => {
    if (debounced.length >= 4 && data && data.length > 0) {
      setDropdown(true);
    } else {
      setDropdown(false);
    }
  }, [debounced, data]);

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setDropdown(false);
  };
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && <p>Something went wrong...</p>}
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42] mb-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown && (
          <ul className=" list-none absolute top-[42] left-0 right-0 max-h-[200px] shadow-md overflow-y-scroll bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.length &&
              data?.map((user) => (
                <li
                  onClick={() => clickHandler(user.login)}
                  key={user.id}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {user.login}
                </li>
              ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && <p className="text-center">Loading...</p>}
          {repos?.map((repo) => (
            <Repocard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
