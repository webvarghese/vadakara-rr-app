import React, { useEffect } from "react"
import DCBHeading from "./DCBHeading"
import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import { useData } from "../Contexts/DataContext"
import DCBLine from "./DCBLine"

const DCBStatement = () => {
  const { dcbState, monthState, villState, updateDCBStatement } = useData()
  const monthName =
    monthState.monthArray?.find(
      (itm) =>
        itm.monthId.toString().toLowerCase() ===
        dcbState.dcbObj.monthId.toString().toLowerCase()
    )?.monthName || ""
  const villageName =
    villState.villageArray?.find(
      (itm) =>
        itm.villageId.toString().toLowerCase() ===
        dcbState.dcbObj.villageId.toString().toLowerCase()
    )?.villageName || ""

  return (
    <>
      <Container className="mt-3 mb-5" style={{ background: "aliceblue" }}>
        <h2>{`DCB Statement for ${villageName} Village for the Month ${monthName}`}</h2>
        <Table className="mt-2" responsive bordered hover>
          <DCBHeading />
          <tbody>
            {dcbState.dcbStatementData?.map((obj, index) => {
              return <DCBLine key={index} obj={obj} />
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default DCBStatement
