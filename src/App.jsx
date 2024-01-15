import { BrowserRouter, Routes, Route } from "react-router-dom"

import {Home, About, Projects, Contact} from "./pages"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <main className="bg-slate-300/20 h-full">
      <BrowserRouter>
        <Navbar/> 
        {/* Adding Routes */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App