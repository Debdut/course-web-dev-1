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

const Applications = new Dir("Applications", ROOT)
const Desktop = new Dir("Desktop", ROOT)
const Documents = new Dir("Documents", ROOT)
const Downloads = new Dir("Downloads", ROOT)
const Public = new Dir("Public", ROOT)
const Temp = new Dir("Temp", ROOT)

const info = new File("info.txt", ROOT, "This is a plain text file. You can edit it.")
const readme = new File("README.md", ROOT,
`# File Manager
 You're using a web file manager, the files are stored in local storage.

`)

ROOT.add(
  Applications,
  Desktop,
  Documents,
  Downloads,
  Public,
  Temp,
  info,
  readme
)

Applications.add(
  new File("Calculator.app", Applications),
  new File("Email.app", Applications),
  new File("File Manager.app", Applications),
  new File("Text Editor.app", Applications)
)

const Screenshots = new Dir("Screenshots", Desktop)
const Icons = new Dir("Icons", Desktop)

Icons.add(
  new File("icon.png", Icons),
  new File("icon.svg", Icons)
)

Screenshots.add(
  new File("screenshot1.png", Screenshots),
  new File("screenshot2.png", Screenshots),
  new File("screenshot3.png", Screenshots)
)

Desktop.add(
  Screenshots,
  Icons,
  new File("photo.jpg", Desktop),
  new File("resume.pdf", Desktop)
)

const Invoices = new Dir("Invoices", Documents)
const Receipts = new Dir("Receipts", Documents)
const MyDocuments = new Dir("My Documents", Documents)
const Pictures = new Dir("Pictures", Documents)

const InvoiceApple = new Dir("Apple", Invoices)
const InvoiceGoogle = new Dir("Google", Invoices)
const InvoiceMicrosoft = new Dir("Microsoft", Invoices)

InvoiceApple.add(
  new File("invoice1.pdf", InvoiceApple),
  new File("invoice2.pdf", InvoiceApple),
  new File("invoice3.pdf", InvoiceApple)
)

InvoiceGoogle.add(
  new File("invoice1.pdf", InvoiceGoogle)
)

InvoiceMicrosoft.add(
  new File("invoice1.pdf", InvoiceMicrosoft),
  new File("invoice2.pdf", InvoiceMicrosoft)
)

Invoices.add(
  InvoiceApple,
  InvoiceGoogle,
  InvoiceMicrosoft,
  new File("invoice1.pdf", Invoices),
)

Receipts.add(
  new File("receipt1.pdf", Receipts),
  new File("receipt2.pdf", Receipts),
  new File("receipt3.pdf", Receipts)
)

MyDocuments.add(
  new File("passport.pdf", MyDocuments),
  new File("resume.pdf", MyDocuments),
  new File("taxes.pdf", MyDocuments)
)

const MeghalayaTrip = new Dir("Meghalaya Trip", Pictures)
const KeralaTrip = new Dir("Kerala Trip", Pictures)
const GoaTrip = new Dir("Goa Trip", Pictures)

MeghalayaTrip.add(
  new File("photo1.jpg", MeghalayaTrip),
  new File("photo2.jpg", MeghalayaTrip),
  new File("photo3.jpg", MeghalayaTrip)
)

KeralaTrip.add(
  new File("photo1.jpg", KeralaTrip),
  new File("photo2.jpg", KeralaTrip),
  new File("photo3.jpg", KeralaTrip),
  new File("photo4.jpg", KeralaTrip),
  new File("photo5.jpg", KeralaTrip)
)

GoaTrip.add(
  new File("photo1.jpg", GoaTrip),
  new File("photo2.jpg", GoaTrip)
)

Pictures.add(
  MeghalayaTrip,
  KeralaTrip,
  GoaTrip,
  new File("photo1.jpg", Pictures),
  new File("photo2.jpg", Pictures),
  new File("photo3.jpg", Pictures)
)

Documents.add(
  Invoices,
  Receipts,
  MyDocuments,
  Pictures,
  new File("document1.pdf", Documents),
  new File("document2.pdf", Documents)
)

Downloads.add(
  new File("file1.zip", Downloads),
  new File("xyas.png", Downloads),
  new File("design.psd", Downloads)
)