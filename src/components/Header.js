import React, { useState, useEffect } from "react";
import { AiFillHome, AiFillInfoCircle } from "react-icons/ai";
import Link from "next/link";
import MenuItem from "./MenuItem";
import DarkMode from "./DarkMode";
import Image from 'next/image'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortingOption, setSortingOption] = useState("popularity");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Fetch movie search results from TMDb API
      const fetchSearchResults = async () => {
        try {
          const apiKey = "API_KEY";
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
          );
          const data = await response.json();
          setSearchResults(data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };

      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    // The search results are already fetched in the useEffect
    console.log("Searching for:", searchQuery);
  };

  const handleSortChange = async (e) => {
    const selectedOption = e.target.value;
    setSortingOption(selectedOption);

    try {
      const apiKey = "API_KEY";
      const apiEndpoint = getApiEndpoint(selectedOption);
      const response = await fetch(
        `https://api.themoviedb.org/3/${apiEndpoint}?api_key=${apiKey}&query=${searchQuery}`
      );
      const data = await response.json();
      // Sort the searchResults based on the selected option
      const sortedResults = sortResults(data.results, selectedOption);
      setSearchResults(sortedResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const getApiEndpoint = (selectedOption) => {
    if (selectedOption === "popularity") {
      return "trending/all/week";
    } else if (selectedOption === "top_rated") {
      return "movie/top_rated";
    } else if (selectedOption === "release_date") {
      return "discover/movie";
    }
  };

  // Helper function to sort results based on the selected option
  const sortResults = (results, selectedOption) => {
    const sortedResults = [...results];

    if (selectedOption === "popularity") {
      // Implement sorting logic based on popularity
      sortedResults.sort((a, b) => b.popularity - a.popularity);
    } else if (selectedOption === "release_date") {
      // Implement sorting logic based on release date
      sortedResults.sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date);
        const dateB = new Date(b.release_date || b.first_air_date);
        return dateB - dateA;
      });
    }

    return sortedResults;
  };

  return (
    <>
      <div className="flex justify-between mx-2 max-w-5xl sm:mx-auto items-center py-6">
        <div className="flex">
          <MenuItem title={"HOME"} address={"/"} Icon={AiFillHome} />
          <MenuItem title={"About"} address={"/about"} Icon={AiFillInfoCircle} />
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
              {/* Add an icon or text here */}
              Search
            </button>
          </div>

          {/* Sorting options */}
          <select
            value={sortingOption}
            onChange={handleSortChange}
            className="border rounded-md p-2 ml-2"
          >
            <option value="popularity">Popularity</option>
            <option value="top_rated">Top Rated</option>
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

    {/* Display search results as a list of movie posters */}
    <div className="flex flex-wrap justify-center ">
        {searchResults.map((result) => (
          <Link key={result.id} href={`/movie/${result.id}`}>
            <div className="cursor-pointer m-2 group relative">
              <Image
                src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                width={200}
                height={300}
                alt={result.title || result.name}
                className="rounded-md transition duration-200 transform group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-50 rounded-md">
                <div className="text-white text-center">
                  <p className="text-lg font-bold">{result.title || result.name}</p>
                  <p>{result.release_date || result.first_air_date}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default Header;
