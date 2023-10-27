import Footer from './static/Footer';
import Template from './static/Template';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProxyRegister from './components/proxy/ProxyRegister';
import ProxyList from './components/proxy/ProxyList';

function App() {
  return (
    <div className="bg-background">
    <BrowserRouter>
      <Routes>
        <Route path='/' element='Main' />
        <Route path='/proxyRegister' element={<Template><ProxyRegister /></Template>}></Route>
        <Route path='/proxyList' element={<Template><ProxyList /></Template>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
