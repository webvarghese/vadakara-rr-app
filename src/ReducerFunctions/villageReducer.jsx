const villageObj = {
  villageId: "",
  talukId: "",
  villageName: "",
  cugNumber: "",
  isLocked: "",
}

const villageArray = []
const listArray = []

export const villObj = { villageObj, villageArray, listArray }

export function villageReducer(state, action) {
  switch (action.type) {
    case "fillArray":
      return {
        ...state,
        villageArray: [...action.payload],
      }
    case "toggleLock":
      const arr = state.villageArray.map((obj) => {
        if (
          obj.villageId.toString().toLowerCase() ===
          action.payload.toString().toLowerCase()
        ) {
          return { ...obj, isLocked: Number(obj.isLocked) === 1 ? 0 : 1 }
        } else {
          return obj
        }
      })
      return {
        ...state,
        villageArray: [...arr],
      }
    case "addToList":
      const arr1 = state.villageArray.map((obj) => {
        if (
          obj.villageId.toString().toLowerCase() ===
          action.payload.toString().toLowerCase()
        ) {
          return { ...action.payload }
        } else {
          return obj
        }
      })
      return {
        ...state,
        villageArray: [...arr1],
      }
    case "makeListArray":
      const lstArr = state.villageArray.map((obj) => {
        return {
          idField: obj.villageId,
          textField: `${obj.villageName} - ${obj.isLocked ? "Locked" : "Open"}`,
          color: Number(obj.isLocked) === 1 ? "lightgreen" : "blue",
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
