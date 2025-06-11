import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function DismissableModal({
  btn1Text,
  btn2txt,
  btn3Txt,
  heading,
  body,
  func1,
  func2,
  args1,
  args2,
}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" className="ms-2" onClick={handleShow}>
        {btn1Text || "Launch Modal"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading || "Revenue Recovery Kozhikode"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body || "Woohoo, you are reading this text in a modal!"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => func1(args1)}>
            {btn2txt || "Close"}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              func2(args2)
              handleClose()
            }}
          >
            {btn3Txt || "Close"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DismissableModal
