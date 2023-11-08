// UserListModal.js

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import useUserStore from '../../store/useUserStore';

const UserListModal = ({ isOpen, onRequestClose }) => {
  const { id } = useUserStore();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // 백엔드로 사용자 목록 요청
      axios.get('http://localhost:8080/proxy/userList', {
        params: {
          userId: id, // 사용자 ID를 백엔드로 보내어 필터링 가능
        },
      })
        .then((response) => {
          setUserList(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch user list', error);
        });
    }
  }, [isOpen, id]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User List Modal"
    >
      <h2>Select a User to Chat</h2>
      <ul>
        {userList.map((user) => (
          <li key={user.id}>
            <button onClick={() => handleUserClick(user.id)}>
              {user.username}
            </button>
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default UserListModal;