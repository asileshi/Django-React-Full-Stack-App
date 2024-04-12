import React from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }
        />
      <Route path="/login" element={<Login/>}
      />
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<NotFound/>}>
      </Route>


      </Routes>
    </BrowserRouter>
  
  
  )
}

export default App
