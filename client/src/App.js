import Header from './static/Header';
import Footer from './static/Footer';
import Template from './static/Template';
import ProxyRegister from './components/proxy/ProxyRegister';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="bg-background">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element='Main' />
        <Route path='/proxyRegister' element={<Template><ProxyRegister /></Template>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
