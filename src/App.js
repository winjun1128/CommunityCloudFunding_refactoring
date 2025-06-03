import logo from './logo.svg';
import './App.css';
import Index from './pages/Index';
import Mypage from './components/Mypage';
import {BrowserRouter} from 'react-router-dom';
function App() {
  return (
    // <Index/>
    <BrowserRouter>
      <Mypage />
    </BrowserRouter>
  );
}

export default App;
