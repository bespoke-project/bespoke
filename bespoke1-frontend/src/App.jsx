import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/Mainlayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Profile from "./pages/Profile";


const router =createBrowserRouter(
  createRoutesFromElements(
   <Route path="/" element={<MainLayout/>}>
    <Route index element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/Search" element={<Search/>}/>
    <Route path="/profile" element={<Profile/>}/>
    </Route>
    
  )
)

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
