
import './App.css';
import HomePage from './page/HomePage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';
import TopicPage from "./page/TopicPage";
import TeamPage from "./page/TeamPage";



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
  {
    path: "/team",
    element: <TeamPage/>,
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;