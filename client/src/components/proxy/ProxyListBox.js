import React, { useState } from 'react';
// import axios from 'axios';

export default function ProxyListBox({title, age, gender}) {
//   const [userImage, setUserImage] = useState('');
//   const [userInfo, setUserInfo] = useState({});
    const [isHovered, setIsHoverd] = useState(false);

//   useEffect(() => {
//     axios.get('/api/userData')
//       .then((response) => {
//         setUserImage(response.data.image);
//         setUserInfo(response.data.userInfo);
//       })
//       .catch((error) => {
//         console.error('데이터 가져오기 실패:', error);
//       });
//   }, []);
const handleHoverIn = () => {
    setIsHoverd(true);
};
const handleHoverOut = () => {
	setIsHoverd(false);
};
return (
    <div className={`rounded-lg border-x-primary border-x-2 h-24 relative 
    ${isHovered ? 'hovered' : ''}`}
		onMouseOver={handleHoverIn}
		onMouseOut={handleHoverOut}>
      <div className='p-2 h-full flex items-center'>
        <div className='w-1/4 lg:overflow-hidden'>
            <img src='/images/me.jpg' alt='User' className='w-20 rounded-full' />
        </div>
        <div className='w-3/4 text-center'>
            <p>asdf</p>
            <p>awegage</p>
        </div>
      </div>
			{isHovered && (
					<div className="hover-info">
					{/* 상세 정보 내용 */}
					<p>상세 정보 내용</p>
					</div>
      )}
    </div>
  );
}
