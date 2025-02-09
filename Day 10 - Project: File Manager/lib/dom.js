import {h, render} from 'preact'

export const tags = new Proxy(
  {},
  {
    get(_, tag) {
      return function (...args) {
        let children = []
        let attributeMap = {}

        for (let i = 0; i < args.length; i++) {

          if (typeof args[i] === "object") {
            if (args[i].hasOwnProperty("props")) {
              children.push(args[i])
            } else {
              Object.assign(attributeMap, args[i])
            }
          } else if (typeof args[i] === "string") {
            children.push(args[i])
          }
        }

        return h(tag, attributeMap, children)
      }
    },
  },
)