console.log("[main.js]")

import dom from "/lib/dom.js"

const { add, tags, state } = dom
const { div, h1, a } = tags

const COLORS = {
  darkGrey: "rgb(30, 30, 30)",
  lightGrey: "rgb(70, 70, 70)",
}

import { ROOT, Dir, File } from "/pkg/filetree.js"

document.body.style.backgroundColor = COLORS.darkGrey
document.body.style.color = "white"

function DirView (dir, changeDir) {
  return a({ class: "dir", style: { display: "inline-block", marginLeft: "40px", marginBottom: "40px" },
    onclick: changeDir },
      div({ style: {
      backgroundColor: "rgb(100, 200, 250)",
      display: "inline-block",
      padding: "40px 60px",
      borderRadius: "10px",
      boxShadow: "inset 0px -6px 20px 10px rgb(40, 170, 220), 0px -8px rgb(10, 140, 200)",
    } }),
      div({ style: { padding: "6px" }}, dir.name),
  )
}

function DirHeader (dir) {
  return div({ class: "dir-header", style: {
    marginBottom: "50px",
    padding: "10px",
  } },
    HeaderBtn("<"),
    HeaderBtn(">"),
    h1({ style: { fontSize: "30px", fontWeight: 400, display: "inline-block", margin: 0 }}, dir.name),
    HeaderBtn("+", { float: "right", marginRight: 0 }),
  )
}

function HeaderBtn (icon, styles) {
  return a({
    style: { 
      fontSize: "30px",
      fontWeight: 700,
      display: "inline-block",
      backgroundColor: COLORS.lightGrey,
      padding: "4px 10px",
      borderRadius: "4px",
      opacity: 0.7,
      marginRight: "12px",
       ...styles
    }
  }, icon)
}

function FileView (file) {
  return div({ class: "file", style: { display: "inline-block", marginLeft: "40px", marginBottom: "40px" }},
      div({ style: {
      backgroundColor: "white",
      display: "inline-block",
      padding: "60px 40px",
      borderRadius: "4px",
    } }),
      div({ style: { paddingTop: "6px" }}, file.name),
  )
}

const DirState = state(ROOT)

function DirContainerView () {
  console.log("rendering")
  function changeDir (dir) {
    DirState.val = dir
    console.log(Dir)
  }
  return div({ class: "dir-view"},
    DirHeader(DirState.val),
    div({ class: "Dirs" },
      ...DirState.val.children.map(node => (node instanceof Dir) ? DirView(node, () => changeDir(node)): FileView(node) )
    )
  )
}

add(document.body, DirContainerView())