import Footer from './static/Footer';
import Template from './static/Template';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProxyRegister from './components/proxy/ProxyRegister';
import ProxyList from './components/proxy/ProxyList';
import Map from './components/map/map';
import Main from './components/main/main';
import ProxyDetail from './components/proxy/ProxyDetail';
import WaitMateRegister from './components/waitMate/WaitMateRegister';
import WaitMateList from './components/waitMate/WaitMateList';
import WaitMateDetail from './components/waitMate/WaitMateDetail';
import SigninForm from './components/register/SigninForm';
import SignupForm from './components/register/SignupForm';
import UserInfo from './components/register/UserInfo';
// import MyProxy from './components/mypage/MyProxy';
// import MyWaitmate from './components/mypage/MyWaitmate';
import Chat from './components/Chat/Chat';
import cities from './static/cities';
import Mypage from './components/mypage/Mypage';
import ChatList from './components/mypage/ChatList';
import StarRating from './components/rating/StarRating';
import WaitMateUpdate from './components/waitMate/WaitMateUpdate';
import Error404 from './static/404';

function isAuthenticated(id) {
  // id 값이 있는 경우 사용자는 인증된 상태로 간주
  return id != null;
}

function App({ id, nickname, photo, userId }) {
  return (
    <div className="bg-background">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main></Main>} />
          <Route
            path="/proxy/detail/chat/:roomNumber"
            element={
              <Template>
                <Chat
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
              </Template>
            }
          ></Route>
          <Route path="/register/SigninForm" element={<SigninForm />}></Route>
          <Route path="/register/SignupForm" element={<SignupForm />}></Route>
          <Route
            path="/map"
            element={
              isAuthenticated(id) ? (
              <Template>
                <Map
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
              </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/proxy/register"
            element={
              isAuthenticated(id) ? (
              <Template>
                <ProxyRegister
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
               </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/proxy/list"
            element={
              isAuthenticated(id) ? (
              <Template>
                <ProxyList
                  cities={cities}
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/proxy/detail/:proxyId"
            element={
              isAuthenticated(id) ? (
              <Template>
                <ProxyDetail
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/proxy/update/:proxyId"
            element={
              isAuthenticated(id) ? (
              <Template>
                <WaitMateUpdate
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                 </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/waitMate/register"
            element={
              isAuthenticated(id) ? (
              <Template>
                <WaitMateRegister
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                   </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/waitMate/list"
            element={
              isAuthenticated(id) ? (
              <Template>
                <WaitMateList
                  cities={cities}
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                   </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/waitMate/detail/:wmId"
            element={
              isAuthenticated(id) ? (
              <Template>
                <WaitMateDetail
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                  </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/waitMate/update/:wmId"
            element={
              isAuthenticated(id) ? (
              <Template>
                <WaitMateUpdate
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                 </Template>):(
                <Error404 /> )
            }
          ></Route>

          <Route
            path="/register/UserInfo"
            element={
              isAuthenticated(id) ? (
              <Template>
                <UserInfo
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                  </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/mypage/Mypage"
            element={
              isAuthenticated(id) ? (
              <Template>
                <Mypage
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                 </Template>):(
                <Error404 /> )
            }
          ></Route>
          <Route
            path="/mypage/ChatList"
            element={
              isAuthenticated(id) ? (
              <Template>
                <ChatList
                  id={id}
                  nickname={nickname}
                  photo={photo}
                  userId={userId}
                />
                 </Template>):(
                <Error404 /> )
            }
          ></Route>

          <Route path="/rating/StarRating" element={<StarRating />}></Route>
          <Route path="/*" element={<Error404 />} />
          {/* <Route path='/waitMate/delete' element={<Template><waitMateRegister /></Template>}></Route> */}
          {/* <Route path='/waitMate/patch' element={<Template><waitMateRegister /></Template>}></Route> */}
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
