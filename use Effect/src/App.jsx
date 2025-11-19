import { useState,useEffect } from 'react'


function App() {
 const [count,setCount] = useState(0);
// const [calculation,setCalculation]= useState(0);

// useEffect(()=>{
//   setTimeout(()=>{
//     setCount((count)=> count+1);
//   },1000)
// });
//  useEffect(() => {
//     let timer = setTimeout(() => {
//       setCount((count) => count + 1);
//     }, 1000);

//     return () => clearTimeout(timer)
//   }, []);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    let timer =setCalculation(() => count * 2);

    return () => clearTimeout(timer)
  }, [count]); // <- add the count variable here
  return (
    <>
      <h1>I have returned {count} times</h1>
      <button onClick={()=> setCount((c)=> c+1)}>+</button>
       <p>Calculation: {calculation}</p>
    </>
  )
}

export default App
