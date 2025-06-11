import Spinner from "react-bootstrap/Spinner"
import Modal from "react-bootstrap/Modal"
import { useData } from "../Contexts/DataContext"
function MessageBox() {
  const { message, showMsg, setShowMsg } = useData()
  return (
    <>
      <Modal
        show={showMsg}
        onHide={() => setShowMsg(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Revenue Recovery Vadakara</Modal.Title>
          <Spinner animation="border" />
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
      </Modal>
    </>
  )
}

export default MessageBox
