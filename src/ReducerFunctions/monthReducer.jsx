const mObj = {
  villageId: "",
  talukId: "",
  villageName: "",
  cugNumber: "",
  isLocked: "",
}

const monthArray = []
const listArray = []

export const monthObj = { mObj, monthArray, listArray }

export function monthReducer(state, action) {
  switch (action.type) {
    case "fillArray":
      return {
        ...state,
        monthArray: [...action.payload],
      }
    case "toggleLock":
      const arr = state.monthArray.map((obj) => {
        if (
          obj.monthId.toString().toLowerCase() ===
          action.payload.toString().toLowerCase()
        ) {
          return {
            ...obj,
            isLocked: Number(obj.isLocked) === 1 ? 0 : 1,
          }
        } else {
          return { ...obj, isLocked: 1 }
        }
      })
      return {
        ...state,
        monthArray: [...arr],
      }
    case "makeListArray":
      const lstArr = state.monthArray.map((obj) => {
        return {
          idField: obj.monthId,
          textField: `${obj.monthName} - ${
            Number(obj.isLocked) === 1 ? "Locked" : "Open"
          }`,
          color: obj.isLocked ? "lightgreen" : "blue",
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
