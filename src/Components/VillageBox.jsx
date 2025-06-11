import React from "react"
import Container from "react-bootstrap/Container"
import { useData } from "../Contexts/DataContext"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import VillBlock from "./VillageBlock"

const VillageBox = () => {
  const { villState, toggleVillageLock, updateAllVillages } = useData()

  return (
    <>
      <Container className="mt-5">
        <h1>Village</h1>
        <Card>
          <Card.Header>
            Click to toggle the lock. Click Save before you leave the page
          </Card.Header>
          <Card.Body>
            <Form>
              <Row>
                {villState.villageArray.map((obj, index) => {
                  return (
                    <VillBlock
                      obj={obj}
                      key={index}
                      toggleLock={toggleVillageLock}
                    />
                  )
                })}
              </Row>
            </Form>
          </Card.Body>
          <Card.Footer className="text-muted">
            <Button onClick={() => updateAllVillages()}>Save</Button>
          </Card.Footer>
        </Card>
      </Container>
    </>
  )
}

export default VillageBox
