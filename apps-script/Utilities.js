function getAllArrays() {
  //an important thing to remember is that there are no date values in the array element values
  const dataArray = {}
  dataArray.collections = getCollections()
  dataArray.categorys = getCategorys()
  dataArray.items = getItems()
  dataArray.months = getMonths()
  dataArray.taluks = getTaluks()
  dataArray.villages = getVillages()
  return dataArray
}

function loginUser(userId) {
  let userObj = { userId: "", type: "", loggedIn: false, userName: "" }
  let dataObj = {}
  if (userId.toString() === "1234567890") {
    userObj = {
      userId: "1234567890",
      type: "admin",
      loggedIn: true,
      userName: "Admin",
    }

    dataObj = getAllArrays()
    dataObj = { ...dataObj, userObj }
  } else {
    const villages = getVillages()
    const villageObj = villages.find(
      (vill) => vill.cugNumber.toString() === userId.toString()
    )
    if (villageObj?.cugNumber.toString() === userId.toString()) {
      dataObj = getAllArrays()
      const village = villages.filter(
        (obj) => obj.cugNumber.toString() === userId.toString()
      )
      userObj = {
        userId: villageObj.cugNumber,
        type: "village",
        loggedIn: true,
        userName: villageObj.villageName,
      }
      dataObj = { ...dataObj, userObj: userObj, villages: village }
    } else {
      userObj = {
        userId: "0000",
        type: "notuser",
        loggedIn: false,
        userName: "",
      }
      dataObj = { ...dataObj, userObj }
    }
  }
  return dataObj
}
