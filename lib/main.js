import DOMNodeCollection from './dom_node_collection';

const $j = (el) => {
  if (el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  } else if (typeof el === 'string'){
    const element = document.querySelectorAll(el);
    const elArray = Array.from(element);
    return new DOMNodeCollection(elArray);
  }

};

window.$j = $j;
