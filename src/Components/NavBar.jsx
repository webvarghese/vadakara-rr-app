import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Image from "react-bootstrap/Image"
import { useState, useEffect } from "react"
import { useData } from "../Contexts/DataContext"

function NavBar({ selectPage }) {
  const { loginUser, userObj } = useData()
  const [loginName, setLoginName] = useState("")
  const isAdmin = userObj.type.toString().toLowerCase() === "admin"
  return (
    <Navbar bg="light" expand="md" className="px-2">
      <Navbar.Brand href="#">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLi0NF254X5IMEjJhwFYx2L5FpQ02OGi1X0Q&usqp=CAU"
          alt=""
          width="50"
          height="50"
          fluid
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll" className="justify-content-between">
        <Navbar.Text>
          <h4>Revenue Recovery Vadakara</h4>
          <p style={{ fontSize: ".75rem", padding: 0, color: "lightblue" }}>
            05-06-2025
          </p>
        </Navbar.Text>

        {userObj.loggedIn && (
          <Nav className={"cla"} style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link onClick={() => selectPage("0")}>Home</Nav.Link>
            <Nav.Link onClick={() => selectPage("1")}>DCB</Nav.Link>
            {isAdmin && (
              <>
                <Nav.Link onClick={() => selectPage("2")}>Village</Nav.Link>
                <Nav.Link onClick={() => selectPage("3")}>Months</Nav.Link>
              </>
            )}
          </Nav>
        )}
        <Navbar.Text>
          {userObj.userName === "" ? "" : "Signed in as " + userObj.userName}
        </Navbar.Text>
        <Form className="d-flex">
          {!userObj.loggedIn && (
            <Form.Control
              type="search"
              placeholder="CUG Number"
              className={"cla"}
              aria-label="Search"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
            />
          )}
          <Button
            variant="outline-success"
            className="ms-2"
            onClick={() => {
              loginUser(loginName)
              selectPage("0")
              setLoginName("")
            }}
          >
            {userObj.loggedIn ? "Logout" : "Login"}
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
