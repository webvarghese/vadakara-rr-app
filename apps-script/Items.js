function getItems() {
  const dataArray = getSheetDataArray_("Items", 3)
  const objArray = []
  dataArray.map((data) => {
    const obj = {}
    obj.itemId = data[0]
    obj.categoryId = data[1]
    obj.itemName = data[2]
    objArray.push(obj)
  })
  return objArray
}

function getItemById(id) {
  const data = getDataById_("Items", id, 3)
  const obj = {}
  obj.itemId = data[0]
  obj.categoryId = data[1]
  obj.itemName = data[2]
  return objArray
}

function saveItem(obj) {
  const info = [obj.categoryId, obj.itemName]
  const rtnId = addData_("Items", info)
  const rtnObj = getItemById(rtnId)
  return rtnObj
}

function updateItem(obj) {
  const info = [obj.itemId, obj.categoryId, obj.itemName]
  const rtnId = updateData_("Items", obj.itemId, 3, info)
  const rtnObj = getItemById(rtnId)
  return rtnObj
}

function deleteItem(id) {
  const rtnId = deleteData_("Items", id)
  if (rtnId.toString().toLowerCase() === id.toString().toLowerCase()) {
    return true
  } else {
    return false
  }
}
