function exportRangeToPDf(range) {
  var blob,
    exportUrl,
    options,
    pdfFile,
    response,
    sheetTabNameToGet,
    sheetTabId,
    ss,
    ssID,
    url_base

  range = range ? range : "A1:J30" //Set the default to whatever you want

  sheetTabNameToGet = "DCB" //Replace the name with the sheet tab name for your situation
  ss = SpreadsheetApp.openById("1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc") //This assumes that the Apps Script project is bound to a G-Sheet
  ssID = ss.getId()
  sh = ss.getSheetByName(sheetTabNameToGet)
  sheetTabId = sh.getSheetId()
  url_base = ss.getUrl().replace(/edit$/, "")

  //Logger.log('url_base: ' + url_base)

  exportUrl =
    url_base +
    "export?exportFormat=pdf&format=pdf" +
    "&gid=" +
    sheetTabId +
    "&id=" +
    ssID +
    "&range=" +
    range +
    //'&range=NamedRange +
    "&size=A4" + // paper size
    "&portrait=false" + // orientation, false for landscape
    "&fitw=true" + // fit to width, false for actual size
    "&sheetnames=false&printtitle=false&pagenumbers=false" + //hide optional headers and footers
    "&gridlines=false" + // hide gridlines
    "&fzr=false" // do not repeat row headers (frozen rows) on each page

  Logger.log("exportUrl: " + exportUrl)

  options = {
    headers: {
      Authorization: "Bearer " + ScriptApp.getOAuthToken(),
    },
  }

  options.muteHttpExceptions = true //Make sure this is always set

  response = UrlFetchApp.fetch(exportUrl, options)

  //Logger.log(response.getResponseCode())

  if (response.getResponseCode() !== 200) {
    console.log(
      "Error exporting Sheet to PDF!  Response Code: " +
        response.getResponseCode()
    )
    return
  }

  blob = response.getBlob()

  blob.setName("AAA_test.pdf")

  pdfFile = DriveApp.createFile(blob) //Create the PDF file
  //Logger.log('pdfFile ID: ' +pdfFile.getId())
  const pdfBytes = pdfFile.getBlob().getAs("application/pdf").getBytes()
  // pdfFolder.removeFile(pdfFile)
  var files = DriveApp.getFilesByName("AAA_test.pdf")
  while (files.hasNext()) {
    files.next().setTrashed(true)
  }

  return pdfBytes
}
function createDCBheadingPage2(village, month) {
  const ws = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  ).getSheetByName("DCB")
  ws.clear()
  const heading = ws.getRange("A1:R1").merge()
  heading.setValue(`RR DCB Statement of ${village} for the month ${month}`)
  heading.setFontSize(20).setHorizontalAlignment("center").setFontWeight("bold")
  ws.getRange("A2:R4")
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setFontFamily("Roboto")
    .setBackground("lightBlue")

  ws.getRange("A2:A4").merge().setValue("Item")
  ws.getRange("B2:C3").merge().setValue("Not Collectible as RRC Returned")
  ws.getRange("D2:E3").merge().setValue("Total Not Collectible")
  ws.getRange("F2:G3").merge().setValue("Collectible")
  ws.getRange("H2:M2").merge().setValue("Collection")
  ws.getRange("N2:O3").merge().setValue("Balance")
  ws.getRange("P2:Q3").merge().setValue("Percent")
  ws.getRange("R2:R4").merge().setValue("Remarks")
  ws.getRange("H3:I3").merge().setValue("Previous")
  ws.getRange("J3:K3").merge().setValue("New")
  ws.getRange("L3:M3").merge().setValue("Total")

  ws.getRange("B4").setValue("No")
  ws.getRange("C4").setValue("Amount")
  ws.getRange("D4").setValue("No")
  ws.getRange("E4").setValue("Amount")
  ws.getRange("F4").setValue("No")
  ws.getRange("G4").setValue("Amount")
  ws.getRange("H4").setValue("No")
  ws.getRange("I4").setValue("Amount")
  ws.getRange("J4").setValue("No")
  ws.getRange("K4").setValue("Amount")
  ws.getRange("L4").setValue("No")
  ws.getRange("M4").setValue("Amount")
  ws.getRange("N4").setValue("No")
  ws.getRange("O4").setValue("Amount")
  ws.getRange("P4").setValue("No")
  ws.getRange("Q4").setValue("Amount")
}

function createDCBheadingPage1(name, month, startHeading) {
  const ws = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  ).getSheetByName("DCB")
  ws.clear()
  const heading = ws.getRange("A1:U1").merge()
  heading.setValue(`RR DCB Statement of ${name} for the month of ${month}`)
  heading.setFontSize(20).setHorizontalAlignment("center").setFontWeight("bold")
  ws.getRange("A2:U4")
    .setFontWeight("bold")
    .setHorizontalAlignment("center")
    .setFontFamily("Roboto")
    .setBackground("lightBlue")

  ws.getRange("A2:A4").merge().setValue("Item")
  ws.getRange("B2:I2").merge().setValue("Demand")
  ws.getRange("J2:Q2").merge().setValue("Stay")
  ws.getRange("R2:S3")
    .merge()
    .setValue("Not Collectible Due to Reassessment")
    .setWrap(true)
  ws.getRange("T2:U3")
    .merge()
    .setValue("Not Collectible due to WriteOff/ Remission")
    .setWrap(true)
  ws.getRange("B3:C3").merge().setValue(startHeading)
  ws.getRange("D3:E3").merge().setValue("Previous")
  ws.getRange("F3:G3").merge().setValue("New")
  ws.getRange("H3:I3").merge().setValue("Total")
  ws.getRange("J3:K3").merge().setValue("Court")
  ws.getRange("L3:M3").merge().setValue("Govt")
  ws.getRange("N3:O3").merge().setValue("Appeal Authority")
  ws.getRange("P3:Q3").merge().setValue("Stay Total")
  ws.getRange("B4").setValue("No")
  ws.getRange("C4").setValue("Amount")
  ws.getRange("D4").setValue("No")
  ws.getRange("E4").setValue("Amount")
  ws.getRange("F4").setValue("No")
  ws.getRange("G4").setValue("Amount")
  ws.getRange("H4").setValue("No")
  ws.getRange("I4").setValue("Amount")
  ws.getRange("J4").setValue("No")
  ws.getRange("K4").setValue("Amount")
  ws.getRange("L4").setValue("No")
  ws.getRange("M4").setValue("Amount")
  ws.getRange("N4").setValue("No")
  ws.getRange("O4").setValue("Amount")
  ws.getRange("P4").setValue("No")
  ws.getRange("Q4").setValue("Amount")
  ws.getRange("R4").setValue("No")
  ws.getRange("S4").setValue("Amount")
  ws.getRange("T4").setValue("No")
  ws.getRange("U4").setValue("Amount")
}

function formatVillageDCB() {
  const ws = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  ).getSheetByName("DCB")

  ws.setRowHeights(1, 34, 27)

  ws.getRange("A14:Z14").setFontWeight("bold").setBackground("lightgrey")
  ws.getRange("A23:Z23").setFontWeight("bold").setBackground("lightgrey")
  ws.getRange("A25:Z25").setFontWeight("bold").setBackground("lightgrey")
  ws.getRange("A29:Z29").setFontWeight("bold").setBackground("lightgrey")
  ws.getRange("A33:Z33").setFontWeight("bold").setBackground("lightgrey")
  ws.getRange("A34:Z34")
    .setFontWeight("bold")
    .setFontSize(11)
    .setBackground("lightgrey")

  ws.getRange("T3:U34").setBackground("lightgrey")
  ws.getRange("B5:W34").setNumberFormat("#,###")

  ws.setColumnWidth(1, 125)
  ws.setColumnWidth(2, 30)
  ws.setColumnWidth(3, 70)
  ws.setColumnWidth(4, 30)
  ws.setColumnWidth(5, 70)
  ws.setColumnWidth(6, 30)
  ws.setColumnWidth(7, 70)
  ws.setColumnWidth(8, 30)
  ws.setColumnWidth(9, 70)
  ws.setColumnWidth(10, 30)
  ws.setColumnWidth(11, 70)
  ws.setColumnWidth(12, 30)
  ws.setColumnWidth(13, 70)
  ws.setColumnWidth(14, 30)
  ws.setColumnWidth(15, 70)
  ws.setColumnWidth(16, 30)
  ws.setColumnWidth(17, 70)
  ws.setColumnWidth(18, 30)
  ws.setColumnWidth(19, 70)
  ws.setColumnWidth(20, 30)
  ws.setColumnWidth(21, 70)
  ws.setColumnWidth(22, 30)
  ws.setColumnWidth(23, 70)
  ws.setColumnWidth(24, 30)
  ws.setColumnWidth(25, 70)
  ws.setColumnWidth(26, 100)

  const dcbStatement = ws
    .getRange("A2:Z34")
    .setBorder(
      true,
      true,
      true,
      true,
      true,
      true,
      "black",
      SpreadsheetApp.BorderStyle.SOLID
    )
  dcbStatement.setFontFamily("Roboto").setVerticalAlignment("middle")
}

function formatDCBAbstract(rows) {
  const ws = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  ).getSheetByName("DCB")
  const rowHeight = (34 * 27) / rows

  ws.setRowHeights(1, rows, rowHeight)

  ws.getRange(`A${rows}:Z${rows}`)
    .setFontWeight("bold")
    .setBackground("lightgrey")

  ws.getRange(`B5:W${rows}`).setNumberFormat("#,###")

  ws.setColumnWidth(1, 120)
  ws.setColumnWidth(2, 30)
  ws.setColumnWidth(3, 90)
  ws.setColumnWidth(4, 30)
  ws.setColumnWidth(5, 90)
  ws.setColumnWidth(6, 30)
  ws.setColumnWidth(7, 90)
  ws.setColumnWidth(8, 30)
  ws.setColumnWidth(9, 90)
  ws.setColumnWidth(10, 30)
  ws.setColumnWidth(11, 90)
  ws.setColumnWidth(12, 30)
  ws.setColumnWidth(13, 90)
  ws.setColumnWidth(14, 30)
  ws.setColumnWidth(15, 90)
  ws.setColumnWidth(16, 30)
  ws.setColumnWidth(17, 90)
  ws.setColumnWidth(18, 30)
  ws.setColumnWidth(19, 90)
  ws.setColumnWidth(20, 30)
  ws.setColumnWidth(21, 90)
  ws.setColumnWidth(22, 30)
  ws.setColumnWidth(23, 90)
  ws.setColumnWidth(24, 40)
  ws.setColumnWidth(25, 40)
  ws.setColumnWidth(26, 10)

  const dcbStatement = ws
    .getRange(`A2:Z${rows}`)
    .setBorder(
      true,
      true,
      true,
      true,
      true,
      true,
      "black",
      SpreadsheetApp.BorderStyle.SOLID
    )
  dcbStatement.setFontFamily("Roboto").setVerticalAlignment("middle")
}

function createDCBBodyPage1(data) {
  const ws = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  ).getSheetByName("DCB")
  let row = 5
  data.map((line) => {
    let bgColor = "white"
    let fontSize = 12
    let fontWeight = "normal"
    switch (line.type) {
      case "item":
        break
      case "category":
        bgColor = "aliceblue"
        fontWeight = "bold"
        break
      case "total":
        bgColor = "lightblue"
        fontSize = 14
        fontWeight = "bold"
        break

      default:
        break
    }
    const lineData = [
      [
        line.itemName,
        line.startDemandNo,
        line.startDemandAmount,
        line.prevDemandNo,
        line.prevDemandAmount,
        line.newDemandNo,
        line.newDemandAmount,
        line.totDemandNo,
        line.totDemandAmount,
        line.courtStayNo,
        line.courtStayAmount,
        line.govtStayNo,
        line.govtStayAmount,
        line.aplAuthStayNo,
        line.aplAuthStayAmount,
        line.totStayNo,
        line.totStayAmount,
        line.reassessNo,
        line.reassessAmount,
        line.writeOffNo,
        line.writeOffAmount,
      ],
    ]
    ws.getRange(row, 1, 1, lineData[0].length)
      .setValues(lineData)
      .setBackground(bgColor)
      .setFontWeight(fontWeight)
      .setFontSize(fontSize)
    row++
  })
  const colWidthArr = [
    200, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110,
    40, 110, 40, 110,
  ]
  colWidthArr.map((col, index) => ws.setColumnWidth(index + 1, col))
  ws.setRowHeights(1, 30, 36)
  ws.getRange(5, 1, row - 6, 1).setBackground("aliceblue")
  ws.getRange(5, 8, row - 6, 2).setBackground("aliceblue")
  ws.getRange(5, 16, row - 6, 2).setBackground("aliceblue")
  ws.getRange(row, 10, 1, 3)
    .merge()
    .setHorizontalAlignment("center")
    .setFontWeight("bold")
    .setValue("Page 1")
    .setFontSize(14)
  ws.getRange(2, 1, row - 2, 21)
    .setBorder(true, true, true, true, true, true)
    .setFontFamily("Roboto")
    .setVerticalAlignment("middle")
  return { row: row, col: 21 }
}
function createDCBBodyPage2(data) {
  const ws = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  ).getSheetByName("DCB")
  let row = 5
  data.map((line) => {
    let bgColor = "white"
    let fontSize = 12
    let fontWeight = "normal"
    switch (line.type) {
      case "item":
        break
      case "category":
        bgColor = "aliceblue"
        fontWeight = "bold"
        break
      case "total":
        bgColor = "lightblue"
        fontSize = 14
        fontWeight = "bold"
        break

      default:
        break
    }
    const lineData = [
      [
        line.itemName,
        line.returnNo,
        line.returnAmount,
        line.totDeductionNo,
        line.totDeductionAmount,
        line.totCollectibleNo,
        line.totCollectibleAmount,
        line.prevCollectionNo,
        line.prevCollectionAmount,
        line.newCollectionNo,
        line.newCollectionAmount,
        line.totCollectionNo,
        line.totCollectionAmount,
        line.totBalanceNo,
        line.totBalanceAmount,
        line.totPercentNo,
        line.totPercentAmount,
        line.remarks,
      ],
    ]
    ws.getRange(row, 1, 1, lineData[0].length)
      .setValues(lineData)
      .setBackground(bgColor)
      .setFontWeight(fontWeight)
      .setFontSize(fontSize)
    row++
  })
  const colWidthArr = [
    200, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110, 40, 110,
    290,
  ]
  colWidthArr.map((col, index) => ws.setColumnWidth(index + 1, col))
  ws.getRange(5, 1, row - 6, 1).setBackground("aliceblue")
  ws.getRange(5, 6, row - 6, 2).setBackground("aliceblue")
  ws.getRange(5, 14, row - 6, 2).setBackground("aliceblue")
  ws.getRange(row, 10, 1, 3)
    .merge()
    .setHorizontalAlignment("center")
    .setFontWeight("bold")
    .setValue("Page 2")
    .setFontSize(14)
  ws.getRange(2, 1, row - 2, 18)
    .setBorder(true, true, true, true, true, true)
    .setFontFamily("Roboto")
    .setVerticalAlignment("middle")
    .setNumberFormat("#,###")
  return { row: row, col: 18 }
}
function createDCBAbstract(data, rows) {
  const ws = SpreadsheetApp.openById(
    "1a06dnv9aEvpn06TQ6AwjZHLQTIIVJ01W2z0gxfs4BJc"
  ).getSheetByName("DCB")
  ws.getRange("A5:Z" + rows + "").setValues(data)
  return true
}

async function printDCBAbstract(data) {
  createDCBheading(`${data.talukName} Taluk`, data.monthName)
  const rows = data.arr.length + 4
  createDCBAbstract(data.arr, rows)
  formatDCBAbstract(rows)
  SpreadsheetApp.flush()
  const returnObj = exportRangeToPDf("A1:Z" + rows + "")
  return returnObj
}

function printDCB(data) {
  let returnObj
  const monthId = data.arr[0].monthId
  console.log(monthId)

  let startHeading = ""
  if (monthId < 21) {
    startHeading = "As on 1 April 23"
  } else if (monthId < 33) {
    startHeading = "As on 1 April 24"
  } else {
    startHeading = "As on 1 April 25"
  }
  switch (data.page) {
    case "1":
      createDCBheadingPage1(
        `${data.villageName} Village`,
        data.monthName,
        startHeading
      )
      createDCBBodyPage1(data.arr)
      SpreadsheetApp.flush()
      returnObj = exportRangeToPDf("A1:U30")
      break
    case "2":
      createDCBheadingPage2(`${data.villageName} Village`, data.monthName)
      rng = createDCBBodyPage2(data.arr)
      SpreadsheetApp.flush()
      returnObj = exportRangeToPDf("A1:R30")
      break
    case "3":
      createDCBheadingPage1(
        `${data.villageName} Taluk`,
        data.monthName,
        startHeading
      )
      createDCBBodyPage1(data.arr)
      SpreadsheetApp.flush()
      returnObj = exportRangeToPDf("A1:U30")
      break
    case "4":
      createDCBheadingPage2(`${data.villageName} Taluk`, data.monthName)
      rng = createDCBBodyPage2(data.arr)
      SpreadsheetApp.flush()
      returnObj = exportRangeToPDf("A1:R30")
      break

    default:
      break
  }

  //   createDCBheading(`${data.villageName} Village`, data.monthName)

  //   formatVillageDCB()

  return returnObj
}
