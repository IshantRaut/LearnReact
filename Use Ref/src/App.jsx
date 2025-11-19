import { useState,useRef,useEffect } from 'react'

// The useRef hook is a versatile tool in React that serves two main purposes:
// 1. Accessing DOM elements directly (e.g., to focus an input).
// 2. Storing a mutable value that persists across renders without causing a re-render when it's changed.
// This is different from state (useState), where any change triggers a component re-render.

function App() {
  const [inputValue,setInputValue] = useState("");

  // --- Example 1: Using useRef to count renders ---
  // We initialize a ref with a `current` property set to 0.
  // This `count` ref will persist across all renders of the component.
  const count = useRef(0);

  // --- Example 2: Using useRef to track previous state ---
  // Here, we use a ref to store the previous value of the `inputValue` state.
  const previousInputValue = useRef("");

  // This useEffect hook runs after every render because it has no dependency array.
  useEffect(()=>{
    // We increment the `current` property of our ref.
    // IMPORTANT: Modifying a ref's `.current` property does NOT cause the component to re-render.
    // If we used `setCount(count + 1)` with state here, it would create an infinite loop,
    // because each state update would trigger a re-render, which would call useEffect again.
    count.current= count.current +1 ;
    console.log(count.current);
  })

  // This useEffect hook runs only when the `inputValue` state changes.
  useEffect(() => {
    // When `inputValue` is updated, this effect runs.
    // We store the *current* `inputValue` into our ref.
    // Because this happens *after* the render, the JSX below will show the new `inputValue`,
    // but `previousInputValue.current` will still hold the value from *before* this update.
    previousInputValue.current = inputValue;
  }, [inputValue]);

  return (
    <>
     <p>Type in the input field:</p>
      <input
        type="text"
        value={inputValue}
        // Every character typed updates the state, causing a re-render.
        onChange={(e) => setInputValue(e.target.value)}
      />
      {/* This displays the current value of the ref. It only updates on the screen
          because the component is re-rendering due to the `inputValue` state change. */}
      <h1>Render Count: {count.current}</h1>

      {/* The values below demonstrate the "previous vs. current" state tracking. */}
      <h2>Current Value: {inputValue}</h2>
      {/* On each render, this shows the value that the ref was holding from the *previous* render,
          before the `useEffect` hook updated it. */}
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  )
}

export default App
