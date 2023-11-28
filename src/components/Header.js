"use client"
import React ,{useState} from "react";
import MenuItem from "./MenuItem";
import { AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import Link from "next/link";
import DarkMode from "./DarkMode";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingOption, setSortingOption] = useState("popularity");

  const handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  const handleSortChange = (e) => {
    setSortingOption(e.target.value);
    // Implement your sorting logic here
    console.log("Sorting by:", e.target.value);
  };

  return (
    <>
      <div className="flex justify-between mx-2 max-w-5xl sm:mx-auto items-center py-6">
        <div className="flex">
          <MenuItem title={"HOME"} address={"/"} Icon={AiFillHome} />
          <MenuItem
            title={"About"}
            address={"/about"}
            Icon={AiFillInfoCircle}
          />
        </div>
        <div className="flex items-center space-x-5">
          <DarkMode />
          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-md p-2"
            />
            <button
              onClick={handleSearch}
              className="absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
            >
            </button>
          </div>

          {/* Sorting options */}
          <select
            value={sortingOption}
            onChange={handleSortChange}
            className="border rounded-md p-2 ml-2"
          >
            <option value="popularity">Popularity</option>
            <option value="release_date">Release Date</option>
          </select>
          <Link href="/">
            <h2 className="text-2xl">
              <span className="font-bold bg-amber-500 py-1 px-2 rounded-lg">
                Movie
              </span>
              <span className="text-xl hidden sm:inline">Flix</span>
            </h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;