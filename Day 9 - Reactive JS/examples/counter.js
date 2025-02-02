import dom from "/lib/dom.js"

const { add, state, tags } = dom
const { div, p, button } = tags

let counter = state(5)

function printHandler() {
  console.log(counter.val)
}

function incrementHandler() {
  counter.val += 1
}

function decrementHandler() {
  counter.val -= 1
}

function Counter() {
  console.log("Rendering Counter")
  return div(
    p(`Counter: ${counter.val}`),
    p(`Twice Counter: ${counter.val * 2}`),
    button({ onclick: printHandler}, "Print"),
    button({ onclick: incrementHandler}, "Increment"),
    button({ onclick: decrementHandler}, "Decrement")
  )
}

add(document.body, Counter)