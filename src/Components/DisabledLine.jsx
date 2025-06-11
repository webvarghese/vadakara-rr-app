import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import { useData } from "../Contexts/DataContext"

function DisabledLine({ obj, prefix }) {
  const { totState } = useData()
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Number of Cases</Form.Label>
          <Form.Control
            placeholder="Number of Cases"
            value={obj[`${prefix}No`]}
            disabled
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            placeholder="Amount"
            value={obj[`${prefix}Amount`]}
            disabled
          />
        </Form.Group>
      </Row>
    </Form>
  )
}

export default DisabledLine
