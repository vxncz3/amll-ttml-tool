import {
  useAtomValue,
  useSetAtom
} from "./chunk-SEHTKYLU.js";
import {
  atom
} from "./chunk-2RXJ4PMC.js";
import {
  produce
} from "./chunk-2YTVPVSY.js";
import {
  require_react
} from "./chunk-JYVDFSE2.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/jotai-immer/dist/atomWithImmer.js
function atomWithImmer(initialValue) {
  const anAtom = atom(initialValue, (get, set, fn) => set(anAtom, produce(get(anAtom), typeof fn === "function" ? fn : () => fn)));
  return anAtom;
}

// node_modules/jotai-immer/dist/withImmer.js
var cache1 = /* @__PURE__ */ new WeakMap();
var memo1 = (create, dep1) => (cache1.has(dep1) ? cache1 : cache1.set(dep1, create())).get(dep1);
function withImmer(anAtom) {
  return memo1(() => {
    const derivedAtom = atom((get) => get(anAtom), (get, set, fn) => set(anAtom, produce(get(anAtom), typeof fn === "function" ? fn : () => fn)));
    return derivedAtom;
  }, anAtom);
}

// node_modules/jotai-immer/dist/useSetImmerAtom.js
var import_react = __toESM(require_react(), 1);
function useSetImmerAtom(anAtom, options) {
  const setState = useSetAtom(anAtom, options);
  return (0, import_react.useCallback)((fn) => setState(produce(fn)), [setState]);
}

// node_modules/jotai-immer/dist/useImmerAtom.js
function useImmerAtom(anAtom, options) {
  return [useAtomValue(anAtom, options), useSetImmerAtom(anAtom, options)];
}
export {
  atomWithImmer,
  useImmerAtom,
  useSetImmerAtom,
  withImmer
};
//# sourceMappingURL=jotai-immer.js.map
