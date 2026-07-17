# Redux Fundamentals

## What are the benefits of using selectors instead of directly accessing state?

By using selectors, rather than reaching straight into the Redux store's state, you create a clear separation between your store's shape and your components, making the data and systems more maintainable. Another benefit is when a component doesn't know the exact state shape, it doesn't affect it. Meaning if you want to change the state across the app, you only need to update the selector and not the entire app's references. So your selectors can be reused, the components are simpler, unit testing is easy, and if you use Redux Toolkit's createSelector, the selectors will be memoized to optimize performance.

## When should you use Redux instead of `useState`?

If your application needs to read and write data from components in different places, like those that are not directly connected to each other or are deep in the hierarchy, you should use Redux instead of useState. useState is suitable for managing temporary states, such as changing UI elements or form input values. Trying to use it broadly results in a cluttered situation where data has to traverse multiple levels of independent components. Redux solves this problem elegantly with a dedicated data store. This makes the code much more readable and the structure clearer. If you want to share states predictably in a complex application, Redux is one good state management solution.
