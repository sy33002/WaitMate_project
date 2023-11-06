import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function WaitMateDetail({ id, nickname, photo, userId }) {
  const { wmId } = useParams();
  const [waitMate, setWaitMate] = useState({});
  const [liked, setLiked] = useState(false);

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
        // 이미 찜한 상태라면 해제
        await fetch(`http://localhost:8080/likeWait?wmId=${wmId}&proxyId=2`, {
          method: 'DELETE',
        });
      } else {
        // 아직 찜하지 않은 상태라면 찜
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
    <div className='w-full h-full flex flex-col items-center'>
      <p className='text-xs text-primary'>00동 Wait Mate가 찾고 있는 조건이에요!</p>
      <div className='flex flex-col w-4/5 h-4/5 border border-primary rounded-lg justify-center'>
        <div className='h-1/4 flex flex-col justify-center items-center p-2'>
          <img src='/images/me.jpg'  alt='store' className='rounded-lg h-full'></img>
        </div>
        <div className='h-3/4 m-2'>
          <p>Title: <span></span></p>
          <p>Store Address: <span>{waitMate.wmAddress}</span></p>
          <p>Date: </p>
          <p>Time: </p>
          <p>Hourly rate(시급): </p>
          <p>상세설명: </p>
        </div>
        <div>
          <span>최근 채용 횟수: <san>{waitMate.count}</san></span><br />
          <span>게시물 조회수: </span>
          <span>지원자: </span>
          <span>관심: </span>
          <button onClick={handleLikeToggle}>찜하기</button>
        </div>
      </div>
    </div>
  )
}
