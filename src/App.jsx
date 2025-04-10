import { useState } from 'react'
import './App.css'
import HomePage from './page/HomePage'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import TopicPage from "./page/TopicPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/topics/:id",
    element: <TopicPage/>,
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
