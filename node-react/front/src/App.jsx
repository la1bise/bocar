
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Articles from './pages/Articles'
import AddArticle from './pages/AddArticle'
import AddProduct from './pages/AddProduct'
import Products from './pages/products'
import OneArticle from './pages/OneArticle'
import OneProduct from './pages/OneProduct'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivateRoute from './privateRoute/PrivateRoute'
function App() {

  return(
  

   <Routes>
    <Route path='/' element={<Home />}/>

    <Route path='/se-connecter' element={<Login/>}/>
    <Route path="/inscription" element={<Register />} />
    
    <Route path='/article/:id' element={<OneArticle/>}/>
    <Route path='/articles' element={<Articles/>}/>
    
    <Route path='/produit' element={<Products/>}/>
    <Route path='/produit/:id' element={<OneProduct/>}/>
    


    {/* Cette page n'est pas accesible à une personne non connectée */}
    <Route path='/' element={<PrivateRoute roles={["admin", "user"]}/>}>
     
    </Route>

    {/* Ces pages ne sont  disponibles que pour les admins */}
    <Route path='/' element={<PrivateRoute roles={["admin"]}/>}>
      <Route path='/creer-article' element={<AddArticle/>}/>
      <Route path='/ajouter-produit' element={<AddProduct/>}/>
    </Route>


  </Routes>
  
  )
}

export default App
