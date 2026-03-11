import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import Home from './pages/home'
import Footer from './components/footer'
import FloatingButtons from './components/floatingButtons'
import CatalogPage from './pages/catFlowers/CatalogFlowers'
import CatalogPlants from './pages/catPlants/CatalogPlants'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/catalogo"} element={<CatalogPage/>}/>
          <Route path="/catalogo-plantas" element={<CatalogPlants />} />
        </Routes>
        <Footer/>
        <FloatingButtons />
      </BrowserRouter>
    </>
  )
}

export default App
