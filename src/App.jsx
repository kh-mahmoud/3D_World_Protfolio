import {Routes,Route} from "react-router-dom"
import { About, Projects,Home, Contact  } from "./pages"
import { Navbar } from "./components"

function App() {

  return (
    <main className="bg-slate-300/20 h-screen">
        <Navbar/>
        <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/contact" element={<Contact/>}/>
        </Routes>
    </main>
  )
}

export default App
