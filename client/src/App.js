import Header from './static/Header';
import Footer from './static/Footer';
import Sidebar from './static/SideBar';
import Main from './components/main/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Route를 추가로 임포트

function App() {
  return <div className='bg-background w-full h-screen'>
      <BrowserRouter>

      <Main/>
      <Routes>
        <Route Header />
        <Route Sidebar />
        <Route Footer />
        </Routes>
      </BrowserRouter>
    </div>
  
}

export default App;
