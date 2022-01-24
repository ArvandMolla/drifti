import { useState } from "react";
import ResultList from "../components/ResultList";
import SearchBar from "../components/SearchBar";
import {
  singleCompanyInterface,
  companiesInterface,
} from "../interfaces/companyInterface";

function Home() {
  const [companies, setCompanies] = useState<companiesInterface | null>(null);
  const [singleCompany, setSingleCompany] =
    useState<singleCompanyInterface | null>(null);
  const [noResult, setNoResult] = useState<boolean>(false);

  return (
    <>
      <SearchBar
        setCompanies={setCompanies}
        setSingleCompany={setSingleCompany}
        setNoResult={setNoResult}
      />
      {companies && companies._embedded && (
        <ResultList
          companies={companies}
          singleCompany={singleCompany}
          setCompanies={setCompanies}
        />
      )}

      {singleCompany && (
        <ResultList companies={companies} singleCompany={singleCompany} />
      )}
      <div className="no-result-container">
        {companies && !companies._embedded && !noResult && (
          <p className="no-result-message">No company was found!</p>
        )}
        {noResult && !companies && (
          <p className="no-result-message">
            No company with this Org.No was found!
          </p>
        )}
      </div>
    </>
  );
}

export default Home;
