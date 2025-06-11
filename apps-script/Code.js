function doGet() {
  const htmlOutput = HtmlService.createTemplateFromFile("index")
  return htmlOutput
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
}
