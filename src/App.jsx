import { useState } from 'react'
import './App.css'
import HomePage from './page/HomePage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';




const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: <SignUpPage />,
  },
]);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
