/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__ = __webpack_require__(1);


const $j = (el) => {
  if (el instanceof HTMLElement) {
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */]([el]);
  } else if (typeof el === 'string'){
    const element = document.querySelectorAll(el);
    const elArray = Array.from(element);
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection__["a" /* default */](elArray);
  }

};

window.$j = $j;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// PICKUP AT PHASE 2!!!

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

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ })
/******/ ]);