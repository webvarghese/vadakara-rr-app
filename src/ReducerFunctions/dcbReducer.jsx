const dcbObj = {
  villageId: "",
  monthId: "",
  itemId: "",
  talukId: "",
  startDemandNo: "",
  startDemandAmount: "",
  prevDemandNo: "",
  prevDemandAmount: "",
  newDemandNo: "",
  newDemandAmount: "",
  courtStayNo: "",
  courtStayAmount: "",
  govtStayNo: "",
  govtStayAmount: "",
  aplAuthStayNo: "",
  aplAuthStayAmount: "",
  reassessNo: "",
  reassessAmount: "",
  writeOffNo: "",
  writeOffAmount: "",
  returnNo: "",
  returnAmount: "",
  prevCollectionNo: "",
  prevCollectionAmount: "",
  newCollectionNo: "",
  newCollectionAmount: "",
  remarks: "",
}

const totObj = {
  totDemandNo: 0,
  totDemandAmount: 0,
  totStayNo: 0,
  totStayAmount: 0,
  totDeductionNo: 0,
  totDeductionAmount: 0,
  totCollectibleNo: 0,
  totCollectibleAmount: 0,
  totCollectionNo: 0,
  totCollectionAmount: 0,
  totBalanceNo: 0,
  totBalanceAmount: 0,
  totPercentNo: 0,
  totPercentAmount: 0,
}

const collectionArray = []
const dcbTabData = []
const dcbStatementData = []
const dcbAbstractData = []
const dcbAbstractPrepared = false

function toNumber(val) {
  const num = Number(val)
  return isNaN(num) ? 0 : num
}

function calculateTotal(obj) {
  const get = (key) => toNumber(obj[key])

  const totDemandNo =
    get("startDemandNo") + get("prevDemandNo") + get("newDemandNo")
  const totDemandAmount =
    get("startDemandAmount") + get("prevDemandAmount") + get("newDemandAmount")

  const totStayNo =
    get("courtStayNo") + get("govtStayNo") + get("aplAuthStayNo")
  const totStayAmount =
    get("courtStayAmount") + get("govtStayAmount") + get("aplAuthStayAmount")

  const totDeductionNo = get("writeOffNo") + get("returnNo") + get("reassessNo")
  const totDeductionAmount =
    get("writeOffAmount") + get("returnAmount") + get("reassessAmount")

  const totCollectibleNo = totDemandNo - totStayNo - totDeductionNo
  const totCollectibleAmount =
    totDemandAmount - totStayAmount - totDeductionAmount

  const totCollectionNo = get("prevCollectionNo") + get("newCollectionNo")
  const totCollectionAmount =
    get("prevCollectionAmount") + get("newCollectionAmount")

  const totBalanceNo = totCollectibleNo - totCollectionNo
  const totBalanceAmount = totCollectibleAmount - totCollectionAmount

  const totPercentNo = totCollectibleNo
    ? Math.round((totCollectionNo / totCollectibleNo) * 100)
    : 0
  const totPercentAmount = totCollectibleAmount
    ? Math.round((totCollectionAmount / totCollectibleAmount) * 100)
    : 0

  return {
    totDemandNo,
    totDemandAmount,
    totStayNo,
    totStayAmount,
    totDeductionNo,
    totDeductionAmount,
    totCollectibleNo,
    totCollectibleAmount,
    totCollectionNo,
    totCollectionAmount,
    totBalanceNo,
    totBalanceAmount,
    totPercentNo,
    totPercentAmount,
  }
}

function makeLine(objArr) {
  if (!Array.isArray(objArr) || objArr.length === 0) return {}
  const result = {}
  const keys = Object.keys(objArr[0])
  for (const key of keys) {
    result[key] = objArr.reduce((sum, obj) => sum + toNumber(obj[key]), 0)
  }
  return result
}

export const initObj = {
  dcbObj,
  totObj,
  collectionArray,
  dcbTabData,
  dcbStatementData,
  dcbAbstractData,
  dcbAbstractPrepared,
}
export function dcbReducer(state, action) {
  switch (action.type) {
    case "updateField":
      return {
        ...state,
        dcbObj: {
          ...state.dcbObj,
          [action.payload.name]: action.payload.value,
        },
      }

    case "calculate": {
      const rtnObj = calculateTotal(action.payload)
      return {
        ...state,
        totObj: { ...rtnObj },
      }
    }

    case "fillArray":
      return {
        ...state,
        collectionArray: Array.isArray(action.payload)
          ? [...action.payload]
          : [],
      }

    case "addToList": {
      const objToAdd = action.payload.dcbObj
      const updatedArray = state.collectionArray.some(
        (obj) =>
          Number(obj.villageId) === Number(objToAdd.villageId) &&
          Number(obj.monthId) === Number(objToAdd.monthId) &&
          Number(obj.itemId) === Number(objToAdd.itemId)
      )
        ? state.collectionArray.map((obj) =>
            Number(obj.villageId) === Number(objToAdd.villageId) &&
            Number(obj.monthId) === Number(objToAdd.monthId) &&
            Number(obj.itemId) === Number(objToAdd.itemId)
              ? objToAdd
              : obj
          )
        : [...state.collectionArray, objToAdd]

      return {
        ...state,
        collectionArray: updatedArray,
      }
    }
    case "removeFromList": {
      const id = action.payload.collectionId
      console.log(id)
      const updatedArray = state.collectionArray.filter(
        (dcb) => Number(dcb.collectionId) !== Number(id)
      )
      return {
        ...state,
        collectionArray: updatedArray,
      }
    }

    case "makeMonthWiseDCBTableDataForVillage": {
      const filtered = state.collectionArray.filter(
        (obj) =>
          obj.monthId?.toString().toLowerCase() ===
            state.dcbObj.monthId?.toString().toLowerCase() &&
          obj.villageId?.toString().toLowerCase() ===
            state.dcbObj.villageId?.toString().toLowerCase()
      )

      const rtnArr = filtered.map((obj) => ({
        ...obj,
        ...calculateTotal(obj),
      }))

      return {
        ...state,
        dcbTabData: rtnArr,
      }
    }

    case "makeMonthWiseDCBStatementDataForVillage": {
      if (!state.collectionArray.length) return state

      const filtered = state.collectionArray.filter(
        (obj) =>
          obj.monthId?.toString().toLowerCase() ===
            state.dcbObj.monthId?.toString().toLowerCase() &&
          obj.villageId?.toString().toLowerCase() ===
            state.dcbObj.villageId?.toString().toLowerCase()
      )

      let rtnArr = []
      const totArr = []

      action.payload.categorys.forEach((cat) => {
        const catArr = []

        action.payload.items.forEach((item) => {
          if (
            cat.categoryId?.toString().toLowerCase() ===
            item.categoryId?.toString().toLowerCase()
          ) {
            const match = filtered.find(
              (line) =>
                line.itemId?.toString().toLowerCase() ===
                item.itemId?.toString().toLowerCase()
            )

            if (!match) {
              catArr.push({
                ...dcbObj,
                ...totObj,
                itemName: item.itemName,
                type: "item",
              })
            } else {
              catArr.push({
                ...match,
                ...calculateTotal(match),
                itemName: item.itemName,
                type: "item",
              })
            }
          }
        })

        const catLine = {
          ...makeLine(catArr),
          ...calculateTotal(makeLine(catArr)),
          itemName: `${cat.categoryName} Total`,
          type: "category",
        }

        catArr.push(catLine)
        totArr.push(catLine)
        rtnArr = [...rtnArr, ...catArr]
      })

      const totLine = {
        ...makeLine(totArr),
        ...calculateTotal(makeLine(totArr)),
        itemName: "Grand Total",
        type: "total",
      }

      rtnArr.push(totLine)

      return {
        ...state,
        dcbStatementData: rtnArr,
      }
    }

    case "makeMonthWiseDCBStatementDataForTaluk": {
      if (!state.collectionArray.length) return state

      const villageArray = action.payload.villages
        .filter(
          (v) => v.talukId?.toString() === action.payload.talukId?.toString()
        )
        .map((v) => v.villageId?.toString())

      const filtered = state.collectionArray.filter((obj) => {
        const matchesMonth =
          obj.monthId?.toString().toLowerCase() ===
          state.dcbObj.monthId?.toString().toLowerCase()
        const matchesVillage = villageArray.includes(obj.villageId?.toString())
        return action.payload.talukId?.toString() === "3"
          ? matchesMonth
          : matchesMonth && matchesVillage
      })

      if (!filtered.length) return state

      const mId = filtered[0].monthId
      let rtnArr = []
      const totArr = []

      action.payload.categorys.forEach((cat) => {
        const catArr = []

        action.payload.items.forEach((item) => {
          if (
            item.categoryId?.toString().toLowerCase() ===
            cat.categoryId?.toString().toLowerCase()
          ) {
            const matches = filtered.filter(
              (line) =>
                line.itemId?.toString().toLowerCase() ===
                item.itemId?.toString().toLowerCase()
            )

            if (!matches.length) {
              catArr.push({
                ...dcbObj,
                ...totObj,
                itemName: item.itemName,
                monthId: mId,
                type: "item",
              })
            } else {
              const line = makeLine(matches)
              catArr.push({
                ...line,
                ...calculateTotal(line),
                itemName: item.itemName,
                monthId: mId,
                type: "item",
              })
            }
          }
        })

        const catLine = {
          ...makeLine(catArr),
          ...calculateTotal(makeLine(catArr)),
          itemName: `${cat.categoryName} Total`,
          type: "category",
        }

        catArr.push(catLine)
        totArr.push(catLine)
        rtnArr = [...rtnArr, ...catArr]
      })

      const totLine = {
        ...makeLine(totArr),
        ...calculateTotal(makeLine(totArr)),
        itemName: "Grand Total",
        type: "total",
      }

      rtnArr.push(totLine)

      return {
        ...state,
        dcbAbstractData: rtnArr,
        dcbAbstractPrepared: true,
      }
    }

    case "makeLine": {
      makeLine(state.monthWiseArray)
      return { ...state }
    }

    case "prepareAbstractAgain":
      return {
        ...state,
        dcbAbstractPrepared: false,
      }

    case "fillObj": {
      const { villageId, monthId, itemId, talukId } = state.dcbObj
      const blankObj = {
        villageId: villageId,
        monthId: monthId,
        itemId: itemId,
        talukId: talukId,
        startDemandNo: "",
        startDemandAmount: "",
        prevDemandNo: "",
        prevDemandAmount: "",
        newDemandNo: "",
        newDemandAmount: "",
        courtStayNo: "",
        courtStayAmount: "",
        govtStayNo: "",
        govtStayAmount: "",
        aplAuthStayNo: "",
        aplAuthStayAmount: "",
        reassessNo: "",
        reassessAmount: "",
        writeOffNo: "",
        writeOffAmount: "",
        returnNo: "",
        returnAmount: "",
        prevCollectionNo: "",
        prevCollectionAmount: "",
        newCollectionNo: "",
        newCollectionAmount: "",
        remarks: "",
      }

      if (!villageId || !monthId || !itemId)
        return { ...state, dcbObj: blankObj }

      // 1. Check if exact match exists for villageId, monthId, itemId
      const existing = state.collectionArray.find(
        (obj) =>
          Number(obj.villageId) === Number(villageId) &&
          Number(obj.monthId) === Number(monthId) &&
          Number(obj.itemId) === Number(itemId)
      )

      if (existing?.collectionId > 0) {
        return {
          ...state,
          dcbObj: existing,
          totObj: calculateTotal(existing),
        }
      }

      // 2. Check if previous month record exists for same villageId, itemId
      const lastMonth = Number(monthId) - 1
      const lastMonthObj = state.collectionArray.find(
        (obj) =>
          Number(obj.villageId) === Number(villageId) &&
          Number(obj.monthId) === lastMonth &&
          Number(obj.itemId) === Number(itemId)
      )

      if (lastMonthObj?.collectionId > 0) {
        const newObj = {
          villageId: villageId,
          monthId: monthId,
          itemId: itemId,
          talukId: talukId,
          startDemandNo: lastMonthObj.startDemandNo,
          startDemandAmount: lastMonthObj.startDemandAmount,
          prevDemandNo:
            Number(lastMonthObj.prevDemandNo) +
            Number(lastMonthObj.newDemandNo),
          prevDemandAmount:
            Number(lastMonthObj.prevDemandAmount) +
            Number(lastMonthObj.newDemandAmount),
          newDemandNo: "",
          newDemandAmount: "",
          courtStayNo: lastMonthObj.courtStayNo,
          courtStayAmount: lastMonthObj.courtStayAmount,
          govtStayNo: lastMonthObj.govtStayNo,
          govtStayAmount: lastMonthObj.govtStayAmount,
          aplAuthStayNo: lastMonthObj.aplAuthStayNo,
          aplAuthStayAmount: lastMonthObj.aplAuthStayAmount,
          reassessNo: lastMonthObj.reassessNo,
          reassessAmount: lastMonthObj.reassessAmount,
          writeOffNo: lastMonthObj.writeOffNo,
          writeOffAmount: lastMonthObj.writeOffAmount,
          returnNo: lastMonthObj.returnNo,
          returnAmount: lastMonthObj.returnAmount,
          prevCollectionNo:
            Number(lastMonthObj.prevCollectionNo) +
            Number(lastMonthObj.newCollectionNo),
          prevCollectionAmount:
            Number(lastMonthObj.prevCollectionAmount) +
            Number(lastMonthObj.newCollectionAmount),
          newCollectionNo: "",
          newCollectionAmount: "",
          remarks: "",
        }

        return {
          ...state,
          dcbObj: newObj,
          totObj: calculateTotal(newObj),
        }
      }

      // 3. No match in current or previous month — return a clean object

      return {
        ...state,
        dcbObj: blankObj,
        totObj: calculateTotal(blankObj),
      }
    }

    case "clearObject":
      return {
        ...state,
        dcbObj: dcbObj,
        totObj: calculateTotal(dcbObj),
      }

    default:
      throw new Error("Unknown action.")
  }
}
