// components/InputSearch.tsx

import React from "react";

interface InputSearchProps {
  countFilteredPodcast: number;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const InputSearch = ({
  countFilteredPodcast,
  setSearchString,
}: InputSearchProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  return (
    <div className="flex justify-end items-center">
      <p className="bg-sky-600 font-bold text-white mx-2 px-1.5 rounded-lg">
        {countFilteredPodcast}
      </p>
      <input
        type="text"
        onChange={handleInputChange}
        className="text-sm font-medium pl-4 pr-4 py-1.5 border rounded-md focus:outline-none focus:border-blue-500 w-80"
        placeholder="Filter podcasts..."
      />
    </div>
  );
};

export default InputSearch;
