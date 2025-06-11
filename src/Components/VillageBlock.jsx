import Col from "react-bootstrap/Col"

function VillBlock({ obj, toggleLock }) {
  return (
    <Col className="m-1">
      <div
        style={{
          width: "12rem",
          height: "5rem",
          border: "2px solid lightblue",
          backgroundColor: `${
            obj.isLocked.toString() === "1" ? "lightgrey" : "lightblue"
          }`,
          textAlign: "center",
          verticalAlign: "middle",
          borderRadius: "5px",
        }}
        onClick={() => toggleLock(obj.villageId)}
      >
        <h5>{obj.villageName}</h5>
        <p>{obj.isLocked.toString() === "1" ? "Locked" : "Unlocked"}</p>
      </div>
    </Col>
  )
}
export default VillBlock
