import dom from "/lib/dom.js"

const { add, state, tags } = dom
const { div, input, span, button } = tags

let num1 = state(0)
let num2 = state(0)

function Sum() {
  return div(
    input({ type: "number", oninput: e => num1.val = Number(e.target.value), value: num1.val }),
    span("+"),
    input({ type: "number", oninput: e => num2.val = Number(e.target.value), value: num2.val }),
    span(`= ${num1.val + num2.val}`)
  )
}

add(document.body, Sum)