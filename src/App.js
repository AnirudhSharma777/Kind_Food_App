import './App.css';
import Header from './Components/common/header';
import Home from './Pages/Home'

const App = () => {



  return (
    <div className='d-flex flex-column'>
      <div className='fixed-top bg-light'>
        <Header />
      </div>
      <Home />
    </div>
  )
}



export default App;
