import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"

function InputLine({ obj, prefix, handleChange, disabled = false }) {
  return (
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Number of Cases</Form.Label>
          <Form.Control
            placeholder="Number of Cases"
            value={obj[`${prefix}No`]}
            name={`${prefix}No`}
            onChange={handleChange}
            disabled={disabled}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Amount</Form.Label>
          <Form.Control
            placeholder="Amount"
            value={obj[`${prefix}Amount`]}
            name={`${prefix}Amount`}
            onChange={handleChange}
            disabled={disabled}
          />
        </Form.Group>
      </Row>
    </Form>
  )
}

export default InputLine
