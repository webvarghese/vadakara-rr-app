function getCollections() {
  const dataArray = getSheetDataArray_("Data", 27)
  const objArray = []
  dataArray.map((data) => {
    const obj = {}
    obj.collectionId = data[0]
    obj.villageId = data[1]
    obj.monthId = data[2]
    obj.itemId = data[3]
    obj.startDemandNo = data[4]
    obj.startDemandAmount = data[5]
    obj.prevDemandNo = data[6]
    obj.prevDemandAmount = data[7]
    obj.newDemandNo = data[8]
    obj.newDemandAmount = data[9]
    obj.courtStayNo = data[10]
    obj.courtStayAmount = data[11]
    obj.govtStayNo = data[12]
    obj.govtStayAmount = data[13]
    obj.aplAuthStayNo = data[14]
    obj.aplAuthStayAmount = data[15]
    obj.reassessNo = data[16]
    obj.reassessAmount = data[17]
    obj.writeOffNo = data[18]
    obj.writeOffAmount = data[19]
    obj.returnNo = data[20]
    obj.returnAmount = data[21]
    obj.prevCollectionNo = data[22]
    obj.prevCollectionAmount = data[23]
    obj.newCollectionNo = data[24]
    obj.newCollectionAmount = data[25]
    obj.remarks = data[26]
    objArray.push(obj)
  })
  return objArray
}

function getCollectionById(id) {
  const data = getDataById_("Data", id, 27)
  const obj = {}
  obj.collectionId = data[0]
  obj.villageId = data[1]
  obj.monthId = data[2]
  obj.itemId = data[3]
  obj.startDemandNo = data[4]
  obj.startDemandAmount = data[5]
  obj.prevDemandNo = data[6]
  obj.prevDemandAmount = data[7]
  obj.newDemandNo = data[8]
  obj.newDemandAmount = data[9]
  obj.courtStayNo = data[10]
  obj.courtStayAmount = data[11]
  obj.govtStayNo = data[12]
  obj.govtStayAmount = data[13]
  obj.aplAuthStayNo = data[14]
  obj.aplAuthStayAmount = data[15]
  obj.reassessNo = data[16]
  obj.reassessAmount = data[17]
  obj.writeOffNo = data[18]
  obj.writeOffAmount = data[19]
  obj.returnNo = data[20]
  obj.returnAmount = data[21]
  obj.prevCollectionNo = data[22]
  obj.prevCollectionAmount = data[23]
  obj.newCollectionNo = data[24]
  obj.newCollectionAmount = data[25]
  obj.remarks = data[26]
  return obj
}

function saveCollection(obj) {
  const info = [
    obj.villageId,
    obj.monthId,
    obj.itemId,
    obj.startDemandNo,
    obj.startDemandAmount,
    obj.prevDemandNo,
    obj.prevDemandAmount,
    obj.newDemandNo,
    obj.newDemandAmount,
    obj.courtStayNo,
    obj.courtStayAmount,
    obj.govtStayNo,
    obj.govtStayAmount,
    obj.aplAuthStayNo,
    obj.aplAuthStayAmount,
    obj.reassessNo,
    obj.reassessAmount,
    obj.writeOffNo,
    obj.writeOffAmount,
    obj.returnNo,
    obj.returnAmount,
    obj.prevCollectionNo,
    obj.prevCollectionAmount,
    obj.newCollectionNo,
    obj.newCollectionAmount,
    obj.remarks,
  ]
  const rtnId = addData_("Data", info)
  const rtnObj = getCollectionById(rtnId)
  return rtnObj
}

function updateCollection(obj) {
  const info = [
    obj.collectionId,
    obj.villageId,
    obj.monthId,
    obj.itemId,
    obj.startDemandNo,
    obj.startDemandAmount,
    obj.prevDemandNo,
    obj.prevDemandAmount,
    obj.newDemandNo,
    obj.newDemandAmount,
    obj.courtStayNo,
    obj.courtStayAmount,
    obj.govtStayNo,
    obj.govtStayAmount,
    obj.aplAuthStayNo,
    obj.aplAuthStayAmount,
    obj.reassessNo,
    obj.reassessAmount,
    obj.writeOffNo,
    obj.writeOffAmount,
    obj.returnNo,
    obj.returnAmount,
    obj.prevCollectionNo,
    obj.prevCollectionAmount,
    obj.newCollectionNo,
    obj.newCollectionAmount,
    obj.remarks,
  ]
  const rtnId = updateData_("Data", obj.collectionId, 27, info)
  const rtnObj = getCollectionById(rtnId)
  return rtnObj
}

function deleteCollection(id) {
  const rtnId = deleteData_("Data", id)
  if (rtnId.toString().toLowerCase() === id.toString().toLowerCase()) {
    return rtnId
  } else {
    return 0
  }
}

function findMissingEntries_(collectionArray, thisMonth) {
  const currentMonth = Number(thisMonth)

  // Create Sets for faster lookup
  const currentSet = new Set(
    collectionArray
      .filter((obj) => Number(obj.monthId) === currentMonth)
      .map((obj) => `${obj.villageId}-${obj.itemId}`)
  )

  // Find missing entries
  const missing = collectionArray
    .filter((obj) => Number(obj.monthId) === Number(thisMonth) - 1)
    .filter((obj) => {
      const key = `${obj.villageId}-${obj.itemId}`
      return !currentSet.has(key)
    })

  return missing // these are the entries from lastMonth that are missing in currentMonth
}

function populateNewData(monthId) {
  const missing = findMissingEntries_(getCollections(), monthId)
  const ss = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  )
  const ws = ss.getSheetByName("Data")
  const row = ws.getLastRow() - 1 < 1 ? 1 : ws.getLastRow() - 1
  var uniqueIds = ws.getRange(2, 1, row, 1).getValues()

  var maxNum = 0
  uniqueIds.forEach((r) => {
    maxNum = r[0] > maxNum ? r[0] : maxNum
  })
  var newId = maxNum + 1
  const newEntries = missing.map((obj) => {
    const newObj = {
      ...obj,
      monthId: Number(monthId),
      collectionId: newId,
      startDemandNo: obj.startDemandNo,
      startDemandAmount: obj.startDemandAmount,
      prevDemandNo:
        Number(obj.prevDemandNo || 0) + Number(obj.newDemandNo || 0),
      prevDemandAmount:
        Number(obj.prevDemandAmount || 0) + Number(obj.newDemandAmount || 0),
      newDemandNo: 0,
      newDemandAmount: 0,
      courtStayNo: obj.courtStayNo,
      courtStayAmount: obj.courtStayAmount,
      govtStayNo: obj.govtStayNo,
      govtStayAmount: obj.govtStayAmount,
      aplAuthStayNo: obj.aplAuthStayNo,
      aplAuthStayAmount: obj.aplAuthStayAmount,
      reassessNo: obj.reassessNo,
      reassessAmount: obj.reassessAmount,
      writeOffNo: obj.writeOffNo,
      writeOffAmount: obj.writeOffAmount,
      returnNo: obj.returnNo,
      returnAmount: obj.returnAmount,
      prevCollectionNo:
        Number(obj.prevCollectionNo) + Number(obj.newCollectionNo),
      prevCollectionAmount:
        Number(obj.prevCollectionAmount) + Number(obj.newCollectionAmount),
      newCollectionNo: 0,
      newCollectionAmount: 0,
    }
    newId = newId + 1
    return newObj
  })
  const newDataArray = newEntries.map((obj) => [
    obj.collectionId,
    obj.villageId,
    obj.monthId,
    obj.itemId,
    obj.startDemandNo,
    obj.startDemandAmount,
    obj.prevDemandNo,
    obj.prevDemandAmount,
    obj.newDemandNo,
    obj.newDemandAmount,
    obj.courtStayNo,
    obj.courtStayAmount,
    obj.govtStayNo,
    obj.govtStayAmount,
    obj.aplAuthStayNo,
    obj.aplAuthStayAmount,
    obj.reassessNo,
    obj.reassessAmount,
    obj.writeOffNo,
    obj.writeOffAmount,
    obj.returnNo,
    obj.returnAmount,
    obj.prevCollectionNo,
    obj.prevCollectionAmount,
    obj.newCollectionNo,
    obj.newCollectionAmount,
    obj.remarks,
  ])

  ws.getRange(
    ws.getLastRow() + 1,
    1,
    newDataArray.length,
    newDataArray[0].length
  ).setValues(newDataArray)
  const rtnArray = getCollections()
  return rtnArray
}
