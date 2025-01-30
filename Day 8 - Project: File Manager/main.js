console.log("[main.js]")

import { tags } from "/lib/dom.js"

const { div, h1, h2, p, span, li, ul } = tags

// document.body.innerHTML = FolderView(["Applications", "Desktop", "Documents", "Downloads", "Public", "Temp"]).toHTML()
// document.body.style.backgroundColor = "rgb(30, 30, 30)"
// document.body.style.padding= "50px"

function Folder (name) {
  return div({ class: "folder"},
      div({ style: {
      backgroundColor: "rgb(100, 200, 250)",
      display: "inline-block",
      padding: "40px 60px",
      borderRadius: "10px",
      boxShadow: "inset 0px -6px 20px 10px rgb(40, 170, 220), 0px -8px rgb(10, 140, 200)",
    } }),
      div(name, { style: { color: "white", padding: "6px" }}),
      { style: { display: "inline-block", margin: "20px" }}
  )
}

function FolderView(folders) {
  return div({ class: "folder-view"},
    ...folders.map(Folder)
  )
}



function TodosApp (todos) {
  return div(
    h1("Todos"),
    ul(
      ...todos.map(TodoItem)
    )
  )
}

function TodoItem (todo) {
  return li(todo)
}

const todos = [
  "Wake up at 7",
  "Go to the gym",
  "Go to office",
  "Go to the market",
  "Go to the party",
  "Go to the restaurant",
  "Go to the cinema",
  "Go to the library",
  "Sleep"
]

document.body.innerHTML = TodosApp(todos).toHTML()
