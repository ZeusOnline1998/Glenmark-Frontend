import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Platform from './components/Platform';
import Home from './components/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          {/* <div className='md:flex'>
            <div className='lg:w-96 sticky top-0 md:h-screen'>
            <NavBar />
            </div>
            <div className='md:w-full'>
          <Home /> */}
          <Route path='/' element={<Dashboard />}>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/platform' element={<Platform />}></Route>
          </Route>
          {/* </div> */}
          {/* </div> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
