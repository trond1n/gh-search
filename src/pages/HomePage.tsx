import React, { useState, useEffect } from "react";
import { useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounce";

const HomePage: React.FC = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { isLoading, isError, data } = useSearchUsersQuery("vladilen");
  console.log(data);
  useEffect(() => {}, [debounced]);
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Somethig went wrong...</p>}
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42] mp-2"
          placeholder="Search for Github username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="absolute top-[42] left-0 right-0 max-h-[200px] shadow-md bg-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, rem!
        </div>
      </div>
    </div>
  );
};

export default HomePage;
