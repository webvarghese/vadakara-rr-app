import {
  useReducer,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react"
import { initObj, dcbReducer } from "../ReducerFunctions/dcbReducer"
import { runGoogleScript } from "../ClientFunctions/googleFunctions"
import { villageReducer, villObj } from "../ReducerFunctions/villageReducer"
import { monthReducer, monthObj } from "../ReducerFunctions/monthReducer"
import { itemObj, itemReducer } from "../ReducerFunctions/itemReducer"
import {
  categoryReducer,
  categoryObj,
} from "../ReducerFunctions/categoryReducer"
import { talukReducer, tlkkObj } from "../ReducerFunctions/talukReducer"
const DataContext = createContext()
export const useData = () => useContext(DataContext)

function DataContextProvider(props) {
  const [dcbState, dcbDispatch] = useReducer(dcbReducer, initObj)
  const [villState, villDispatch] = useReducer(villageReducer, villObj)
  const [monthState, monthDispatch] = useReducer(monthReducer, monthObj)
  const [itemState, itemDispatch] = useReducer(itemReducer, itemObj)
  const [categoryState, categoryDispatch] = useReducer(
    categoryReducer,
    categoryObj
  )
  const [talukState, talukDispatch] = useReducer(talukReducer, tlkkObj)

  const [message, setMessage] = useState("")
  const [showMsg, setShowMsg] = useState(false)
  const [userObj, setUserObj] = useState({
    userId: "",
    type: "",
    loggedIn: false,
    userName: "",
  })

  async function loginUser(userId) {
    if (userObj.loggedIn) {
      setUserObj({
        userId: "",
        type: "",
        loggedIn: false,
        userName: "",
      })
      clearDCBState()
      return
    }
    try {
      sendMessage("Please wait")
      const dataArray = await runGoogleScript("loginUser", userId)
      console.log(dataArray)
      if (dataArray.userObj.userId.toString() === "0000") {
        sendMessage("You have not entered the correct Id. Please check")
        clearMessage()
        clearDCBState()
        return
      }
      setData(dataArray)
      setShowMsg(false)
    } catch (error) {
      console.log(error)
    }
  }

  const setData = (dataArray) => {
    //month array filling
    monthDispatch({
      type: "fillArray",
      payload: [...dataArray.months],
    })
    //item array filling
    itemDispatch({
      type: "fillArray",
      payload: [...dataArray.items],
    })
    //sorting the villages
    const sortedVillages = dataArray.villages.sort((a, b) => {
      const rtnValue =
        a.villageName.toString().toLowerCase() >
        b.villageName.toString().toLowerCase()
          ? 1
          : -1
      return rtnValue
    })
    //filling sorted villages to the array
    villDispatch({
      type: "fillArray",
      payload: [...sortedVillages],
    })

    //filling th collections to the dcbArray
    dcbDispatch({
      type: "fillArray",
      payload: [...dataArray.collections],
    })
    //filling the category array
    categoryDispatch({
      type: "fillArray",
      payload: [...dataArray.categorys],
    })
    talukDispatch({
      type: "fillArray",
      payload: [...dataArray.taluks],
    })
    setUserObj({ ...dataArray.userObj })
  }

  useEffect(() => {
    makeSelectBoxList()
  }, [villState.villageArray, monthState.monthArray])

  function handleChange(e) {
    const updateObj = {
      name: e.target.name,
      value: e.target.value,
    }
    dcbDispatch({ type: "updateField", payload: updateObj })
  }

  function clearDCBState() {
    dcbDispatch({ type: "clearObject" })
  }
  //functions that are for data manipulation of Villages
  function toggleVillageLock(id) {
    //function to toggle the locked or unlocked to the opposite
    villDispatch({
      type: "toggleLock",
      payload: id,
    })
  }

  async function updateAllVillages() {
    sendMessage("Please wait while data is saved")
    //sends the modified array of village data to sheets
    const res = await runGoogleScript(
      "updateAllVillages",
      villState.villageArray
    )
    villDispatch({
      type: "fillArray",
      payload: [...res],
    })
    clearMessage()
  }

  // function to Lock the village by village users
  async function updateVillage(obj) {
    sendMessage("Please wait while the data is updated")
    const rtnObj = await runGoogleScript("updateVillage", obj)
    villDispatch({ type: "addToList", payload: rtnObj })
    clearMessage()
  }

  //functions that are for data manipulation of Months
  function toggleMonthLock(id) {
    //function to toggle the locked or unlocked to the opposite
    monthDispatch({
      type: "toggleLock",
      payload: id,
    })
  }

  async function updateAllMonths() {
    sendMessage("Please wait")
    //sends the modified array of village data to sheets
    const res = await runGoogleScript("updateAllMonths", monthState.monthArray)
    monthDispatch({
      type: "fillArray",
      payload: [...res],
    })
    clearMessage()
  }

  //functions which relate to DCB
  function calculateTotal() {
    dcbDispatch({ type: "calculate", payload: dcbState.dcbObj })
  }

  async function deleteCollection() {
    const newArr = dcbState.collectionArray
    const objToDelete = dcbState.dcbObj

    sendMessage("Please wait while the data is deleted")
    const existingObj = newArr.find(
      (obj) =>
        Number(objToDelete.villageId) === Number(obj.villageId) &&
        Number(objToDelete.monthId) === Number(obj.monthId) &&
        Number(objToDelete.itemId) === Number(obj.itemId)
    )

    if (existingObj || existingObj.collectionId > 1) {
      try {
        const res = await runGoogleScript(
          "deleteCollection",
          existingObj.collectionId
        )
        dcbDispatch({ type: "removeFromList", payload: { collectionId: res } })
        sendMessage("The record has been deleted")
      } catch (error) {
        sendMessage("Something is wrong !! The data cannot be deleted " + error)
      }
    }
    clearMessage()
  }

  async function saveDCB() {
    const newArr = dcbState.collectionArray
    const objToAdd = dcbState.dcbObj
    if (
      Number(objToAdd.startDemandAmount) +
        Number(objToAdd.prevDemandAmount) +
        Number(objToAdd.newDemandAmount) <
      1
    ) {
      sendMessage(
        "There is no demand amount for this item. You dont need to save record without demand amount"
      )
      clearMessage()
      return
    }
    sendMessage("Please wait while the data is saved")
    const existingObj = newArr.find(
      (obj) =>
        Number(objToAdd.villageId) === Number(obj.villageId) &&
        Number(objToAdd.monthId) === Number(obj.monthId) &&
        Number(objToAdd.itemId) === Number(obj.itemId)
    )

    let res
    if (!existingObj || !existingObj.collectionId) {
      res = await runGoogleScript("saveCollection", objToAdd)
      dcbDispatch({ type: "addToList", payload: { dcbObj: res } })
    } else {
      res = await runGoogleScript("updateCollection", {
        ...objToAdd,
        collectionId: existingObj.collectionId,
      })
      dcbDispatch({ type: "addToList", payload: { dcbObj: res } })
    }

    clearMessage()
    updateDCBStatement()
    updateDCBTabData()
  }

  //function to prepare a list of collections for village for the month
  function updateDCBTabData() {
    dcbDispatch({
      type: "makeMonthWiseDCBTableDataForVillage",
    })
  }

  function rePrepareAbstract() {
    dcbDispatch({ type: "prepareAbstractAgain" })
  }
  function clearDCBObj() {
    dcbDispatch({ type: "clearObject" })
  }

  //function to prepare the whole DCB statement for the village for the month
  function updateDCBStatement() {
    dcbDispatch({
      type: "makeMonthWiseDCBStatementDataForVillage",
      payload: {
        items: itemState.itemArray,
        categorys: categoryState.categoryArray,
      },
    })
  }
  //function to prepare the DCB Abstract for the taluk, item wise collection
  function prepareDCBAbstract(id) {
    dcbDispatch({
      type: "makeMonthWiseDCBStatementDataForTaluk",
      payload: {
        items: itemState.itemArray,
        categorys: categoryState.categoryArray,
        villages: villState.villageArray,
        talukId: id,
      },
    })
  }
  //function to fill the select box dropdown data

  function makeSelectBoxList() {
    monthDispatch({
      type: "makeListArray",
    })
    villDispatch({
      type: "makeListArray",
    })
    itemDispatch({
      type: "makeListArray",
    })
    talukDispatch({
      type: "makeListArray",
    })
  }
  //Message function
  function sendMessage(msg) {
    setMessage(msg)
    setShowMsg(true)
  }
  function clearMessage() {
    const tmtOut = setTimeout(() => {
      setShowMsg(false)
      clearTimeout(tmtOut)
    }, 2000)
  }

  function fillDCBObj() {
    dcbDispatch({
      type: "fillObj",
    })
  }

  async function populatePreviousData(monthId) {
    sendMessage(
      "Previous months data is used to make data for the current month"
    )
    try {
      const rtnArray = await runGoogleScript("populateNewData", monthId)
      if (rtnArray.length > 0) {
        dcbDispatch({
          type: "fillArray",
          payload: [...rtnArray],
        })
      }
      clearMessage()
    } catch (error) {
      console.log(error)
    }
  }

  //DCB printing functions
  const printDCB = async (page) => {
    const monthName = monthState.monthArray.find(
      (mo) => mo.monthId.toString() === dcbState.dcbObj.monthId.toString()
    ).monthName
    let uploadedObj = {}
    let villageName
    switch (page) {
      case "1":
      case "2":
        villageName = villState.villageArray.find(
          (vil) =>
            vil.villageId.toString() === dcbState.dcbObj.villageId.toString()
        ).villageName
        uploadedObj = {
          arr: dcbState.dcbStatementData,
          villageName: villageName,
          monthName: monthName,
          page: page,
        }
        break
      case "3":
      case "4":
        const talukId = dcbState.dcbObj.talukId
        villageName = talukState.talukArray.find(
          (tlk) => tlk.talukId.toString() === talukId.toString()
        ).talukName

        uploadedObj = {
          arr: dcbState.dcbAbstractData,
          villageName: villageName,
          monthName: monthName,
          page: page,
        }
        break
      case "5":
      case "6":
        villageName = talukState.talukArray.find(
          (tlk) => tlk.talukId.toString() === "2"
        ).talukName

        uploadedObj = {
          arr: dcbState.dcbAbstractData,
          villageName: villageName,
          monthName: monthName,
          page: page,
        }
        break

      default:
        break
    }

    sendMessage("Please wait for the DCB to be prepared")
    try {
      const data = await runGoogleScript("printDCB", uploadedObj)
      var arr = new Uint8Array(data)
      const date = new Date()
      var blob = new Blob([arr.buffer], { type: "application/pdf" })
      var obj_url = window.URL.createObjectURL(blob)
      // it is important that the hidden link is <a> tag
      var hiddenLink = document.getElementById("hiddenPDFLink")
      hiddenLink.setAttribute("href", obj_url)

      hiddenLink.setAttribute(
        "download",
        `DCB of ${villageName} Village for the month of ${monthName} edited on ${date}`
      )

      hiddenLink.click()

      sendMessage("The DCB is downloaded. Please check below")
      clearMessage()
      return data
    } catch (err) {
      sendMessage("Something went wrong !! " + err)
      clearMessage()
      return {}
    }
  }

  const value = {
    dcbState,
    handleChange,
    calculateTotal,
    saveDCB,
    villState,
    toggleVillageLock,
    updateAllVillages,
    monthState,
    toggleMonthLock,
    updateAllMonths,
    makeSelectBoxList,
    itemState,
    updateDCBTabData,
    updateDCBStatement,
    categoryState,
    printDCB,
    prepareDCBAbstract,
    fillDCBObj,
    loginUser,
    message,
    showMsg,
    setShowMsg,
    userObj,
    rePrepareAbstract,
    updateVillage,
    talukState,
    populatePreviousData,
    clearDCBObj,
    deleteCollection,
  }

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  )
}

export default DataContextProvider
