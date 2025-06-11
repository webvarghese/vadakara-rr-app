import React from "react"
import { useData } from "../Contexts/DataContext"

const DCBHeading = () => {
  const { dcbState } = useData()
  const monthId = Number(dcbState.dcbObj?.monthId)
  const makeStartHeading = () => {
    let startHeading = ""
    if (monthId < 21) {
      startHeading = "As on 1 April 23"
    } else if (monthId < 33) {
      startHeading = "As on 1 April 24"
    } else {
      startHeading = "As on 1 April 25"
    }
    return startHeading
  }
  return (
    <thead style={{ textAlign: "center", verticalAlign: "middle" }}>
      <tr>
        <th colSpan={1} rowSpan={3}>
          Item
        </th>
        <th colSpan={8} rowSpan={1}>
          Demand
        </th>
        <th colSpan={8} rowSpan={1}>
          Stay
        </th>
        <th colSpan={8} rowSpan={1}>
          Deductions
        </th>
        <th colSpan={2} rowSpan={2}>
          Collectible
        </th>
        <th colSpan={6} rowSpan={1}>
          Collection
        </th>
        <th colSpan={2} rowSpan={2}>
          Balance
        </th>
        <th colSpan={2} rowSpan={2}>
          Percent
        </th>
        <th colSpan={1} rowSpan={3}>
          Remarks
        </th>
      </tr>
      <tr>
        <th colSpan={2} rowSpan={1}>
          {makeStartHeading()}
        </th>
        <th colSpan={2} rowSpan={1}>
          Previous
        </th>
        <th colSpan={2} rowSpan={1}>
          New
        </th>
        <th colSpan={2} rowSpan={1}>
          Total
        </th>
        <th colSpan={2} rowSpan={1}>
          Court Stay
        </th>
        <th colSpan={2} rowSpan={1}>
          Govt Stay
        </th>
        <th colSpan={2} rowSpan={1}>
          Appellate Stay
        </th>
        <th colSpan={2} rowSpan={1}>
          Total
        </th>
        <th colSpan={2} rowSpan={1}>
          Reassessment
        </th>
        <th colSpan={2} rowSpan={1}>
          WriteOff/Remission
        </th>
        <th colSpan={2} rowSpan={1}>
          Return
        </th>
        <th colSpan={2} rowSpan={1}>
          Total
        </th>
        <th colSpan={2} rowSpan={1}>
          Previous
        </th>
        <th colSpan={2} rowSpan={1}>
          New
        </th>
        <th colSpan={2} rowSpan={1}>
          Total
        </th>
      </tr>
      <tr>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
        <th colSpan={1} rowSpan={1}>
          No
        </th>
        <th colSpan={1} rowSpan={1}>
          Amount
        </th>
      </tr>
    </thead>
  )
}

export default DCBHeading
