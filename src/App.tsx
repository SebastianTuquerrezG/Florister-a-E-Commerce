import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import Home from './pages/home'
import Footer from './components/footer'
import FloatingButtons from './components/floatingButtons'
import CatalogPage from './pages/catFlowers/CatalogFlowers'
import CatalogPlants from './pages/catPlants/CatalogPlants'
import ServicesPage from './pages/catServices/ServicesPage'
import OurStoryPage from './pages/ourStory/OurStoryPage'
import BlogPage from './pages/blog/BlogPage'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishListContext'
import CartPage from './pages/cart/CartPage'
import WishlistPage from './pages/wishlistPage/WishListPage'

function App() {
  return (
    <>
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Header />
          <Routes>
            <Route path="/"                  element={<Home />} />
            <Route path="/catalogo"          element={<CatalogPage />} />
            <Route path="/catalogo-plantas"  element={<CatalogPlants />} />
            <Route path="/servicios"         element={<ServicesPage />} />
            <Route path="/blog"              element={<BlogPage />} />
            <Route path="/nuestra-historia"  element={<OurStoryPage />} />
            <Route path="/carrito"           element={<CartPage />} />
            <Route path="/favoritos"         element={<WishlistPage />} />
          </Routes>
          <Footer />
          <FloatingButtons />
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
    </>
  )
}

export default App
