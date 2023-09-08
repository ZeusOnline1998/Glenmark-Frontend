import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Home from './components/Home';
import ProductPerformance from './components/ProductPerformance';
import KeywordSuggestions from './components/KeywordSuggestions';

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
            <Route path='/product_list' element={<ProductList />}></Route>
            <Route path='/keyword_suggestion' element={<KeywordSuggestions />}></Route>
            <Route path='/product_performance' element={<ProductPerformance />}></Route>
          </Route>
          {/* </div> */}
          {/* </div> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
