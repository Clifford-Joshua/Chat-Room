import { Error, ChatRoom, ForgotPassword, Login, SignUp } from "./Pages/main";
import ProtectRoute from "./utils/ProtectRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ProtectRoute>
              <ChatRoom />
            </ProtectRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotten-password" element={<ForgotPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
