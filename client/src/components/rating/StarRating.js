import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
const apiUrl = process.env.REACT_APP_URL;

const StarRating = ({ nickname, transactionCompleted, id }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    if (transactionCompleted) {
      // 거래 완료 상태가 true로 변경되면 평점 모달을 띄운다.
      setShowRatingModal(true);
    }
  }, [transactionCompleted]);

  // 평점을 백엔드로 보내는 함수
  const sendRatingToServer = async (rating) => {
    try {
      const response = await fetch(`${apiUrl}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score: rating, id: id }), // 평점을 JSON 형태로 변환
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Rating submitted:', data);
        // 추가적인 성공 처리 로직
      } else {
        // 서버에서 오류 응답을 받은 경우 처리 로직
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      // 오류 처리 로직
    }
  };

  // handleRating 함수 내에서 평점을 백엔드로 보내는 로직 추가
  const handleRating = (rate) => {
    setRating(rate);
    MySwal.fire({
      title: '평점을 매겼습니다!',
      html: <p>{`당신의 평점은 ${rate}점입니다.`}</p>,
      icon: 'success',
    }).then(() => {
      setShowRatingModal(false); // 평점이 매겨지면 모달을 닫는다.
      sendRatingToServer(rate); // 평점을 백엔드로 전송
    });
  };

  return (
    <>
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="border-4 border-primary p-4 rounded-lg bg-white">
            <h3 className="text-2xl mb-4 text-center ">
              방금만난 {nickname}님과의 거래 어떠셨나요?
            </h3>
            <h3 className="text-2xl mb-4 text-center ">전체 평점</h3>

            <div className="flex justify-center items-center">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <button
                    type="button"
                    key={ratingValue}
                    className={`text-8xl ${
                      ratingValue <= (hover || rating)
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }`}
                    onClick={() => handleRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(rating)}
                    style={{
                      color:
                        ratingValue <= (hover || rating)
                          ? '#ffc107'
                          : '#d1d5db',
                      transition: 'color 0.2s',
                    }}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StarRating;
