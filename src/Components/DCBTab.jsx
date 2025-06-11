import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Table from "react-bootstrap/Table"
import DCBHeading from "./DCBHeading"
import DCBLine from "./DCBLine"
import Card from "react-bootstrap/Card"
import { useData } from "../Contexts/DataContext"

function DCBTab() {
  const { dcbState, itemState, monthState, villState } = useData()
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
    <Card border="info" className="mt-5">
      <Card.Header>{`Collections for ${villageName} Village for the Month ${monthName}`}</Card.Header>
      <Card.Body>
        <Tabs
          defaultActiveKey="home"
          id="uncontrolled-tab-example"
          className="mt-1"
        >
          <Tab eventKey="home" title="Home">
            <h5>We have done some minor adjustments.</h5>
            <h6>Demand as on 1 April 2025 can be edited this month.</h6>
            <h6>Editing previous demand and collection have been enabled.</h6>
            <h5 style={{ color: "red" }}>
              We are planning a major restructuring of the site by the end of
              May 2025. Let us prepare for a new begining.
            </h5>
            <h6>
              As software technology is being updated at a very fast pace
              support for old technologies is not available as before.
            </h6>
            <h6>We are also trying to make the site more user friendly.</h6>
            <h6>
              If it becomes possible we may also include LR DCB in the update.{" "}
            </h6>
            <h5>Thank You</h5>
          </Tab>
          {dcbState.dcbTabData.map((obj, index) => {
            const itemName = itemState.itemArray.find(
              (itm) =>
                itm.itemId.toString().toLowerCase() ===
                obj.itemId.toString().toLowerCase()
            )?.itemName
            obj.itemName = itemName
            return (
              <Tab
                eventKey={itemName}
                title={itemName}
                style={{ backgroundColor: "aliceblue" }}
                key={index}
              >
                <Table className="mt-2" responsive bordered hover>
                  <DCBHeading />
                  <tbody>
                    <DCBLine obj={obj} />
                  </tbody>
                </Table>
              </Tab>
            )
          })}
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  )
}

export default DCBTab
