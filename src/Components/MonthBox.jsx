import React from "react"
import Container from "react-bootstrap/Container"
import { useData } from "../Contexts/DataContext"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import MonthBlock from "./MonthBlock"

const MonthBox = () => {
  const {
    monthState,
    toggleMonthLock,
    updateAllMonths,
    dcbState,
    populatePreviousData,
  } = useData()
  const lastMonth = monthState.monthArray.find((mon) => !mon.isLocked).monthId

  function findMissingEntries(collectionArray, thisMonth) {
    const currentMonth = Number(thisMonth)

    // Create Sets for faster lookup
    const currentSet = new Set(
      collectionArray
        .filter((obj) => Number(obj.monthId) === currentMonth)
        .map((obj) => `${obj.villageId}-${obj.itemId}`)
    )

    // Find missing entries
    const missing = collectionArray
      .filter((obj) => Number(obj.monthId) === Number(thisMonth) - 1)
      .filter((obj) => {
        const key = `${obj.villageId}-${obj.itemId}`
        return !currentSet.has(key)
      })

    return missing // these are the entries from lastMonth that are missing in currentMonth
  }
  console.log(findMissingEntries(dcbState.collectionArray, lastMonth))
  const hasAllPreviousHasCurrent =
    findMissingEntries(dcbState.collectionArray, lastMonth).length === 0

  return (
    <>
      <Container className="mt-5">
        <h1>Months</h1>
        <Card>
          <Card.Header>
            Click to toggle the lock. Click Save before you leave the page
          </Card.Header>
          <Card.Body>
            {!hasAllPreviousHasCurrent && (
              <Button onClick={() => populatePreviousData(lastMonth)}>
                Populate Previous Data
              </Button>
            )}
            <p>
              {hasAllPreviousHasCurrent
                ? "All objects in previous month has corresponding objects in current month"
                : "Some objects in previous month do not have corresponding objects is current month"}
            </p>
            <Form>
              <Row>
                {monthState.monthArray.map((obj, index) => {
                  return (
                    <MonthBlock
                      obj={obj}
                      key={index}
                      toggleLock={toggleMonthLock}
                    />
                  )
                })}
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Button onClick={() => updateAllMonths()}>Save</Button>
          </Card.Footer>
        </Card>
      </Container>
    </>
  )
}

export default MonthBox
