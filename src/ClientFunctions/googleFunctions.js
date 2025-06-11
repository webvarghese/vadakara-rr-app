// export const runGoogleScript = (serverFunction, obj) => {
//   return new Promise((resolve, reject) => {
//     google.script.run
//       .withSuccessHandler((data) => resolve(data))
//       .withFailureHandler((err) => reject(err))
//       [serverFunction](obj)
//   })
// }
export const runGoogleScript = (serverFunction, obj) => {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((data) => resolve(data))
      .withFailureHandler((err) => reject(err))
      [serverFunction](obj)
  })
}
