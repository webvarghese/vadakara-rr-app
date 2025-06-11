import { useState } from "react"
import HomePage from "./HomePage"
import FormBox from "./FormBox"
import NavBar from "./NavBar"
import VillageBox from "./VillageBox"
import MonthBox from "./MonthBox"
import Container from "react-bootstrap/Container"
import { useData } from "../Contexts/DataContext"
import MessageBox from "./MessageBox"

function MainBox() {
  const { showMsg, msg } = useData()
  const [page, setPage] = useState("0")
  const project = () => {
    switch (page) {
      case "0":
        return <HomePage />
      case "1":
        return <FormBox />
      case "2":
        return <VillageBox />
      case "3":
        return <MonthBox />
      case "4":
        return "Daily Report Coming Soon"
      case "5":
        return "Page 5"
      case "6":
        return "Page 6"
      case "7":
        return "Page 7"
    }
  }

  const selectPage = (num) => setPage(num)
  return (
    <>
      <MessageBox message={msg} showMsg={showMsg} />
      <NavBar selectPage={selectPage} />
      <Container>{project()}</Container>
    </>
  )
}

export default MainBox
