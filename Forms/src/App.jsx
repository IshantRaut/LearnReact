import { useState } from 'react'


function App() { // Main functional component for the application
  // State for a single input field (name)
  const [name, setName] = useState("");

  // State for a textarea field (mytxt)
  const [mytxt, setMytxt] = useState("");

  // State for a select dropdown (car)
  const [car, setMyCar] = useState("Ford");

  // State for an object containing multiple input fields (firstname, lastname)
  const [input, setInput] = useState({
    firstname: "",
    lastname: ""
  });

  // Event handler for the textarea change
  function handleTextChange(e) {
    setMytxt(e.target.value); // Updates the 'mytxt' state with the current value of the textarea
  }

  // Event handler for the single input field (name) change
  function handleChange(e) {
    setName(e.target.value); // Updates the 'name' state with the current value of the input
  }

  // Event handler for form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevents the default form submission behavior (page reload)
    // In a real application, you would typically send this data to a server or perform other actions.
    // For demonstration, we're logging the 'name' state.
    console.log("Submitted Name:", name);
    console.log("Submitted Textarea:", mytxt);
    console.log("Submitted Car:", car);
    console.log("Submitted Firstname:", input.firstname);
    console.log("Submitted Lastname:", input.lastname);
  }

  // Event handler for the select dropdown change
  function handleSelectChange(e) {
    setMyCar(e.target.value); // Updates the 'car' state with the selected option's value
  }

  // Event handler for input fields within the 'input' state object
  const handleInputChange = (e) => { // Renamed from handlefirstChange for clarity
    const { name, value } = e.target; // Destructure 'name' and 'value' from the event target
    // console.log("Input Name:", name); // Log the name of the input field
    // console.log("Input Value:", value); // Log the current value of the input field

    // Updates the 'input' state.
    // It takes the previous state ('values') and creates a new object.
    // The spread operator (...values) copies all existing properties.
    // [name]: value dynamically sets the property corresponding to the input's 'name' attribute
    // to its current 'value'.
    setInput(values => ({ ...values, [name]: value }));
  }

  return (
    <>
      {/* Form for a single text input */}
      <form onSubmit={handleSubmit}>
        <label>Enter your Name:
          <input type="text"
            value={name} // Controlled component: input value is tied to the 'name' state
            onChange={handleChange} // Updates 'name' state on every change
          />
        </label>
        <p>Current Name: {name}</p>
        <button type="submit">Submit Name</button> {/* Changed to button for better semantics */}
      </form>

      {/* Form for a textarea */}
      <form onSubmit={handleSubmit}>
        <label>Write here:
          <textarea
            value={mytxt} // Controlled component: textarea value is tied to the 'mytxt' state
            onChange={handleTextChange} // Updates 'mytxt' state on every change
          />
        </label>
        <p>Current Textarea Value: {mytxt}</p>
        <button type="submit">Submit Text</button>
      </form>

      {/* Form for a select dropdown */}
      <form onSubmit={handleSubmit}>
        <label>Choose a Car:
          <select value={car} onChange={handleSelectChange}> {/* Controlled component: select value is tied to the 'car' state */}
            <option value="Ford">Ford</option>
            <option value="Volvo">Volvo</option>
            <option value="Fiat">Fiat</option>
          </select>
        </label>
        <p>Selected Car: {car}</p>
        <button type="submit">Submit Car</button>
      </form>

      {/* Form for multiple inputs managed by a single state object */}
      <form onSubmit={handleSubmit}>
        <label>Firstname:
          <input type="text"
            name="firstname" // 'name' attribute matches the key in the 'input' state object
            value={input.firstname} // Controlled component: value tied to input.firstname
            onChange={handleInputChange} // Uses the generic handler for object state
          />
        </label>
        <label>Last Name:
          <input type="text"
            name="lastname" // 'name' attribute matches the key in the 'input' state object
            value={input.lastname} // Controlled component: value tied to input.lastname
            onChange={handleInputChange} // Uses the generic handler for object state
          />
        </label>
        <p>Current Firstname: {input.firstname}</p>
        <p>Current Lastname: {input.lastname}</p>
        <button type="submit">Submit Names</button>
      </form>
    </>
  )
}

export default App

// Explanation of changes and concepts:

// 1.  **Controlled Components:** All form elements (input, textarea, select) are now "controlled components."
//     -   Their `value` attribute is tied to a piece of React state (e.g., `value={name}`).
//     -   Their `onChange` attribute is tied to an event handler (e.g., `onChange={handleChange}`) that updates that state.
//     -   This means React is the "single source of truth" for the form data, making it easier to manage, validate, and manipulate.

// 2.  **`useState` Hook:**
//     -   `const [stateVariable, setStateFunction] = useState(initialValue);`
//     -   Used to declare state variables in functional components.
//     -   `name`, `mytxt`, `car` are individual state variables for simple inputs.
//     -   `input` is an object state variable to manage multiple related inputs (firstname, lastname) more efficiently.

// 3.  **Event Handlers (`handleChange`, `handleTextChange`, `handleSelectChange`, `handleInputChange`):**
//     -   These functions are called whenever the value of their respective form element changes.
//     -   `e.target.value` accesses the current value of the input element that triggered the event.
//     -   `setStateFunction(e.target.value)` updates the state, which in turn re-renders the component with the new value.

// 4.  **`handleSubmit` Function:**
//     -   Attached to the `onSubmit` prop of each `<form>` element.
//     -   `e.preventDefault();` is crucial: It stops the browser's default behavior of reloading the page when a form is submitted.
//     -   The `console.log` statements are for demonstration; in a real app, you'd send this data to an API, update global state, etc.

// 5.  **Managing Multiple Inputs with a Single State Object (`input` state):**
//     -   Instead of creating separate `useState` calls for `firstname` and `lastname`, we use one `input` object.
//     -   The `handleInputChange` function is generic:
//         -   `const { name, value } = e.target;` destructures the `name` and `value` properties directly from the event target.
//         -   `setInput(values => ({ ...values, [name]: value }));`
//             -   `values => (...)` is a functional update to `setInput`, ensuring we get the *latest* state.
//             -   `...values` spreads all existing properties from the previous `input` state.
//             -   `[name]: value` uses computed property names to update only the specific property whose `name` attribute matches. This makes the handler reusable for any input that's part of the `input` state object.

// 6.  **Semantic HTML:**
//     -   Changed `<input type="submit"/>` to `<button type="submit">...</button>` for better accessibility and styling flexibility.
//     -   Added `<label>` elements for all inputs, which is good for accessibility (clicking the label focuses the input).

// 7.  **Clarity and Comments:**
//     -   Added comments to explain the purpose of each state, function, and key line of code.
//     -   Renamed `handlefirstChange` to `handleInputChange` to better reflect its generic purpose.
