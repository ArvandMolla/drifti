import axiosInstance from "../util/axios";
import { fetchSingleCompany } from "../functions/fetchSingleCompany";
import { SetStateAction, Dispatch, useState, useEffect } from "react";
import {
  singleCompanyInterface,
  companiesInterface,
} from "../interfaces/companyInterface";
import { fetchCompanies } from "../functions/fetchCompanies";

interface searchBarPropsInterface {
  setCompanies: Dispatch<SetStateAction<companiesInterface | null>>;
  setSingleCompany: Dispatch<SetStateAction<singleCompanyInterface | null>>;
  setNoResult: Dispatch<SetStateAction<boolean>>;
}

function SearchBar({
  setCompanies,
  setSingleCompany,
  setNoResult,
}: searchBarPropsInterface) {
  const [input, setInput] = useState<string | number>("");

  useEffect(() => {
    inputHandler();
  }, [input]);

  const inputHandler = async () => {
    if (isNaN(Number(input))) {
      if (typeof input === "string" && input.length > 2) {
        const companies = await fetchCompanies(input, 0);

        if (companies) {
          setCompanies(companies);
          setSingleCompany(null);
          setNoResult(false);
        } else {
          setCompanies(null);
          setSingleCompany(null);
          setNoResult(false);
        }
      }
    } else {
      if (input.toString().length === 9) {
        const singleCoFetchResult = await fetchSingleCompany(Number(input));
        if (singleCoFetchResult) {
          setSingleCompany(singleCoFetchResult);
          setCompanies(null);
          setNoResult(false);
        } else {
          setNoResult(true);
          setSingleCompany(null);
          setCompanies(null);
        }
      }
    }
  };

  return (
    <div className="searchbar-container">
      <input
        placeholder="Org.No or name"
        value={input ? input : ""}
        className="searchbar"
        onChange={(e) => setInput(e.target.value)}
      ></input>
    </div>
  );
}

export default SearchBar;
