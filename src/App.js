import './App.css';
import Header from './Components/common/header';
import Home from './Pages/Home'
import {Routes,Route} from 'react-router-dom'
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Contact from './Pages/Contact';
import Spinner from './Components/common/spinner';
import Footer from './Components/common/Footer';
const App = () => {

  return (
    <div className='d-flex flex-column' >
      <div className=''>
        <Header />
      </div>
      <Spinner/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <div>
        <Footer/>
      </div>
    </div>
  )
}



export default App;
