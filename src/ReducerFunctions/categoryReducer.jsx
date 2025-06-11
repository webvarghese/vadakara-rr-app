const catObj = {
  categoryId: "",
  categoryName: "",
}

const categoryArray = []
const listArray = []

export const categoryObj = { catObj, categoryArray, listArray }

export function categoryReducer(state, action) {
  switch (action.type) {
    case "fillArray":
      return {
        ...state,
        categoryArray: [...action.payload],
      }

    case "makeListArray":
      const lstArr = state.cattegoryArray.map((obj) => {
        return {
          idField: obj.categoryId,
          textField: obj.categoryName,
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
