import { Navigate, Route, Routes } from "react-router-dom"
import Player from "./components/Player"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Library from "./pages/Library"
import Playlists from "./pages/Playlists"
import ProtectedRoute from "./components/ProtectedRoute"
import Header from "./components/Header"
import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"


function App() {

  const { user } = useContext(AuthContext);

  return (
    <main className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/library" element={<ProtectedRoute element={<Library />} />} />
        <Route path="/playlists" element={<ProtectedRoute element={<Playlists />} />} />
      </Routes>
      {user && <Player />}
    </main>
  )
}

export default App
