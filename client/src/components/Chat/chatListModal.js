import React, { useState, useEffect } from 'react';
import './ChatListModal.scss';
import useUserStore from '../../store/useUserStore';
import axios from 'axios';
const UserListModal = ({ isOpen, onRequestClose, onUserSelect }) => {
  const { id } = useUserStore();
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const loadUserList = () => {
    setIsLoading(true);
    axios
      .get('http://localhost:8080/proxy/userList', {
        params: {
          id,
        },
      })
      .then((response) => {
        setUserList(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch user list', error);
        setIsLoading(false);
      });
  };
  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  const handleConfirmClick = () => {
    onUserSelect(selectedUser);
    onRequestClose();
  };
  // 모달이 열릴 때 데이터를 불러오도록 수정
  useEffect(() => {
    if (isOpen) {
      loadUserList();
    }
  }, [isOpen]);
  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>해당하는 웨이트메이트의 내용을 선택하세요</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <ul>
              {userList.map((user) => (
                <li key={user.id}>
                  <button onClick={() => handleUserClick(user)}>{user.title}</button>
                </li>
              ))}
            </ul>
            {selectedUser && (
              <div>
                <h3>선택한 웨이트메이트</h3>
                <br></br>
                <img src={'http://localhost:8080/' + selectedUser.photo} alt={selectedUser.title} />
                <p>번호: {selectedUser.wmId}</p>
                <p>타이틀: {selectedUser.title}</p>
                <p>주소: {selectedUser.wmAddress}</p>
                <p>{selectedUser.wmDetailAddress}</p>
                <button onClick={handleConfirmClick}>확인</button>
              </div>
            )}
          </>
        )}
        <button onClick={onRequestClose} className="close-button">
          닫기
        </button>
      </div>
    </div>
  ) : null;
};
export default UserListModal;