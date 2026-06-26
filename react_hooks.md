# React Hooks - useEffect

## Component Summary

The `TestHooks` component logs on mount and unmount and fetches data from the JSONPlaceholder API when a button is clicked.

## Reflection

### When should you use useEffect instead of handling logic inside event handlers?

Use effects when the logic needs to run as a side effect of rendering or state changes parallel to an action like syncing with external systems, fetching data on mount, setting up subscriptions, or running cleanup.

### What happens if you don’t provide a dependency array?

The effect runs after every render. That can cause unnecessary work or create infinite loops if the effect updates state.

### How can improper use of useEffect cause performance issues?

Forgetting dependencies can make effects run too often. Heavy work inside effects, like API calls or DOM measurements on every render, slows the app down. Missing cleanup can also leave processes running when no longer in use.
