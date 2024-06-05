import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Signin from "./Signin";
import Dashboard from "./Dashboard";
import SendMoney from "./SendMoney";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
