import React from "react";
import SearchForm from "./SearchForm";

const SearchFilter = ({ getCountryByName, onSelect, clearResults }) => {
  const filterRegion = (e) => {
    const regionName = e.target.value;
    if (regionName) {
      onSelect(regionName);
    }
  };
  const onSearch = (input) => {
    // console.log("New Search submit", input);
    getCountryByName(input);
  };

  return (
    <div>
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 w-4/5 mx-auto my-0 py-8">
        {/* Search by Name */}
        <SearchForm onSearch={onSearch} clearResults={clearResults} />

        {/* Filter by Region */}
        <div className="filter shadow-md ">
          <select
            aria-label="regions"
            id="regions"
            onChange={filterRegion}
            className="px-3 py-2 bg-neutral-50 text-sm cursor-pointer rounded-md dark:bg-[#2b3945] "
            name="regions"
          >
            <option hidden >
              Filter By Region
            </option>

            <option value="Africa" className="cursor-pointer">
              Africa
            </option>
            <option value="America" className="cursor-pointer">
              America
            </option>
            <option value="Asia" className="cursor-pointer">
              Asia
            </option>
            <option value="Europe" className="cursor-pointer">
              Europe
            </option>
            <option value="Oceania" className="cursor-pointer">
              Oceania
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
