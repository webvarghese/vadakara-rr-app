import Form from "react-bootstrap/Form"
import { useData } from "../Contexts/DataContext"

function SelectBox({ list, title }) {
  const { dcbState, handleChange } = useData()

  return (
    <Form.Group>
      <Form.Label>{title}</Form.Label>
      <Form.Select
        className="mb-3"
        aria-label="Default select example"
        name={`${title.toLowerCase()}Id`}
        value={dcbState.dcbObj[`${title.toLowerCase()}Id`]}
        onChange={handleChange}
      >
        <option value={""}>{"Select"}</option>
        {list.map((item, index) => {
          return (
            <option
              key={index}
              value={item.idField}
              style={{ color: item.color }}
            >
              {item.textField}
            </option>
          )
        })}
      </Form.Select>
    </Form.Group>
  )
}

export default SelectBox
