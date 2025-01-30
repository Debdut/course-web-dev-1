console.log("[main.js]")

import dom from "/lib/dom.js"

const { add, tags } = dom

const { div, h1, h2, p, span, li, ul } = tags

document.body.style.backgroundColor = "rgb(30, 30, 30)"
document.body.style.padding= "50px"

const folders = ["Applications", "Desktop", "Documents", "Downloads", "Public", "Temp"]

function Folder (name) {
  return div({ class: "folder", style: { display: "inline-block", margin: "20px" }},
      div({ style: {
      backgroundColor: "rgb(100, 200, 250)",
      display: "inline-block",
      padding: "40px 60px",
      borderRadius: "10px",
      boxShadow: "inset 0px -6px 20px 10px rgb(40, 170, 220), 0px -8px rgb(10, 140, 200)",
    } }),
      div({ style: { color: "white", padding: "6px" }}, name),
  )
}

function FolderView(folders) {
  return div({ class: "folder-view"},
    ...folders.map(Folder)
  )
}

add(document.body, FolderView(folders))

