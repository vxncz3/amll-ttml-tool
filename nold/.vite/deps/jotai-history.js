import {
  atom
} from "./chunk-2RXJ4PMC.js";
import "./chunk-G3PMV62Z.js";

// node_modules/jotai-history/dist/actions.js
var UNDO = Symbol("undo");
var REDO = Symbol("redo");
var RESET = Symbol("reset");

// node_modules/jotai-history/dist/withHistory.js
function withHistory(targetAtom, limit) {
  const refreshAtom = atom(0);
  refreshAtom.debugPrivate = true;
  const historyAtom = {
    read: (get) => (get(refreshAtom), { history: [] }),
    write: (get, set) => {
      get(historyAtom).history.length = 0;
      set(refreshAtom, (v) => v + 1);
    },
    onMount: (reset) => reset,
    debugPrivate: true,
    init: 1
    // dirty hack to bypass hasInitialValue
  };
  return atom((get) => {
    const ref = get(historyAtom);
    return ref.history = [get(targetAtom), ...ref.history].slice(0, limit);
  }, (_, set, action) => {
    if (action === RESET) {
      set(historyAtom);
    }
  });
}

// node_modules/jotai-history/dist/withUndo.js
function withUndo(historyAtom, targetAtom, limit, getArgs) {
  const createRef = () => ({
    index: 0,
    stack: [],
    action: null
  });
  const refreshAtom = atom(0);
  const refAtom = atom(createRef, (get, set, action) => {
    if (action === RESET) {
      void Object.assign(get(refAtom), createRef());
      set(refreshAtom, (v) => v + 1);
    }
  });
  refAtom.onMount = (setAtom) => () => setAtom(RESET);
  refAtom.debugPrivate = true;
  const updateRefAtom = atom((get) => {
    const history = get(historyAtom);
    const ref = get(refAtom);
    get(refreshAtom);
    if (ref.action) {
      ref.action = null;
    } else {
      ref.stack = ref.stack.slice(0, ref.index + 1);
      ref.stack.push(history[0]);
      ref.stack = ref.stack.slice(-limit);
      ref.index = ref.stack.length - 1;
    }
    return { ...ref };
  }, (get, set) => {
    const ref = get(refAtom);
    ref.stack = [get(targetAtom)];
    return () => set(refAtom, RESET);
  });
  updateRefAtom.onMount = (mount) => mount();
  updateRefAtom.debugPrivate = true;
  const canUndoAtom = atom((get) => {
    return get(updateRefAtom).index > 0;
  });
  const canRedoAtom = atom((get) => {
    const ref = get(updateRefAtom);
    return ref.index < ref.stack.length - 1;
  });
  return atom((get) => ({
    canUndo: get(canUndoAtom),
    canRedo: get(canRedoAtom)
  }), (get, set, action) => {
    const ref = get(refAtom);
    const setCurrentState = (index) => {
      if (index in ref.stack) {
        const value = ref.stack[index];
        const args = typeof getArgs === "function" ? getArgs(value) : [value];
        set(targetAtom, ...args);
      }
    };
    if (action === UNDO) {
      if (get(canUndoAtom)) {
        ref.action = UNDO;
        get(historyAtom).shift();
        setCurrentState(--ref.index);
        get(historyAtom).shift();
      }
    } else if (action === REDO) {
      if (get(canRedoAtom)) {
        ref.action = REDO;
        setCurrentState(++ref.index);
      }
    } else if (action === RESET) {
      ref.action = RESET;
      set(refAtom, action);
    } else {
      return;
    }
    set(refreshAtom, (v) => v + 1);
  });
}

// node_modules/jotai-history/dist/withUndoableHistory.js
function withUndoableHistory(targetAtom, limit) {
  const historyAtom = withPrivate(withHistory(targetAtom, limit));
  let undoAtom;
  if (isWritableAtom(targetAtom)) {
    const getArgs = arguments[2] ?? Array.of;
    undoAtom = withPrivate(withUndo(historyAtom, targetAtom, limit, getArgs));
  }
  return atom((get) => Object.assign(get(historyAtom), isWritableAtom(targetAtom) ? get(undoAtom) : {}), (_, set, ...args) => {
    const [action] = args;
    if (action === RESET) {
      set(historyAtom, action);
      if (undoAtom) {
        set(undoAtom, action);
      }
    } else if (!isWritableAtom(targetAtom)) {
      return;
    } else if (action === UNDO || action === REDO) {
      set(undoAtom, action);
    } else {
      return set(targetAtom, ...args);
    }
  });
}
function isWritableAtom(atom2) {
  return "write" in atom2;
}
function withPrivate(atom2) {
  atom2.debugPrivate = true;
  return atom2;
}
export {
  REDO,
  RESET,
  UNDO,
  withUndoableHistory as withHistory
};
//# sourceMappingURL=jotai-history.js.map
