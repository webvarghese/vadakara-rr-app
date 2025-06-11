function getVillages() {
  const dataArray = getSheetDataArray_("Villages", 5)
  const objArray = []
  dataArray.map((data) => {
    const obj = {}
    obj.villageId = data[0]
    obj.talukId = data[1]
    obj.villageName = data[2]
    obj.cugNumber = data[3]
    obj.isLocked = data[4]
    objArray.push(obj)
  })
  return objArray
}

function getVillageById(id) {
  const data = getDataById_("Villages", id, 5)
  const obj = {}
  obj.villageId = data[0]
  obj.talukId = data[1]
  obj.villageName = data[2]
  obj.cugNumber = data[3]
  obj.isLocked = data[4]
  return obj
}

function saveVillage(obj) {
  const info = [obj.talukId, obj.villageName, obj.cugNumber, obj.isLocked]
  const rtnId = addData_("Villages", info)
  const rtnObj = getVillageById(rtnId)
  return rtnObj
}

function updateVillage(obj) {
  const info = [
    obj.villageId,
    obj.talukId,
    obj.villageName,
    obj.cugNumber,
    obj.isLocked,
  ]
  const rtnId = updateData_("Villages", obj.villageId, 5, info)
  const rtnObj = getVillageById(rtnId)
  return rtnObj
}

function deleteVillage(id) {
  const rtnId = deleteData_("Villages", id)
  if (rtnId.toString().toLowerCase() === id.toString().toLowerCase()) {
    return true
  } else {
    return false
  }
}

function updateAllVillages(data) {
  const info = []
  data.map((obj) => {
    const objArray = [
      obj.villageId,
      obj.talukId,
      obj.villageName,
      obj.cugNumber,
      obj.isLocked,
    ]
    info.push(objArray)
  })
  if (changeData_("Villages", info)) {
    const villages = getVillages()
    return villages
  } else {
    return []
  }
}
