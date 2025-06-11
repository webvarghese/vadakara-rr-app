import { useEffect } from "react"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import InputModal from "./InputModal"
import SelectBox from "./SelectBox"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import { useData } from "../Contexts/DataContext"
import DCBTab from "./DCBTab"
import DCBStatement from "./DCBStatement"
import DismissableModal from "./DismissableModal"

function FormBox() {
  const {
    dcbState,
    monthState,
    villState,
    talukState,
    updateDCBTabData,
    updateDCBStatement,
    printDCB,
    prepareDCBAbstract,
    rePrepareAbstract,
    updateVillage,
    toggleMonthLock,
    updateAllMonths,
    userObj,
    fillDCBObj,
  } = useData()

  const showModal =
    dcbState.dcbObj?.monthId > 0 && dcbState.dcbObj?.villageId > 0

  const allowDataEntry =
    !villState.villageArray.find(
      (obj) => dcbState.dcbObj.villageId.toString() === obj.villageId.toString()
    )?.isLocked &&
    !monthState.monthArray.find(
      (obj) => dcbState.dcbObj.monthId.toString() === obj.monthId.toString()
    )?.isLocked

  const isAdmin = userObj.type.toString().toLowerCase() === "admin"

  function lockVillage() {
    const villageObj = villState.villageArray.find(
      (obj) => dcbState.dcbObj.villageId.toString() === obj.villageId.toString()
    )
    villageObj.isLocked = 1
    updateVillage(villageObj)
  }
  console.log("inside  FormBox")
  const villList = villState.villageArray
    .filter((vil) => {
      if (
        dcbState.dcbObj.talukId?.toString() === "1" ||
        dcbState.dcbObj.talukId?.toString() === "2"
      ) {
        return vil.talukId.toString() === dcbState.dcbObj.talukId.toString()
      } else {
        return true
      }
    })
    .map((obj) => {
      return {
        idField: obj.villageId,
        textField: `${obj.villageName} - ${
          Number(obj.isLocked) === 1 ? "Locked" : "Open"
        }`,
        color: `${Number(obj.isLocked) === 1 ? "lightgreen" : "blue"}`,
      }
    })

  useEffect(() => {
    fillDCBObj()
  }, [
    dcbState.dcbObj.monthId,
    dcbState.dcbObj.villageId,
    dcbState.dcbObj.itemId,
  ])
  useEffect(() => {
    updateDCBTabData()
    updateDCBStatement()
  }, [dcbState.collectionArray, dcbState.dcbObj])
  useEffect(() => {
    rePrepareAbstract()
  }, [dcbState.dcbObj.talukId])

  const talukName = talukState.talukArray.find(
    (tlk) => tlk.talukId.toString() === dcbState.dcbObj.talukId?.toString()
  )?.talukName

  return (
    <>
      <Container className="mb-5">
        <h1>DCB</h1>
        <Form>
          <Row>
            {isAdmin && (
              <Col lg={4}>
                <SelectBox list={talukState.listArray} title="Taluk" />
              </Col>
            )}
            <Col lg={4}>
              <SelectBox list={villList} title="Village" />
            </Col>
            <Col lg={4}>
              <SelectBox list={monthState.listArray} title="Month" />
            </Col>
          </Row>
        </Form>

        {showModal && (
          <>
            {(allowDataEntry || isAdmin) && (
              <>
                <InputModal />
                {dcbState.dcbTabData.length > 0 && (
                  <DismissableModal
                    btn1Text={"Submit DCB"}
                    btn2txt={"Close"}
                    btn3Txt={"Submit DCB"}
                    body={
                      "You are going to submit the DCB for the month for which data has been entered. Once you submit the DCB for the month further editing is not allowed. If you are not sure please click the X button above and return to editing. Else click the Submit button here. "
                    }
                    func2={lockVillage}
                  />
                )}
              </>
            )}
            {dcbState.dcbTabData.length > 0 && (
              <>
                <Button className="ms-2" onClick={() => printDCB("1")}>
                  Print DCB Page 1
                </Button>
                <Button className="ms-2" onClick={() => printDCB("2")}>
                  Print DCB Page 2
                </Button>
              </>
            )}

            {!dcbState.dcbAbstractPrepared && isAdmin && (
              <>
                <DismissableModal
                  btn1Text={
                    monthState.monthArray.find(
                      (obj) =>
                        dcbState.dcbObj.monthId.toString() ===
                        obj.monthId.toString()
                    ).isLocked
                      ? "Unlock Month"
                      : "Lock Month"
                  }
                  btn2txt={"Toggle Lock"}
                  btn3Txt={"Save"}
                  body={
                    "For changing the lock of the month first click the Toggle Lock Button and then click the Save Button. Remember that only one month can be open at a time. That is You can close all months, but You can not keep more than one month open at a time."
                  }
                  func1={toggleMonthLock}
                  func2={updateAllMonths}
                  args1={dcbState.dcbObj.monthId}
                />
                <Button
                  className="ms-2"
                  onClick={() => prepareDCBAbstract(dcbState.dcbObj.talukId)}
                >
                  {`Abstract for ${talukName} Taluk`}
                </Button>
              </>
            )}
          </>
        )}
        {dcbState.dcbAbstractPrepared && isAdmin && (
          <>
            <Button className="ms-2" onClick={() => printDCB("3")}>
              Print Taluk DCB Page 1
            </Button>
            <Button className="ms-2 mt-2" onClick={() => printDCB("4")}>
              Print Taluk DCB Page 2
            </Button>
          </>
        )}
        <a id="hiddenPDFLink" style={{ visibility: "hidden" }}></a>
        <DCBTab />
        {/* <hr /> */}
        <DCBStatement />
      </Container>
    </>
  )
}

export default FormBox
