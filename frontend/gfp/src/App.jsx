import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Principal from "./pages/Principal"
import Login from "./pages/Login"
import { UsuarioProvider } from "./UsuarioConxtext"


export default function App(){
  return(
  <UsuarioProvider>
    <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/*" element={<Principal/>}/>
        </Routes>
    </Router>
  </UsuarioProvider>
        
  
  )
}