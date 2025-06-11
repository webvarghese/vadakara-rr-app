import Col from "react-bootstrap/Col"

function MonthBlock({ obj, toggleLock }) {
  return (
    <Col className="m-1">
      <div
        style={{
          width: "12rem",
          height: "5rem",
          border: "2px solid lightblue",
          backgroundColor: `${
            Number(obj.isLocked) === 1 ? "lightgrey" : "lightblue"
          }`,
          textAlign: "center",
          verticalAlign: "middle",
          borderRadius: "5px",
        }}
        onClick={() => toggleLock(obj.monthId)}
      >
        <h5>{obj.monthName}</h5>
        <p>{Number(obj.isLocked) === 1 ? "Locked" : "Unlocked"}</p>
      </div>
    </Col>
  )
}
export default MonthBlock
