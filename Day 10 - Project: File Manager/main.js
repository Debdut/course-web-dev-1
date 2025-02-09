console.log("[main.js]")

import { h, render } from "preact"
import { tags } from "/lib/dom.js"
import { useState } from "preact/hooks"

const { div, h1, a } = tags

const COLORS = {
  darkGrey: "rgb(30, 30, 30)",
  lightGrey: "rgb(70, 70, 70)",
}

import { ROOT, Dir, File } from "/pkg/filetree.js"

document.body.style.backgroundColor = COLORS.darkGrey
document.body.style.color = "white"

function DirView (dir, changeDir) {
  return a({ class: "dir", style: { display: "inline-block", marginLeft: "40px", marginBottom: "40px" }, onClick: changeDir},
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

function DirHeader (dir, nextDir, back, forward) {
  const isBackDisabled = dir === ROOT
  const isForwardDisabled = nextDir === null

  return div({ class: "dir-header", style: {
    marginBottom: "50px",
    padding: "10px",
  } },
    HeaderBtn("<",
      { opacity: isBackDisabled? .7: 1 },
      back
    ),
    HeaderBtn(">",
      { opacity: isForwardDisabled? .7: 1},
      forward
    ),
    h1({
        style: { 
          fontSize: "30px", 
          fontWeight: 400, 
          display: "inline-block", 
          margin: 0 
        }
      }, 
      dir.name
    ),
    HeaderBtn("+", { float: "right", marginRight: 0 }),
  )
}

function HeaderBtn (icon, styles, onClick) {
  return a({
    style: { 
      fontSize: "30px",
      fontWeight: 700,
      display: "inline-block",
      backgroundColor: COLORS.lightGrey,
      padding: "4px 10px",
      borderRadius: "4px",
      marginRight: "12px",
       ...styles
    },
    onClick: onClick,
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

function DirContainerView () {
  const [dir, setDir] = useState(ROOT)
  const [nextIntermediateDir, setNextIntermediateDir] = useState(null)
  const [nextDir, setNextDir] = useState(null)

  function changeDir (dir) {
    setDir(dir)
    setNextIntermediateDir(dir)
  }

  function back() {
    setDir(dir.parent)
    setNextDir(nextIntermediateDir)
  }

  function forward() {
    setDir(nextDir)
    setNextIntermediateDir(nextDir)
    setNextDir(null)
  }

  return div({ class: "dir-view"},
    DirHeader(dir, nextDir, back, forward),
    div({ class: "Dirs" },
      ...dir.children.map(node => (node instanceof Dir)
       ? DirView(node, () => changeDir(node))
       : FileView(node) )
    )
  )
}

render(h(DirContainerView), document.body)
