import InputLine from "./InputLine"
import DisabledLine from "./DisabledLine"

function InputSet({ heading }) {
  return (
    <>
      <div>
        <h2>{heading}</h2>
        <h6>Upto Last Month</h6>
        <InputLine heading={`prev${heading}`} />
        <h6>During the Month</h6>
        <InputLine heading={`new${heading}`} />
        <h6>Total</h6>
        <DisabledLine heading={`tot${heading}`} />
      </div>
    </>
  )
}

export default InputSet
