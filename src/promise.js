/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2022-03-07 10:43:56
 * @version $Id$
 */

let p1 = new Promise((resolve, reject) => {
  console.log("promise1")
  resolve("success")
})
let p2 = p1.then(res => {
  console.log(res)
})

console.log("1", p1)
console.log("2", p2)