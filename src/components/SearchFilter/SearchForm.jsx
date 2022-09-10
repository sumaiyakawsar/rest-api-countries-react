import React, { useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const SearchForm = ({ onSearch,clearResults }) => {
  const [input, setInput] = useState(``);
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => setInput(debouncedInput), 1000);
    return () => clearTimeout(timer);
  }, [debouncedInput]);

  useEffect(() => {
    // Search Country
    if (input !== ``) {
      onSearch(input);
    }
    else{
      clearResults();
    }
  }, [input]);

  return (
    <div className="search-input bg-neutral-50 dark:bg-[#2b3945] flex items-center shadow-md rounded-md gap-4 px-4 py-2">
      <BiSearchAlt2 className="text-lg" />
      <input
        type="text"
        placeholder="Search for a country..."
        name="country"
        value={debouncedInput}
        className="bg-transparent focus:bg-transparent dark:focus-within:bg-transparent  text-sm placeholder:text-[#111517] dark:placeholder:text-white"
        onChange={(e) => setDebouncedInput(e.target.value)}
      />
    </div>
  );
};

export default SearchForm;
