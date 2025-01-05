/**
 * @typedef {number | string | boolean } AttributePrimitive
 * @typedef {AttributePrimitive | AttributePrimitive[] | {string: AttributePrimitive}} AttributeValue
 * @typedef {{ string: AttributeValue }} AttributeMap
 */

/**
 * Represents HTML node
 * Subclass of parent class 'Node'
 * Each node can contain tag, an attribute map containing all the style properties, and a list of child nodes.
 */
export class Node {
  /**
   * Creates a new HTML node instance
   * @constructor
   * @param {string} tag - HTML tag.
   * @param {AttributeMap} [attributeMap={}] - Attributes of the HTML tag.
   * @param {Node[]} [children=[]] - List of child nodes.
   */
  constructor(tag, attributeMap = {}, children = []) {
    this.tag = tag;
    this.attributeMap = attributeMap;
    this.children = children;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.parentNode = this;
    }
  }

  /**
   * Appends a child node to this node.
   * @param {Node} node - The child node to append.
   * @returns {void}
   */
  appendChild(node) {
    this.children.push(node);
    node.parentNode = this;
  }

  /**
   * Removes a child node to this node.
   * @param {Node} node - The child node to remove.
   * @returns {void}
   */
  removeChild(node) {
    const index = this.children.indexOf(node);
    if (index > -1) {
      this.children.splice(index, 1);
      node.parentNode = null;
    }
  }

  /**
   * Inserts a child node before a reference node.
   * @param {Node} newNode - The node to insert.
   * @param {Node} referenceNode - The node before which to insert.  If null, appends to end
   * @returns {void}
   * @throws {Error} if referenceNode is not a child of this node
   */
  insertBefore(newNode, referenceNode) {
    if (referenceNode === null) {
      this.appendChild(newNode);
      return;
    }

    const index = this.children.indexOf(referenceNode);
    if (index === -1) {
      throw new Error("Reference node is not a child of this node.");
    }

    this.children.splice(index, 0, newNode);
    newNode.parentNode = this;
  }

  /**
   * Returns the previous sibling of this node, if it exists.
   * @returns {Node|undefined} The previous sibling node or undefined if none exists.
   */
  previousSibling() {
    if (this.parentNode) {
      const siblings = this.parentNode.children;
      const index = siblings.indexOf(this);
      return index > 0 ? siblings[index - 1] : undefined;
    }
    return undefined;
  }

  /**
   * Returns the next sibling of this node, if it exists.
   * @returns {Node|undefined} The next sibling node or undefined if none exists.
   */
  nextSibling() {
    if (this.parentNode) {
      const siblings = this.parentNode.children;
      const index = siblings.indexOf(this);
      return index >= 0 && index < siblings.length - 1
        ? siblings[index + 1]
        : undefined;
    }
    return undefined;
  }

  /**
   * Returns HTML String
   * @param {boolean} [isIndent=false] - Flag to check if the HTML code should be indented
   * @param {number} [level=0] - Indentation level of the HTML code
   * @returns {string} Returns the HTML String of the given node
   */
  toHTML(isIndent = false, level = 0) {
    if (this.tag === "text") {
      return this.attributeMap.content;
    }

    level += 1;
    let indent = "";
    let stringBuilder = `<${this.tag}`;

    const attributes = Object.keys(this.attributeMap);
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      let value = this.attributeMap[attribute];
      stringBuilder += " " + AttrtoString(attribute, value);
    }

    stringBuilder += ">";

    if (isIndent) {
      stringBuilder += "\n";
      for (let i = 0; i < level - 1; i++) {
        indent += "  ";
      }
    }

    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];

      if (isIndent) {
        stringBuilder += indent + "  ";
      }

      stringBuilder += child.toHTML(isIndent, level);

      if (isIndent) {
        stringBuilder += "\n";
      }
    }

    if (isIndent) {
      stringBuilder += indent;
    }

    stringBuilder += `</${this.tag}>`;

    return stringBuilder;
  }

  /**
   * Returns HTML String
   * @returns {string} Returns the HTML String of the given node
   */
  render() {
    this.toHTML(true);
  }
}

/**
 * Returns the camel case for HTML tags concatenated with '-' i.e. DataX is data-x
 * @param {string} str
 * @returns {string} Returns the html tags converted in its camel case
 */
function toCamelCase(str) {
  let stringBuilder = "";
  for (var i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === char.toUpperCase()) {
      stringBuilder += "-";
    }
    stringBuilder += char.toLowerCase();
  }
  return stringBuilder;
}

/**
 * Returns the attributes converted to string
 * @param {string} name - The attribute name
 * @param {AttributePrimitive} value - The attribute value
 * @returns {string}
 */
function AttrtoString(name, value) {
  let stringBuilder = "";
  let updatedName = toCamelCase(name);

  switch (typeof value) {
    case "function":
      updatedName = name.toLowerCase();
      return `${updatedName}="${value.name}()"`;

    case "object":
      const keys = Object.keys(value);

      if (Array.isArray(value)) {
        stringBuilder += value.join(", ");
      } else {
        stringBuilder += `${toCamelCase(keys[0])}: ${value[keys[0]]}`;

        for (let i = 1; i < keys.length; i++) {
          let key = keys[i];
          stringBuilder += `; ${toCamelCase(key)}: ${value[key]}`;
        }
      }

      stringBuilder = `${updatedName}="${stringBuilder}"`;
      return stringBuilder;

    default:
      return `${updatedName}="${value}"`;
  }
}

/**
 * A proxy object that allows creating HTML nodes using tag names as function calls.
 *
 * This proxy intercepts property access on an empty object. When a property (representing an HTML tag name)
 * is accessed, it returns a function. This function takes a variable number of arguments:
 * - `Node` instances: These are added as child nodes to the created HTML node.
 * - `string` values: These are treated as text content and wrapped in a `text` node before being added as children.
 * - `object` values: These are treated as attribute maps and merged to set the attributes of the created HTML node.
 *
 * @example
 * const { div, p } = tags;
 * const myNode = div({ class: 'container' }, p('Hello, world!'));  //creates <div class="container"><p>Hello, world!</p></div>
 *
 */
export const tags = new Proxy(
  {},
  {
    get(_, tag) {
      return function (...args) {
        let children = [];
        let attributeMap = {};

        for (let i = 0; i < args.length; i++) {
          if (args[i] instanceof Node) {
            children.push(args[i]);
          } else if (typeof args[i] === "string") {
            children.push(new Node("text", { content: args[i] }));
          } else if (typeof args[i] === "object") {
            Object.assign(attributeMap, args[i]);
          }
        }

        return new Node(tag, attributeMap, children);
      };
    },
  },
);
