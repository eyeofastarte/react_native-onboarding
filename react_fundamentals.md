# Challenges

I didn't run into any challenges with issue #33

# React Fundamentals

## What is React?

React is a JavaScript library for building user interfaces. Instead of writing separate HTML files, you build segmented UI fragments called components.

### Components

Components are important in React because they let you split the UI into small reusable pieces. Instead of building one big page you can build smaller blocks that are easier to manage, test, and reuse across the app.

### JSX

JSX looks like HTML inside JavaScript. It makes it easier to describe what the UI should look like. Under the hood, it gets converted to regular JavaScript.

### Props

Props are how data gets passed from one component to another. They let you make components flexible and reusable.

### State

State holds information that can change over time. When state changes, React updates the part of the screen that depends on it.

### What happens if we modify state directly?

If we change state directly, React won't know the state changed. The setter function is what tells React to check for changes and update the UI.

## React Router

### What are the advantages of client-side routing?

This benefit of client-side routing with JavaScript in your browser is that subsequent page loads are very fast and the transition between pages is fluid because there are no page reloads. This means that the user gets a smooth user experience that resembles desktop or mobile apps. It is easy to maintain UI states, as page layouts do not flicker as their components stay on top, and page-level states can be maintained across pages. Since the pages no longer get rendered from scratch by the server, this reduces the pressure on the server as it has to serve up the raw data rather than the complete rendered pages.
