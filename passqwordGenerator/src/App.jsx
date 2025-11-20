// Import necessary hooks from React.
// useState: For managing state in the component.
// useCallback: For memoizing functions to prevent unnecessary re-creations.
// useEffect: For handling side effects, like re-running logic when state changes.
// useRef: For creating a reference to a DOM element.
import { useState,useCallback,useEffect,useRef } from 'react'


function App() {
  // State for the desired password length, initialized to 0.
  const [length,setLength]=useState(0);
  // State to determine if numbers should be included in the password, initialized to false.
  const [numberAllowed,setNumberAllowed]= useState(false);
  // State to determine if special characters should be included, initialized to false.
  const [charAllowed,setCharAllowed] = useState(false);
  // State to hold the generated password string.
  const [password,setPassword] = useState("");

  // useRef hook to get a reference to the password input element for the copy functionality.
  const passwordRef = useRef(null);

  // useCallback memoizes the password generation function.
  // It only re-creates the function if 'length', 'numberAllowed', or 'charAllowed' dependencies change.
  const passwordGenerator= useCallback(()=>{
    let pass=""
     let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    // If numberAllowed is true, add numbers to the character set.
    if (numberAllowed) str += "0123456789"
    // If charAllowed is true, add special characters to the character set.
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    // Loop to generate the password of the specified length.
    for(let i=1;i<=length;i++){
      // Pick a random character from the 'str' string.
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char)
    }
    // Update the password state with the newly generated password.
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  // useCallback memoizes the copy function.
  // It only re-creates if the 'password' dependency changes.
const copyPasswordToCLipboard= useCallback(() =>{
  // Select the text in the password input field to give visual feedback.
  passwordRef.current?.select();
  // Set the selection range (for mobile devices).
  passwordRef.current?.setSelectionRange(0,999);
  // Use the Clipboard API to copy the password text.
  window.navigator.clipboard.writeText(password);
},[password])

 // useEffect hook to re-generate the password whenever the dependencies change.
 // This makes the password update automatically when the user changes the length or checkboxes.
 useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
    {/* Main container for the password generator UI */}
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className='text-white text-center my-3'>Password Generator</h1>
      {/* Display field for the generated password and the copy button */}
      <div  className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          // Attach the ref to the input element.
          ref={passwordRef}
          />
          {/* Button to trigger the copy-to-clipboard function */}
          <button onClick={copyPasswordToCLipboard}
           className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy           
          </button>
      </div>
      {/* Container for the control inputs (slider and checkboxes) */}
      <div className='flex text-sm gap-x-2'>
          {/* Length slider control */}
          <div className='flex items-center gap-x-1'>
            <input type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              // Update the 'length' state when the slider value changes.
              onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Lengt: {length}</label>
          </div>
          {/* Checkbox for including numbers */}
          <div className='flex items-center gap-x-1'>
         <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          // Toggle the 'numberAllowed' state when the checkbox is clicked.
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
             <label htmlFor="numberInput">Numbers</label>
          </div>
           {/* Checkbox for including special characters */}
           <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              // Toggle the 'charAllowed' state when the checkbox is clicked.
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
