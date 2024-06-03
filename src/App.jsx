import { useEffect, useState } from "react";
import "./App.css";

function createStore(initStore) {
  let state = initStore;

  const getState = () => state;

  const setState = (newState) => {
    state = newState;

    listeners.forEach((listener) => {
      listener();
    });
  };

  let listeners = new Set();

  const subscribe = (listener) => {
    listeners.add(listener);

    return function () {
      listeners.delete(listener);
    };
  };

  return { getState, setState, subscribe };
}

const {
  getState,
  setState: setStoreState,
  subscribe,
} = createStore({ count: 0 });

function App() {
  return (
    <>
      <Counter1 />
      <Counter2 />
    </>
  );
}

function Counter1() {
  const [state, setState] = useState(getState());
  console.log(state, getState());

  useEffect(() => {
    const unsub = subscribe(() => setState({ count: getState().count + 1 }));

    return () => unsub();
  }, []);

  return (
    <div>
      <h1>Counter 1 - {state.count}</h1>

      <button
        onClick={() => {
          const nextState = getState().count + 1;
          setStoreState({ count: nextState });
        }}
      >
        Increment
      </button>
    </div>
  );
}

function Counter2() {
  const [state, setState] = useState(getState());
  console.log(state, getState());

  useEffect(() => {
    const unsub = subscribe(() => setState({ count: getState().count + 1 }));

    return () => unsub();
  }, []);

  return (
    <div>
      <h1>Counter 1 - {state.count}</h1>

      <button
        onClick={() => {
          const nextState = getState().count + 1;
          setStoreState({ count: nextState });
        }}
      >
        Increment
      </button>
    </div>
  );
}
export default App;
