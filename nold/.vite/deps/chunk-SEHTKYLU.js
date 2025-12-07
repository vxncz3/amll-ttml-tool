import {
  createStore,
  getDefaultStore,
  registerAbortHandler
} from "./chunk-2RXJ4PMC.js";
import {
  require_react
} from "./chunk-JYVDFSE2.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/jotai/esm/react.mjs
var import_react = __toESM(require_react(), 1);
var StoreContext = (0, import_react.createContext)(
  void 0
);
function useStore(options) {
  const store = (0, import_react.useContext)(StoreContext);
  return (options == null ? void 0 : options.store) || store || getDefaultStore();
}
function Provider({
  children,
  store
}) {
  const storeRef = (0, import_react.useRef)(null);
  if (store) {
    return (0, import_react.createElement)(StoreContext.Provider, { value: store }, children);
  }
  if (storeRef.current === null) {
    storeRef.current = createStore();
  }
  return (0, import_react.createElement)(
    StoreContext.Provider,
    {
      // TODO should we use useState instead?
      // eslint-disable-next-line react-hooks/refs
      value: storeRef.current
    },
    children
  );
}
var isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
var attachPromiseStatus = (promise) => {
  if (!promise.status) {
    promise.status = "pending";
    promise.then(
      (v) => {
        promise.status = "fulfilled";
        promise.value = v;
      },
      (e) => {
        promise.status = "rejected";
        promise.reason = e;
      }
    );
  }
};
var use = import_react.default.use || // A shim for older React versions
((promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    attachPromiseStatus(promise);
    throw promise;
  }
});
var continuablePromiseMap = /* @__PURE__ */ new WeakMap();
var createContinuablePromise = (promise, getValue) => {
  let continuablePromise = continuablePromiseMap.get(promise);
  if (!continuablePromise) {
    continuablePromise = new Promise((resolve, reject) => {
      let curr = promise;
      const onFulfilled = (me) => (v) => {
        if (curr === me) {
          resolve(v);
        }
      };
      const onRejected = (me) => (e) => {
        if (curr === me) {
          reject(e);
        }
      };
      const onAbort = () => {
        try {
          const nextValue = getValue();
          if (isPromiseLike(nextValue)) {
            continuablePromiseMap.set(nextValue, continuablePromise);
            curr = nextValue;
            nextValue.then(onFulfilled(nextValue), onRejected(nextValue));
            registerAbortHandler(nextValue, onAbort);
          } else {
            resolve(nextValue);
          }
        } catch (e) {
          reject(e);
        }
      };
      promise.then(onFulfilled(promise), onRejected(promise));
      registerAbortHandler(promise, onAbort);
    });
    continuablePromiseMap.set(promise, continuablePromise);
  }
  return continuablePromise;
};
function useAtomValue(atom, options) {
  const { delay, unstable_promiseStatus: promiseStatus = !import_react.default.use } = options || {};
  const store = useStore(options);
  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = (0, import_react.useReducer)(
    (prev) => {
      const nextValue = store.get(atom);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom) {
        return prev;
      }
      return [nextValue, store, atom];
    },
    void 0,
    () => [store.get(atom), store, atom]
  );
  let value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom) {
    rerender();
    value = store.get(atom);
  }
  (0, import_react.useEffect)(() => {
    const unsub = store.sub(atom, () => {
      if (promiseStatus) {
        try {
          const value2 = store.get(atom);
          if (isPromiseLike(value2)) {
            attachPromiseStatus(
              createContinuablePromise(value2, () => store.get(atom))
            );
          }
        } catch (e) {
        }
      }
      if (typeof delay === "number") {
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom, delay, promiseStatus]);
  (0, import_react.useDebugValue)(value);
  if (isPromiseLike(value)) {
    const promise = createContinuablePromise(value, () => store.get(atom));
    if (promiseStatus) {
      attachPromiseStatus(promise);
    }
    return use(promise);
  }
  return value;
}
function useSetAtom(atom, options) {
  const store = useStore(options);
  const setAtom = (0, import_react.useCallback)(
    (...args) => {
      if ((import.meta.env ? import.meta.env.MODE : void 0) !== "production" && !("write" in atom)) {
        throw new Error("not writable atom");
      }
      return store.set(atom, ...args);
    },
    [store, atom]
  );
  return setAtom;
}
function useAtom(atom, options) {
  return [
    useAtomValue(atom, options),
    // We do wrong type assertion here, which results in throwing an error.
    useSetAtom(atom, options)
  ];
}

export {
  useStore,
  Provider,
  useAtomValue,
  useSetAtom,
  useAtom
};
//# sourceMappingURL=chunk-SEHTKYLU.js.map
