import { useState,createContext,useContext} from 'react'


// 1. Create a Context
// createContext() creates a Context object. When React renders a component that subscribes
// to this Context object, it will read the current context value from the closest
// matching Provider above it in the component tree.
// The value passed to createContext (e.g., null or a default value) is only used
// when a component consumes the context without a matching Provider above it.
const UserContext=createContext();

function App() {
  // useState is used here to manage the 'user' state.
  // This 'user' state is what we want to make available to deeply nested components
  // without having to pass it down as props through every level.
  const [user, setUser] = useState("Linus")

  return (
    <>
      {/*
        2. Provide the Context Value
        The UserContext.Provider component is used to provide the 'user' value
        to all components nested within it.
        Any component inside this Provider (Component2, Component3, etc.)
        can now access the 'user' state using the useContext hook.
        The 'value' prop is crucial here; it's the actual data being passed down.
      */}
      <UserContext.Provider value={user}>
        <h1>{`Hello ${user}`}</h1>
        <Component2 />
      </UserContext.Provider>
    </>
  )
}

function Component2(){
  // 3. Consume the Context Value
  // useContext(UserContext) allows this component to read the current value
  // of the UserContext. It will find the closest UserContext.Provider above it
  // in the tree and use its 'value' prop.
  // This eliminates the need for "prop drilling" (passing props through many
  // intermediate components that don't directly use them).
  const user = useContext(UserContext);
  return(
    <>
      <h1>Component 2</h1>
      <p>User from Context: {user}</p> {/* Displaying the user from context */}
      <Component3 />
    </>
  );
}

function Component3(){
  // Component3 also consumes the UserContext.
  // It directly gets the 'user' value from the Provider in App,
  // even though Component2 is an intermediate component.
  const user = useContext(UserContext);
  return(
    <>
      <h1>Component 3</h1>
      <h1>{`Hello ${user}`}</h1>
    </>
  )
}

export default App
