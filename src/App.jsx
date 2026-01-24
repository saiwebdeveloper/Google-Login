import { Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Login from "./Login";
import Home from "./Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Vercel Speed Insights – global */}
      <SpeedInsights />
    </>
  );
}

export default App;

