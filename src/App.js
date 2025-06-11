import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './pages/Index';
import List from './pages/List';
import Item from './pages/Item';
import Community from './pages/Community';
import { ProductProvider } from './data/ProductContext';
import { BrowserRouter } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import LogIn from './pages/LogIn';
import Mypage from './components/Mypage';
import Sign from './pages/Sign';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        {/* <Index /> */}
        {/* <List /> */}
        {/* <LogIn/> */}
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/sign" element={<Sign />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/list" element={<List />}></Route>
          <Route path="/item/:itemno" element={<Item />}></Route>
          <Route path="/community/:itemno" element={<Community />}></Route>
          
          <Route path="/mypage/*" element={<Mypage />}></Route>

        </Routes>
      </ProductProvider>
    </BrowserRouter>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
