class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  html (string) {
  //   if (str !== undefined) {
  //     for (let i = 0; i < this.nodes.length; i++) {
  //       this.nodes[i].innerHTML = str;
  //     }
  //   } else {
  //     return this.nodes[0].innerHTML;
  //   }
  // }
    if (string !== undefined) {
      return this.nodes.map(node => {
        return (
          node.innerHTML = string
        );
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty () {
    return this.nodes.map(node => {
      return (
        node.innerHTML = ""
      );
    });
  }

  append (args) {
      if (args instanceof HTMLElement) {
          // pull the outerHTML and call again
          this.append(args.outerHTML);
        }

      if (typeof args === "string") {
          this.nodes.forEach(node => {
          return (
            node.innerHTML += args
          );
        });
      } else if (args instanceof DOMNodeCollection) {
        return this.nodes.map(node => {
          args.forEach(arg => {
            return (
              node.appendChild(arg.cloneNode(true))
            );
          });
        });
      }
    }

  find (selector) {
    let nodes = [];

    this.nodes.forEach(node => {
      const nodeList = node.querySelectorAll(selector);
      nodes.push(nodeList);
    });

    return new DOMNodeCollection(nodes);
  }

  remove () {
    this.empty();
    this.nodes = [];
  }

  attr(key, value) {
    if (typeof value === 'string') {
      this.nodes.forEach(node => node.setAttribute(key, value));
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(classNames) {
    const namesArr = classNames.split(" ");
    this.nodes.forEach(node => {
      namesArr.forEach(name => {
        node.classList.add(name);
      });
    });
  }

  removeClass(classNames) {
    const namesArr = classNames.split(" ");
    this.nodes.forEach(node => {
      namesArr.forEach(name => {
        node.classList.remove(name);
      });
    });
  }

  children () {
    let nodeArr = [];

    this.nodes.forEach(node => {
      nodeArr.push(node.children);
    });
    return (
      new DOMNodeCollection(nodeArr)
    );
  }

  parent() {
    const parentNodes = [];
    this.nodes.forEach(node => {
      parentNodes.push(node.parentElement);
    });
    return (
      new DOMNodeCollection(parentNodes)
    );
  }

}

export default DOMNodeCollection;
