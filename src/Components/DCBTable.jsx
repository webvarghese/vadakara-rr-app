import Table from "react-bootstrap/Table"
import TableLine from "./TableLine"

function DCBTable({ dcbState, totState }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Column</th>
          <th>No of Cases</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        <TableLine
          columnName={"Demand as on 1 April 2025"}
          noCases={dcbState.startDemandNo}
          amount={dcbState.startDemandAmount}
        />
        <TableLine
          columnName={"Demand Upto Last Month"}
          noCases={dcbState.prevDemandNo}
          amount={dcbState.prevDemandAmount}
        />
        <TableLine
          columnName={"Demand this Month"}
          noCases={dcbState.newDemandNo}
          amount={dcbState.newDemandAmount}
        />
        <TableLine
          columnName={"Total Demand"}
          noCases={totState.totDemandNo}
          amount={totState.totDemandAmount}
        />
        <TableLine
          columnName={"Court Stay"}
          noCases={dcbState.courtStayNo}
          amount={dcbState.courtStayAmount}
        />
        <TableLine
          columnName={"Govt Stay"}
          noCases={dcbState.govtStayNo}
          amount={dcbState.govtStayAmount}
        />
        <TableLine
          columnName={"Appellate Authority Stay"}
          noCases={dcbState.aplAuthStayNo}
          amount={dcbState.aplAuthStayAmount}
        />
        <TableLine
          columnName={"Total Stay"}
          noCases={totState.totStayNo}
          amount={totState.totStayAmount}
        />
        <TableLine
          columnName={"Write Off"}
          noCases={dcbState.writeOffNo}
          amount={dcbState.writeOffAmount}
        />
        <TableLine
          columnName={"Return"}
          noCases={dcbState.returnNo}
          amount={dcbState.returnAmount}
        />
        <TableLine
          columnName={"Total Deduction"}
          noCases={totState.totDeductionNo}
          amount={totState.totDeductionAmount}
        />
        <TableLine
          columnName={"Total Collectible"}
          noCases={totState.totCollectibleNo}
          amount={totState.totCollectibleAmount}
        />
        <TableLine
          color={"green"}
          columnName={"Collection Upto Last Month"}
          noCases={dcbState.prevCollectionNo}
          amount={dcbState.prevCollectionAmount}
        />
        <TableLine
          color={"green"}
          columnName={"Collection this Month"}
          noCases={dcbState.newCollectionNo}
          amount={dcbState.newCollectionAmount}
        />
        <TableLine
          color={"green"}
          columnName={"Total Collection"}
          noCases={totState.totCollectionNo}
          amount={totState.totCollectionAmount}
        />
        <TableLine
          color={"red"}
          columnName={"Total Balance"}
          noCases={totState.totBalanceNo}
          amount={totState.totBalanceAmount}
        />
        <TableLine
          columnName={"Collection Percent"}
          noCases={totState.totPercentNo}
          amount={totState.totPercentAmount}
        />
      </tbody>
    </Table>
  )
}

export default DCBTable
