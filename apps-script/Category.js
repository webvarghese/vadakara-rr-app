function getCategorys() {
  const dataArray = getSheetDataArray_("Category", 2)
  const objArray = []
  dataArray.map((data) => {
    const obj = {}
    obj.categoryId = data[0]
    obj.categoryName = data[1]
    objArray.push(obj)
  })
  return objArray
}

function getCategoryById(id) {
  const data = getDataById_("Category", id, 2)
  const obj = {}
  obj.categoryId = data[0]
  obj.categoryName = data[1]
  return obj
}

function saveCategory(obj) {
  const info = [obj.categoryName]
  const rtnId = addData_("Category", info)
  const rtnObj = getCategoryById(rtnId)
  return rtnObj
}

function updateCategory(obj) {
  const info = [obj.categoryId, obj.categoryName]
  const rtnId = updateData_("Category", obj.categoryId, 2, info)
  const rtnObj = getCategoryById(rtnId)
  return rtnObj
}

function deleteCategory(id) {
  const rtnId = deleteData_("Category", id)
  if (rtnId.toString().toLowerCase() === id.toString().toLowerCase()) {
    return true
  } else {
    return false
  }
}
