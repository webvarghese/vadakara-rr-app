function TableLine({ columnName, noCases, amount, color }) {
  return (
    <tr>
      <td>{columnName}</td>
      <td style={{ color: color }}>{noCases}</td>
      <td style={{ color: color }}>{amount}</td>
    </tr>
  )
}

export default TableLine
