let counter = 5

const p1 = document.createElement("p")
const p2 = document.createElement("p")

p1.textContent = `Counter: ${counter}`
p2.textContent = `Twice Counter: ${counter * 2}`

const printButton = document.createElement("button")
const incrementButton = document.createElement("button")
const decrementButton = document.createElement("button")

printButton.textContent = "Print"
incrementButton.textContent = "Increment"
decrementButton.textContent = "Decrement"

printButton.addEventListener("click", () => console.log(counter))

incrementButton.addEventListener("click", () => {
  counter += 1
  p1.textContent = `Counter: ${counter}`
  p2.textContent = `Twice Counter: ${counter * 2}`
})

decrementButton.addEventListener("click", () => {
  counter -= 1
  p1.textContent = `Counter: ${counter}`
  p2.textContent = `Twice Counter: ${counter * 2}`
})