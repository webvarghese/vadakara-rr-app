import DataContextProvider from "./Contexts/DataContext"
import MainBox from "./Components/MainBox"

function App() {
  return (
    <>
      <DataContextProvider>
        <MainBox />
      </DataContextProvider>
    </>
  )
}

export default App
