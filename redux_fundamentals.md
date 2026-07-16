# Redux Fundamentals

## What are the benefits of using selectors instead of directly accessing state?

By using selectors, rather than reaching straight into the Redux store's state, you create a clear separation between your store's shape and your components, making the data and systems more maintainable. Another benefit is when a component doesn't know the exact state shape, it doesn't affect it. Meaning if you want to change the state across the app, you only need to update the selector and not the entire app's references. So your selectors can be reused, the components are simpler, unit testing is easy, and if you use Redux Toolkit's createSelector, the selectors will be memoized to optimize performance.
