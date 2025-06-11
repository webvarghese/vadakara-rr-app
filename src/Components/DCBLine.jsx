import React from "react"

const DCBLine = ({ obj }) => {
  let bgColor = ""
  let fontColor = ""
  switch (obj.type) {
    case "item":
      fontColor = "blue"
      break
    case "category":
      bgColor = "lightblue"
      break
    case "total":
      bgColor = "cornflowerblue"
      fontColor = "green"
      break
    default:
      break
  }
  return (
    <tr style={{ background: bgColor, color: fontColor }}>
      <td style={{ fontWeight: "bold" }}>{obj.itemName || "Item"}</td>
      <td>{obj.startDemandNo}</td>
      <td>{obj.startDemandAmount}</td>
      <td>{obj.prevDemandNo}</td>
      <td>{obj.prevDemandAmount}</td>
      <td>{obj.newDemandNo}</td>
      <td>{obj.newDemandAmount}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totDemandNo || ""}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totDemandAmount || ""}</td>
      <td>{obj.courtStayNo}</td>
      <td>{obj.courtStayAmount}</td>
      <td>{obj.govtStayNo}</td>
      <td>{obj.govtStayAmount}</td>
      <td>{obj.aplAuthStayNo}</td>
      <td>{obj.aplAuthStayAmount}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totStayNo || ""}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totStayAmount || ""}</td>
      <td>{obj.reassessNo}</td>
      <td>{obj.reassessAmount}</td>
      <td>{obj.writeOffNo}</td>
      <td>{obj.writeOffAmount}</td>
      <td>{obj.returnNo}</td>
      <td>{obj.returnAmount}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totDeductionNo || ""}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totDeductionAmount || ""}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totCollectibleNo || ""}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totCollectibleAmount || ""}</td>
      <td>{obj.prevCollectionNo}</td>
      <td>{obj.prevCollectionAmount}</td>
      <td>{obj.newCollectionNo}</td>
      <td>{obj.newCollectionAmount}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totCollectionNo || ""}</td>
      <td style={{ fontWeight: "bold" }}>{obj.totCollectionAmount || ""}</td>
      <td>{obj.totBalanceNo}</td>
      <td>{obj.totBalanceAmount}</td>
      <td>{obj.totPercentNo || ""}</td>
      <td>{obj.totPercentAmount || ""}</td>
      <td>{obj.remarks}</td>
    </tr>
  )
}

export default DCBLine
