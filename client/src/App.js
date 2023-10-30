import Header from './static/Header';
import Footer from './static/Footer';
import Sidebar from './static/SideBar';
import { BrowserRouter, Route } from 'react-router-dom'; // Route를 추가로 임포트
import SigninForm from './components/register/SigninForm';
import SignupForm from './components/register/SignupForm';

function App() {
  return (
    <div className="bg-background w-full h-screen">
      <BrowserRouter>
        <Header />
        <Sidebar />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
