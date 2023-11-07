import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function WaitMateDetail({ id, nickname, photo, userId }) {
  const { wmId } = useParams();
  const [waitMate, setWaitMate] = useState({});
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/waitMate/update/${wmId}`);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/waitMate/detail?wmId=${wmId}&id=${id}`)
    .then(response => response.json())
    .then(data => {
      setWaitMate(data.waitMate);
      console.log(waitMate);
    })
    .catch(error => {
      console.error('데이터 가져오는 중 오류 발생!', error);
    });
  }, [wmId]);

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await fetch(`http://localhost:8080/likeWait?wmId=${wmId}&proxyId=2`, {
          method: 'DELETE',
        });
      } else {
        await fetch(`http://localhost:8080/likeWait?wmId=${wmId}&proxyId=2`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            wmId: wmId,
            proxyId: 2,
          }),
        });
      }
      setLiked(!liked); // 찜 상태를 토글
    } catch (error) {
      console.error('찜하기/해제하기 오류:', error);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center mt-10'>
      <p className='text-xs text-primary font-Line'>Wait Mate가 Proxy를 찾고 있는 조건이에요!</p>
      <div className='flex flex-col w-full bg-primary h-4/5 rounded-lg justify-center mb-5'>
        <div className='h-1/4 flex flex-col justify-center items-center p-3'>
          <img src='/images/me.jpg' alt='store' className='rounded-lg w-4/5 shadow-lg'></img>
        </div>
        <div className='h-3/4 m-2'>
          <p className='font-Line text-red-300 p-1 ml-4'>Title : <span>{waitMate.title}</span></p>
          <p className='font-Line text-red-300 p-1 ml-4'>Store Address : <span>{waitMate.wmAddress}</span></p>
          <p className='font-Line text-red-300 p-1 ml-4'>Date : </p>
          <p className='font-Line text-red-300 p-1 ml-4'>Time : </p>
          <p className='font-Line text-red-300 p-1 ml-4'>pay : </p>
          <p className='font-Line text-red-300 p-1 ml-4'>detail : </p>
        </div>
        <div className='w-full flex p-4 bg-primary_dark font-Line'>
          <div className='w-1/2 p-1'>
          <span className='text-primary_light'>최근 채용 횟수:
          <span className='text-gray-400'>{waitMate.count}  aa</span></span><br />
          <span className='text-primary_light'>게시물 조회수:
          <span className='text-gray-400'>{waitMate.count}  aa</span></span>
          </div>
          <div className='w-1/2 p-1'>
          <span className='text-primary_light'>지원자:
          <span className='text-gray-400'>{waitMate.count}  aa</span></span><br />
          <span className='text-primary_light'>관심:
          <span className='text-gray-400'>{waitMate.count}  aa</span></span>
          </div>
        </div>
        <div className='flex flex-col w-full justify-items-center bg-primary_dark rounded-b-lg'>
          <button className='text-background text-lg font-Line p-2' onClick={handleLikeToggle}>ʚ♥⃛ɞ 찜하기 ʚ♥⃛ɞ</button>
          <button className='text-background text-lg font-Line' onClick={handleEditClick}>수정하기</button>
        </div>
      </div>
    </div>
  )
}
