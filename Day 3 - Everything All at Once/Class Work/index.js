const balls = document.querySelectorAll("div.ball")
console.log(balls)

const ball = document.querySelector("div.ball")
console.log(ball)

let pos = { left: 50, top: 50 }

// ball.style = "width: 100px;"

// ball.style.width = "50px"
// ball.style.height = "50px"
// ball.style.top = `${pos.top}px`
// ball.style.left = `${pos.left}px`
// ball.style.opacity = 0.5

// function moveBall() {
//     pos.top += 1
//     pos.left += 1
//     ball.style.top = `${pos.top}px`
//     ball.style.left = `${pos.left}px`
// }

// // moveBall()
// // moveBall()
// // moveBall()
// // moveBall()

// // for (let i = 0; i < 10; i++) {
// //     moveBall()
// // }

// setInterval(moveBall, 1000/60)

// function updatePosition(element, pos) {
//     element.style.top = `${pos.top}px`
//     element.style.left = `${pos.left}px`
// }

// // updatePosition(ball, pos)

// const rectangle = {
//     dim: {
//         height: 200,
//         width: 200,
//     },
//     pos: {
//         top: 50,
//         left: 50
//     }
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

// async function moveIntoRectangle(element, rectangle) {
//     let waitTime = 10
//     let steps = 100
//     let topStepLength = rectangle.dim.height / steps
//     let leftStepLength = rectangle.dim.width / steps

//     // Move to starting position
//     let pos = rectangle.pos
//     updatePosition(element, pos)

//     for (let i = 0; i < steps; i++) {
//         await sleep(waitTime)

//         pos.top += topStepLength
//         updatePosition(element, pos)
//     }

//     for (let i = 0; i < steps; i++) {
//         await sleep(waitTime)

//         pos.left += leftStepLength
//         updatePosition(element, pos)
//     }

//     for (let i = 0; i < steps; i++) {
//         await sleep(waitTime)

//         pos.top -= topStepLength
//         updatePosition(element, pos)
//     }

//     for (let i = 0; i < steps; i++) {
//         await sleep(waitTime)

//         pos.left -= leftStepLength
//         updatePosition(element, pos)
//     }
// }

// async function keepMoving(element) {
//     while (true) {
//         await moveIntoRectangle(element, rectangle)
//     }
// }

// function createBall(height, isBorder, color, pos) {
//     const ball = document.createElement("div")
//     ball.style.height = `${height}px`
//     ball.style.width = ball.style.height
//     if (isBorder) {
//         ball.style.border = "5px solid black"
//     }
//     ball.style.backgroundColor = color
//     ball.style.position = "absolute"
//     ball.style.borderRadius = "50%"

//     updatePosition(ball, pos)

//     document.body.appendChild(ball)
// }

// function createRandomBall(pos) {
//     const height = Math.random() * 250 + 50
//     const isBorder = Math.random() > 0.5
//     const red = Math.random() * 255
//     const green = Math.random() * 255
//     const blue = Math.random() * 255
//     const alpha = 0.3 + Math.random() * 0.4
//     const color = `rgba(${red}, ${green}, ${blue}, ${alpha})`

//     const radius =  height / 2
//     pos.top -= radius
//     pos.left -= radius

//     createBall(height, isBorder, color, pos)
// }

// document.onclick = function (event) {
//     const pos = {
//         top: event.clientY,
//         left: event.clientX
//     }

//     createRandomBall(pos)
// }