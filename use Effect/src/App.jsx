import { useState,useEffect } from 'react'


function App() {
 const [count,setCount] = useState(0);
// const [calculation,setCalculation]= useState(0);
  const [calculation, setCalculation] = useState(0);

  // The useEffect hook allows you to perform side effects in function components.
  // Side effects can include data fetching, subscriptions, or manually changing the DOM.

  // --- Example 1: useEffect runs on every render ---
  // If you don't provide a dependency array, the effect will run after every single render.
  // In this commented-out example, it would create an infinite loop.
  // 1. The component renders.
  // 2. useEffect runs, setting a timeout to update `count`.
  // 3. After 1 second, `count` is updated.
  // 4. Updating state causes a re-render, which triggers useEffect again (back to step 2).
  /*
  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  }); // No dependency array
  */

  // --- Example 2: useEffect runs only once ---
  // By providing an empty dependency array `[]`, you tell React to run the effect only once, after the initial render.
  // This is useful for one-time setup, like fetching initial data or setting up a timer that doesn't depend on any props or state.
  // The function returned from useEffect is a "cleanup" function. React runs it when the component unmounts to prevent memory leaks.
  /*
   useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    // This cleanup function will run when the component is removed from the UI.
    // It clears the timeout, preventing the state update from trying to run on an unmounted component.
    return () => clearTimeout(timer);
  }, []); // Empty dependency array means this effect runs only once on mount.
  */

  // --- Example 3: useEffect runs when a dependency changes (The current active example) ---
  // This is the most common use case. The effect will run after the initial render
  // and then re-run *only if* the values in the dependency array have changed between renders.
  useEffect(() => {
    // This effect's job is to update the `calculation` state whenever the `count` state changes.
    setCalculation(() => count * 2);

    // Note: The logic `let timer = setCalculation(...)` and `clearTimeout(timer)` in your original code
    // was not quite right. `setCalculation` doesn't return a timer ID.
    // For a simple calculation like this, a cleanup function isn't necessary.
    // A cleanup function would be needed if you were setting up something that needs to be torn down,
    // like a subscription or a timer.
  }, [count]); // <-- The dependency array. This effect re-runs whenever `count` changes.

  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={()=> setCount((c)=> c+1)}>+</button>
       <p>Calculation: {calculation}</p>
    </>
  )
}

export default App;
