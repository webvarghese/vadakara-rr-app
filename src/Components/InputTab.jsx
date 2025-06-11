import Col from "react-bootstrap/Col"
import Nav from "react-bootstrap/Nav"
import Row from "react-bootstrap/Row"
import Tab from "react-bootstrap/Tab"
import InputLine from "./InputLine"
import DisabledLine from "./DisabledLine"
import SelectBox from "./SelectBox"
import DCBTable from "./DCBTable"
import { useState, useEffect } from "react"
import { useData } from "../Contexts/DataContext"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"

function InputTab() {
  const {
    dcbState,
    calculateTotal,
    handleChange,
    itemState,
    saveDCB,
    userObj,
    deleteCollection,
  } = useData()

  useEffect(() => {
    calculateTotal()
  }, [dcbState.dcbObj])

  // useEffect(() => {
  //   if (dcbState.dcbObj.itemId < 1) return
  //   fillDCBObj()
  // }, [dcbState.dcbObj.itemId])

  const showTab = dcbState.dcbObj.itemId > 0

  const catId = itemState.itemArray.find(
    (obj) =>
      obj.itemId.toString().toLowerCase() ===
      dcbState.dcbObj.itemId.toString().toLowerCase()
  )?.categoryId
  return (
    <>
      <h3>CategoryId:{catId}</h3>
      <SelectBox list={itemState.listArray} title="Item" />
      {showTab && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="demand">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="demand">Demand</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="stay">Stay</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="deductions">Deductions</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="collectible">Collectible</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="collection">Collection</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="balance">Balance</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="view">View</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="demand">
                  <div>
                    <h2>{"Demand"}</h2>
                    <h6>As on 1 April 2025</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"startDemand"}
                      handleChange={handleChange}
                    />
                    <h6>Upto Last Month</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"prevDemand"}
                      handleChange={handleChange}
                    />
                    <h6>During the Month</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"newDemand"}
                      handleChange={handleChange}
                    />
                    <h6>Total</h6>
                    <DisabledLine obj={dcbState.totObj} prefix={"totDemand"} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="stay">
                  <div>
                    <h2>{"Stay"}</h2>
                    <h6>Court Stay</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"courtStay"}
                      handleChange={handleChange}
                    />
                    <h6>Govt Stay</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"govtStay"}
                      handleChange={handleChange}
                    />
                    <h6>Appellate Authority Stay</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"aplAuthStay"}
                      handleChange={handleChange}
                    />
                    <h6>Total</h6>
                    <DisabledLine obj={dcbState.totObj} prefix={"totStay"} />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="deductions">
                  <div>
                    <h2>{"Deductions"}</h2>
                    <h6>Not Collectible due to reassessment</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"reassess"}
                      handleChange={handleChange}
                    />
                    <h6>Not Collectible due to Write Off/Remission</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"writeOff"}
                      handleChange={handleChange}
                    />
                    <h6>Not Collectible due to RRC Returned</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"return"}
                      handleChange={handleChange}
                    />
                    <h6>Total</h6>
                    <DisabledLine
                      obj={dcbState.totObj}
                      prefix={"totDeduction"}
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="collectible">
                  <div>
                    <h2>{"Collectible"}</h2>
                    <h6>Total Collectible</h6>
                    <DisabledLine
                      obj={dcbState.totObj}
                      prefix={"totCollectible"}
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="collection">
                  <div>
                    <h2>{"Collection"}</h2>
                    <h6>Upto Last Month</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"prevCollection"}
                      handleChange={handleChange}
                    />
                    <h6>During the Month</h6>
                    <InputLine
                      obj={dcbState.dcbObj}
                      prefix={"newCollection"}
                      handleChange={handleChange}
                    />
                    <h6>Total</h6>
                    <DisabledLine
                      obj={dcbState.totObj}
                      prefix={"totCollection"}
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="balance">
                  <h2>{"Balance"}</h2>
                  <h6>Balance to be collected</h6>
                  <DisabledLine obj={dcbState.totObj} prefix={"totBalance"} />
                </Tab.Pane>
                <Tab.Pane eventKey="view">
                  <DCBTable
                    dcbState={dcbState.dcbObj}
                    totState={dcbState.totObj}
                  />
                  <Form.Group as={Col}>
                    <Form.Label>Remarks</Form.Label>
                    <Form.Control
                      placeholder="Remarks"
                      value={dcbState.dcbObj.remarks}
                      name="remarks"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <div className="mt-3 d-flex gap-2">
                    <Button variant="outline-primary" onClick={() => saveDCB()}>
                      Save
                    </Button>
                    {userObj.type === "admin" && (
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteCollection()}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </>
  )
}

export default InputTab
