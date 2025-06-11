function getMonths() {
  const dataArray = getSheetDataArray_("Months", 3)
  const objArray = []
  dataArray.map((data) => {
    const obj = {}
    obj.monthId = data[0]
    obj.monthName = data[1]
    obj.isLocked = data[2]
    objArray.push(obj)
  })
  return objArray
}

function getMonthById(id) {
  const data = getDataById_("Months", id, 3)
  const obj = {}
  obj.monthId = data[0]
  obj.monthName = data[1]
  obj.isLocked = data[2]
  return objArray
}

function saveMonth(obj) {
  const info = [obj.monthName, obj.isLocked]
  const rtnId = addData_("Months", info)
  const rtnObj = getMonthById(rtnId)
  return rtnObj
}

function updateMonth(obj) {
  const info = [obj.monthId, obj.monthName, obj.isLocked]
  const rtnId = updateData_("Months", obj.monthId, 3, info)
  const rtnObj = getMonthById(rtnId)
  return rtnObj
}

function deleteMonth(id) {
  const rtnId = deleteData_("Months", id)
  if (rtnId.toString().toLowerCase() === id.toString().toLowerCase()) {
    return true
  } else {
    return false
  }
}

function updateAllMonths(data) {
  const info = []
  data.map((obj) => {
    const objArray = [obj.monthId, obj.monthName, obj.isLocked]
    info.push(objArray)
  })
  if (changeData_("Months", info)) {
    const months = getMonths()
    return months
  } else {
    return []
  }
}
