import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineEnter,
} from "react-icons/ai";

import {
  singleCompanyInterface,
  companiesInterface,
} from "../interfaces/companyInterface";
import ResultItem from "./ResultItem";
import DetailsModal from "./DetailsModal";
import { Pagination } from "antd";
import { fetchCompanies } from "../functions/fetchCompanies";

interface resultListPropsInterface {
  singleCompany: singleCompanyInterface | null;
  companies: companiesInterface | null;
  setCompanies?: Dispatch<SetStateAction<companiesInterface | null>>;
}

function ResultList({
  singleCompany,
  companies,
  setCompanies,
}: resultListPropsInterface) {
  const [selectedItemOrgNo, setSelectedItemOrgNo] = useState<number | null>(
    null
  );

  const [highLightedItem, setHighLightedItem] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
  }, []);
  let row = 0;
  const handleKeyPress = ({ keyCode }: { keyCode: number }) => {
    if (keyCode == 40) {
      if (row < 20) {
        setHighLightedItem((prevState) => prevState + 1);
        row = row + 1;
      }
    } else if (keyCode == 38) {
      if (row > 1) {
        setHighLightedItem((prevState) => prevState - 1);
        row = row - 1;
      }
    } else if (keyCode == 13) {
      let elem: HTMLDivElement | null = document.querySelector(
        ".highlighted-result-item"
      );
      if (elem) {
        setSelectedItemOrgNo(Number(elem.id));
      }
    } else if (keyCode == 27) {
      setSelectedItemOrgNo(null);
    }
  };

  const fetchPagination = async (page: number) => {
    const elem: HTMLInputElement | null = document.querySelector(".searchbar");
    if (elem) {
      const companies = await fetchCompanies(elem.value, page);
      if (companies && setCompanies) {
        setCompanies(companies);
      }
    }
  };
  return (
    <>
      <div className="result-list-container">
        {singleCompany && (
          <ResultItem
            singleCompany={singleCompany}
            setSelectedItemOrgNo={setSelectedItemOrgNo}
          />
        )}
        {companies && (
          <div className="result-header">
            <div>Results: {companies.page.totalElements}</div>
            <div className="navigate-info">
              Navigate: <AiOutlineArrowDown /> <AiOutlineArrowUp />
              <AiOutlineEnter />
            </div>
          </div>
        )}

        {companies &&
          companies._embedded.enheter.map((singleCompany, index) => (
            <ResultItem
              singleCompany={singleCompany}
              setSelectedItemOrgNo={setSelectedItemOrgNo}
              rowNumber={index + 1}
              highLightedItem={highLightedItem}
            />
          ))}
        {companies && (
          <div className="pagination-container">
            <Pagination
              total={companies.page.totalElements}
              pageSize={20}
              hideOnSinglePage
              onChange={(page, pageSize) => fetchPagination(page - 1)}
              defaultCurrent={1}
              showSizeChanger={false}
            />
          </div>
        )}
        {selectedItemOrgNo && (
          <DetailsModal
            setSelectedItemOrgNo={setSelectedItemOrgNo}
            selectedItemOrgNo={selectedItemOrgNo}
          />
        )}
      </div>
    </>
  );
}

export default ResultList;
