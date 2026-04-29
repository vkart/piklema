export const hasAncestor = function (el, ancestor) {
  if (!el) return true;
  if (el === window.document.body) return false;
  if (el === ancestor) return true;

  return hasAncestor(el.parentNode, ancestor);
};

export const getAnchorNode = function () {
  const selection = document.getSelection();

  if (!selection.rangeCount) return;

  return selection.anchorNode;
};

export const saveCaretPosition = function (store) {
  const selection = document.getSelection();

  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  store.caret = range.endOffset;
};

export const restoreCaretPosition = function (store, el) {
  const node = el.childNodes[0];
  const isFocused = document.activeElement === el;

  if (!node || !isFocused) return;

  const pos = store.caret;
  const newRange = document.createRange();
  const selection = window.getSelection();

  newRange.setStart(node, node && pos > node.length ? 0 : pos);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);
};

export const renderVNode = function (node) {
  const { type, props, children } = node;

  const content = !children || typeof children === 'string'
    ? children || ''
    : children.map(renderVNode).join('');

  const attrs = [''];

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      attrs.push(`${key}="${value}"`);
    }
  }

  const tag = type;

  return `<${tag}${attrs.join(' ')}>${content}</${tag}>`;
};

export const getNodesFromSelection = function (selection) {
  if (!selection) return [];

  const range = selection.getRangeAt(0);

  if (!range) return [];

  return getSelectedNodes(range);

  function iterateWalker (walker) {
    return {
      [Symbol.iterator] () {
        return this;
      },

      next () {
        const value = walker.nextNode();

        return { value, done: !value };
      }
    };
  }

  function getSelectedNodes (range) {
    const walker = document.createTreeWalker(
      range.commonAncestorContainer.parentElement,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode (node) {
          return range.intersectsNode(node)
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT;
        }
      }
    );

    return [...iterateWalker(walker)];
  }
};

export const restoreSelection = function ({
  startNode,
  endNode,
  start,
  end
}) {
  const selection = document.getSelection();
  const range = document.createRange();

  range.setStart(startNode, start);
  range.setEnd(endNode, end);

  selection.removeAllRanges();
  selection.addRange(range);
};
