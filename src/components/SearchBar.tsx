import { SetStateAction, Dispatch, useState, useEffect } from "react";

interface searchBarPropsInterface {
  setInput: Dispatch<SetStateAction<string | number | null>>;
  input: string | number | null;
}

function SearchBar() {
  const [input, setInput] = useState<string | number | null>(null);

  useEffect(() => {
    inputHandler();
  }, [input]);

  const inputHandler = () => {
    if (input && typeof input === "string") {
      if (input.length > 3) {
        fetchCompanies();
      }
    }
    if (input && typeof input === "number") {
      if (input.toString().length === 9) {
        fetchSingleCompany();
      }
    }
  };

  const fetchCompanies = async () => {};
  const fetchSingleCompany = async () => {};

  return (
    <div>
      <input
        className="searchbar"
        onChange={(e) => setInput(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchBar;
