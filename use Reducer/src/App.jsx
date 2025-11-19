import { useReducer } from 'react'

// useReducer is a hook for managing state, similar to useState.
// It's preferred for complex state logic, where the next state depends on the previous one.
// It follows a pattern similar to Redux, using a reducer function and dispatching actions.

// 1. Define the initial state for the component.
// This is the state your component will have when it first renders.
const initialScore = [
  {
    id: 1,
    score: 0,
    name: "John",
  },
  {
    id: 2,
    score: 0,
    name: "Sally",
  },
];

// 2. Create a "reducer" function.
// This is a pure function that takes two arguments: the current `state` and an `action` object.
// It calculates and returns the *new* state based on the action type.
// It should not modify the original state (immutability).
const reducer = (state, action) => {
  // The `switch` statement is a common way to handle different action types.
  switch (action.type) {
    case "INCREASE":
      // When an "INCREASE" action is dispatched, we need to update the score
      // for the player specified by `action.id`.
      // We use `state.map()` to create a *new* array, ensuring immutability.
      return state.map((player) => {
        // If the player's ID matches the ID from the action...
        if (player.id === action.id) {
          // ...return a *new* player object with the score incremented.
          return { ...player, score: player.score + 1 };
        } else {
          // Otherwise, return the player object unchanged.
          return player;
        }
      });
    default:
      // If the action type doesn't match any case, return the current state without changes.
      return state;
  }
};
function App() {
  // 3. Use the useReducer hook in your component.
  // It takes the reducer function and the initial state as arguments.
  // It returns an array with two elements:
  //  - `score`: The current state (initially `initialScore`).
  //  - `dispatch`: A function you use to send actions to the reducer.
  const [score, dispatch] = useReducer(reducer, initialScore);

 // This function is called when a button is clicked.
 const handleIncrease = (player) => {
    // 4. Dispatch an action.
    // To update the state, you call `dispatch` with an action object.
    // This object must have a `type` property that the reducer can check.
    // You can also include any other data needed to compute the new state (the "payload"), like `id` here.
    dispatch({ type: "INCREASE", id: player.id });
  };
  return (
    <>
      {/* The component renders based on the current `score` state. */}
      {score.map((player) => (
        <div key={player.id}>
          <label>
            <input
              type="button"
              // When clicked, it calls the handler which dispatches the action.
              onClick={() => handleIncrease(player)}
              value={player.name}
            />
            {player.score}
          </label>
        </div>
      ))}
    </>
  );
}


export default App
