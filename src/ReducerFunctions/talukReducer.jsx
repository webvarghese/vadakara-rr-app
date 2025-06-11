const talukObj = {
  talukId: "",
  talukName: "",
}

const talukArray = []
const listArray = []

export const tlkkObj = { talukObj, talukArray, listArray }

export function talukReducer(state, action) {
  switch (action.type) {
    case "fillArray":
      return {
        ...state,
        talukArray: [...action.payload],
      }

    case "makeListArray":
      const lstArr = state.talukArray.map((obj) => {
        return {
          idField: obj.talukId,
          textField: obj.talukName,
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
