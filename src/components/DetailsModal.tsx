import { Col, Modal, Row } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { fetchSingleCompany } from "../functions/fetchSingleCompany";
import { singleCompanyInterface } from "../interfaces/companyInterface";
import DetailItem from "./DetailItem";

interface detailsModalPropsInterface {
  setSelectedItemOrgNo: Dispatch<SetStateAction<number | null>>;
  selectedItemOrgNo: number | null;
}

function DetailsModal({
  setSelectedItemOrgNo,
  selectedItemOrgNo,
}: detailsModalPropsInterface) {
  const [singleCompany, setSingleCompany] =
    useState<singleCompanyInterface | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetchSingleCompany(Number(selectedItemOrgNo));
    if (res) {
      setSingleCompany(res);
    }
  };

  return (
    <Modal
      title={singleCompany && singleCompany.navn}
      visible={true}
      onCancel={() => setSelectedItemOrgNo(null)}
      footer={null}
      width={700}
      centered
    >
      {!singleCompany ? (
        <p>Please wait ...</p>
      ) : (
        <>
          {singleCompany.organisasjonsform.beskrivelse &&
            singleCompany.naeringskode1 && (
              <Row>
                <Col xs={24}>
                  <DetailItem
                    title={"Beskrivelse"}
                    value={
                      singleCompany.organisasjonsform.beskrivelse +
                      ". " +
                      singleCompany.naeringskode1.beskrivelse +
                      ". "
                    }
                  />
                </Col>
              </Row>
            )}
          {singleCompany.organisasjonsform.beskrivelse &&
            !singleCompany.naeringskode1 && (
              <Row>
                <Col xs={24}>
                  <DetailItem
                    title={"Beskrivelse"}
                    value={singleCompany.organisasjonsform.beskrivelse + ". "}
                  />
                </Col>
              </Row>
            )}
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <DetailItem
                title={"Organisasjonsnummer"}
                value={singleCompany.organisasjonsnummer}
              />
            </Col>
            {singleCompany.konkurs && (
              <Col xs={24} sm={12}>
                <DetailItem title={"Stat"} value={"konkurs"} />
              </Col>
            )}
            {singleCompany.hjemmeside && (
              <Col xs={24} sm={12}>
                <DetailItem
                  title={"Hjemmeside"}
                  value={singleCompany.hjemmeside}
                  href={singleCompany.hjemmeside}
                />
              </Col>
            )}
            {singleCompany.forretningsadresse && (
              <>
                <Col xs={24} sm={12}>
                  <DetailItem
                    title={"Land"}
                    value={singleCompany.forretningsadresse.land}
                  />
                </Col>
                <Col xs={24} sm={12}>
                  <DetailItem
                    title={"Kommune"}
                    value={singleCompany.forretningsadresse.kommune}
                  />
                </Col>
              </>
            )}
          </Row>
        </>
      )}
    </Modal>
  );
}

export default DetailsModal;
