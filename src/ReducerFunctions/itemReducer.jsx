const itObj = {
  itemId: "",
  categoryId: "",
  itemName: "",
}

const itemArray = []
const listArray = []

export const itemObj = { itObj, itemArray, listArray }

export function itemReducer(state, action) {
  switch (action.type) {
    case "fillArray":
      return {
        ...state,
        itemArray: [...action.payload],
      }

    case "makeListArray":
      const lstArr = state.itemArray.map((obj) => {
        return {
          idField: obj.itemId,
          textField: obj.itemName,
        }
      })
      return {
        ...state,
        listArray: [...lstArr],
      }
    default:
      break
  }
}
