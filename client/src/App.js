import Footer from './static/Footer';
import Template from './static/Template';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProxyRegister from './components/proxy/ProxyRegister';
import ProxyList from './components/proxy/ProxyList';
import Main from './components/main/Main';
import Chat from './components/Chat/Chat';
function App() {
  return (
    <div className="bg-background">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main></Main>} />
        <Route path='/proxyRegister' element={<Template><ProxyRegister /></Template>}></Route>
        <Route path='/proxyList' element={<Template><ProxyList /></Template>}></Route>
        <Route path='/proxyDetail/chat' element={<Template><Chat/></Template>}></Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
    </div>
  );
}

export default App;
