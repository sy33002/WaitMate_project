import Footer from './static/Footer';
import Template from './static/Template';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProxyRegister from './components/proxy/ProxyRegister';
import ProxyList from './components/proxy/ProxyList';
import Main from './components/main/main';
import ProxyDetail from './components/proxy/ProxyDetail';
import WaitMateRegister from './components/waitMate/WaitMateRegister';
import WaitMateList from './components/waitMate/WaitMateList';
import WaitMateDetail from './components/waitMate/WaitMateDetail';
function App() {
  return (
    <div className="bg-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route
            path="/proxy/register"
            element={
              <Template>
                <ProxyRegister />
              </Template>
            }
          ></Route>
          <Route
            path="/proxy/getter"
            element={
              <Template>
                <ProxyList />
              </Template>
            }
          ></Route>
          <Route
            path="/proxy/:proxyId"
            element={
              <Template>
                <ProxyDetail />
              </Template>
            }
          ></Route>
          <Route
            path="/waitMate/"
            element={
              <Template>
                <WaitMateRegister />
              </Template>
            }
          ></Route>
          <Route
            path="/waitMate/list"
            element={
              <Template>
                <WaitMateList />
              </Template>
            }
          ></Route>
          <Route
            path="/waitMate/detail"
            element={
              <Template>
                <WaitMateDetail />
              </Template>
            }
          ></Route>
          {/* <Route path='/waitMate/delete' element={<Template><waitMateRegister /></Template>}></Route> */}
          {/* <Route path='/waitMate/patch' element={<Template><waitMateRegister /></Template>}></Route> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
