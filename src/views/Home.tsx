import React, { useState } from "react";
import ResultList from "../components/ResultList";
import SearchBar from "../components/SearchBar";

function Home() {
  return (
    <div>
      <SearchBar />
      <ResultList />
    </div>
  );
}

export default Home;
