import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
// import useUserStore from './store/useUserStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const userStoreData = useUserStore;
const userStoreData = {
  id: 1,
  nickname: "asdf",
  photo: './public/images/me/jpg',
  userId: 'asdf',
}

root.render(
    <React.StrictMode>
          <App 
            id={userStoreData.id}
            nickname={userStoreData.nickname}
            photo={userStoreData.photo}
            userId={userStoreData.userId}
          />
    </React.StrictMode>
);
