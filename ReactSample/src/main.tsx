import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
import Profile from './Profile.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Provider } from 'react-redux'
import store from './store';

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="profile" element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
