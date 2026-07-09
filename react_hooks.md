# React Hooks 

## Hook - useEffect

### Component Summary

The `TestHooks` component logs on mount and unmount and fetches data from the JSONPlaceholder API when a button is clicked.

### Reflection

#### When should you use useEffect instead of handling logic inside event handlers?

Use effects when the logic needs to run as a side effect of rendering or state changes parallel to an action like syncing with external systems, fetching data on mount, setting up subscriptions, or running cleanup.

#### What happens if you don’t provide a dependency array?

The effect runs after every render. That can cause unnecessary work or create infinite loops if the effect updates state.

#### How can improper use of useEffect cause performance issues?

Forgetting dependencies can make effects run too often. Heavy work inside effects, like API calls or DOM measurements on every render, slows the app down. Missing cleanup can also leave processes running when no longer in use.

## Hook - useCallback

### What issue does useCallback address?

`useCallback` addresses the issue of unnecessary child component re-renders when the component is updated. In React, any local function defined within a component is recreated and thus provided with a different memory address during a render. When such a function is provided as a prop to a child component, the child will be re-rendered if the new memory address of the prop is not equivalent to the memory address it had during the previous render. `useCallback` returns the memoized version of a callback that only changes if a value from its dependency array changed. This creates a stable reference to the callback function between renders. In the event that the values within the dependency array do not change, the child component's props will retain their previous memory address, eliminating unnecessary re-renders.

### In what way is useCallback different from useMemo?

Both of these hooks are utilized to memoize values in React and increase performance. However, a key difference is what gets stored in memory. `useMemo` caches the result of a function call. This is useful for optimizing expensive calculations by not recalculating the value. On the other hand `useCallback` stops parent component re-renders from creating new handler props that force memoized children to re-render by creating a cached function reference.

### Under which conditions would useCallback not be useful?

`useCallback` is not required if you do not pass this function into an optimized child component (React.memo) or use the function as a dependency array to another hook. In a situation where you just need to provide a function as an event handler for a simple element inside the component, creating a new function on each render is a fairly costless task and won't hurt performance in any way. However, using `useCallback` unnecessarily may reduce performance since the hook adds overhead. Specifically, React has to keep track of the array of dependencies given and check their values for equality on each render. Because `useCallback` comes with additional complexity, it should be used only in the specific case that you identify as re-creating functions with new references on every render.
