   import React from 'react';

   function HelloWorld({ name }) {
     return React.createElement('h1', { className: 'text-[1em]' }, `Hello, ${name || 'User'}`);
   }

   export default HelloWorld;
