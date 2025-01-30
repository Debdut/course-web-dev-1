export class FileNode {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
  }
}

export class File extends FileNode {
  constructor(name, parent, content = "") {
    super(name, parent)
    this.content = content
  }
}

export class Dir {
  constructor(name, parent) {
    this.name = name
    this.parent = parent
    this.children = []
  }

  add(...nodes) {
    for (const node of nodes) {
      this.children.push(node)
      node.parent = this
    }
  }
}

export const ROOT = new Dir("Home")
ROOT.add(
  new Dir("Applications", ROOT),
  new Dir("Desktop", ROOT),
  new Dir("Documents", ROOT),
  new Dir("Downloads", ROOT),
  new File("info.txt", ROOT, ""),
  new File("README.md", ROOT, "# Hello World\n\nThis is a markdown file."),

  new Dir("Public", ROOT),
  new Dir("Temp", ROOT),
)
