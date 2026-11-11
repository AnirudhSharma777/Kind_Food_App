import './App.css';
import {Header} from './Components/common/header';
import Home from './Pages/Home'
import {Routes,Route} from 'react-router-dom'
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import FAQ from './Pages/FAQ';
// import Spinner from './Components/common/spinner';
import Footer from './Components/common/Footer';
const App = () => {

  return (
    <div className='app-shell d-flex flex-column'>
      <Header />
      <main className='app-main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/carts' element={<Cart />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/faq' element={<FAQ />} />
        </Routes>
      </main>
      <div>
        <Footer/>
      </div>
    </div>
  )
}



export default App;
