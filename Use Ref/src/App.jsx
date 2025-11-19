import { useState,useRef,useEffect } from 'react'


function App() {
  const [inputValue,setInputValue] = useState("");
  const count = useRef(0);
 const previousInputValue = useRef("");
  useEffect(()=>{
    count.current= count.current +1 ;
    console.log(count.current);
  })
  useEffect(() => {
    previousInputValue.current = inputValue;
  }, [inputValue]);
  return (
    <>
     <p>Type in the input field:</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
       <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h2>Current Value: {inputValue}</h2>
      <h2>Previous Value: {previousInputValue.current}</h2>
    </>
  )
}

export default App
