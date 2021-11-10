import React from "react";

const Search = ({ filterName }) => {
  return (
    <div id="search">
      <label htmlFor="filter">Filter shown with: </label>
      <input id="filter" onChange={filterName} />
    </div>
  );
};

export default Search;
