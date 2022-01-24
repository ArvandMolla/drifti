import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { Modal, Button } from "antd";
import { singleCompanyInterface } from "../interfaces/companyInterface";

interface resultItemPropsInterface {
  singleCompany: singleCompanyInterface;
  setSelectedItemOrgNo: Dispatch<SetStateAction<number | null>>;
  rowNumber?: number;
  highLightedItem?: number;
}

function ResultItem({
  singleCompany,
  setSelectedItemOrgNo,
  rowNumber,
  highLightedItem,
}: resultItemPropsInterface) {
  return (
    <div
      id={singleCompany.organisasjonsnummer}
      className={
        highLightedItem == rowNumber
          ? `highlighted-result-item  result-item`
          : `result-item`
      }
      onClick={(e: any) => {
        if (!e) var e: any = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        setSelectedItemOrgNo(e.target.id);
      }}
    >
      {singleCompany.navn}
      <div
        className="result-item-footer"
        onClick={(e: any) => {
          if (!e) var e: any = window.event;
          e.cancelBubble = true;
          if (e.stopPropagation) e.stopPropagation();
          setSelectedItemOrgNo(e.target.parentNode.id);
          console.log("footer clicked: ", e.target.parentNode.id);
        }}
      >
        <span>
          Org.No:
          <span className="result-item-footer-details">
            {" " + singleCompany.organisasjonsnummer}
          </span>
        </span>
        <span>
          Founded:
          <span className="result-item-footer-details">
            {singleCompany.stiftelsesdato
              ? " " + singleCompany.stiftelsesdato
              : " -"}
          </span>
        </span>
      </div>
    </div>
  );
}

export default ResultItem;
