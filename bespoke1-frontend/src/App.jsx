import {
  createRoutesFromElements,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Details from "./pages/Details";
import { TokenProvider } from "./context/TokenContext";
import { AuthProvider } from "./context/AuthProvider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<Search />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details" element={<Details />} />
      {/* Info for Route not found: */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Route>
  )
);

function App() {
  return (
    <AuthProvider>
      <TokenProvider>
        <RouterProvider router={router} />
      </TokenProvider>
    </AuthProvider>
  );
}

export default App;
