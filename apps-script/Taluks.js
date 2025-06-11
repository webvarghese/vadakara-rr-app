function getTaluks() {
  const dataArray = getSheetDataArray_("Taluks", 2)
  const objArray = []
  dataArray.map((data) => {
    const obj = {}
    obj.talukId = data[0]
    obj.talukName = data[1]
    objArray.push(obj)
  })
  return objArray
}

function getTalukById(id) {
  const data = getDataById_("Taluks", id, 2)
  const obj = {}
  obj.talukId = data[0]
  obj.talukName = data[1]
  return objArray
}

function saveTaluk(obj) {
  const info = [obj.talukName]
  const rtnId = addData_("Taluks", info)
  const rtnObj = getTalukById(rtnId)
  return rtnObj
}

function updateTaluk(obj) {
  const info = [obj.talukId, obj.talukName]
  const rtnId = updateData_("Taluks", obj.talukId, 2, info)
  const rtnObj = getTalukById(rtnId)
  return rtnObj
}

function deleteTaluk(id) {
  const rtnId = deleteData_("Taluks", id)
  if (rtnId.toString().toLowerCase() === id.toString().toLowerCase()) {
    return true
  } else {
    return false
  }
}
