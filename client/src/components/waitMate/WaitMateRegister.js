import React, { useState, useEffect } from 'react';
import { useForm, Controller, set } from 'react-hook-form';
import AddressSearchModal from './AddressSearchModal';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/useUserStore';

export default function WaitMateRegister() {
  const { control, handleSubmit, setValue, formState, watch } = useForm();
  const [imageFile, setImageFile] = useState('/waitmate/images/waitMate.png');
  const [inputAddressValue, setInputAddressValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [locationInfo, setLocationInfo] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const [showModal, setShowModal] = useState(false);
  const [validEndTime, setValidEndTime] = useState(false);
  const { id } = useUserStore();
  const apiUrl = process.env.REACT_APP_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일을 넣어주십시오');
        e.target.value = '';
      } else {
        setValue('photo', e.target.files);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImageFile(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleModalConfirm = () => {
    navigate('/waitMate/list');
  };

  const startTime = watch('time_start', '');
  const endTime = watch('time_end', '');

  useEffect(() => {
    if (startTime && endTime) {
      if (startTime > endTime) {
        setValidEndTime(true);
        setValue('time_end', ''); 
      }
    }
  }, [startTime, endTime, setValue]);

  const onSubmit = async (data, event) => {

      if (!formState.isValid) {
        setClickRegister(false);
        alert('폼이 유효하지 않으니 제대로 작성해주세요!');
        return;
    }
    const wmAddress = inputAddressValue;
    const formData = new FormData();
    formData.append('id', id);
    formData.append('title', data.title);
    formData.append('wmAddress', wmAddress);
    formData.append('wmDetailAddress', data.detailAddress);
    formData.append('date', data.date);
    formData.append('startTime', data.time_start);
    formData.append('endTime', data.time_end);
    formData.append('pay', data.pay);
    formData.append('description', data.detail);
    formData.append('lng', locationInfo.x);
    formData.append('lat', locationInfo.y);
    if (data.photo && data.photo[0]) {
      formData.append('photo', data.photo[0]);
    } else {
      formData.append('photo', 'https://sesac-projects.site/waitmate/images/waitMate.png');
    }
    
    try {
      const response = await fetch(`${apiUrl}/waitMate/register`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setShowModal(true);
      } else {
        setClickRegister(false);
        console.log(response.status);
      }
    } catch (error) {
      setClickRegister(false);
      console.error('Error!');
    }
  };

  return (
    <div className={`${isSmallScreen ? 'p-1 mt-3 ' : 'p-6'} w-full`}>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-4 border bg-primary border-primary rounded-lg w-full`}
        >
          <p
            className={`${
              isSmallScreen ? 'text-[15px]' : 'text-[20px]'
            } text-green font-Line`}
          >
            웨이트 메이트란 (Wait Mate) ?
          </p>
          <p
            className={`${
              isSmallScreen ? 'text-[12px]' : 'text-[15px]'
            } text-background font-Line`}
          >
            대신 웨이팅 할 사람을 구하는 사람을 지칭하는 말입니다.{' '}
          </p>
          <p
            className={`${
              isSmallScreen ? 'text-[12px]' : 'text-[15px]'
            } text-background font-Line`}
          >
            저희 프록시를 구해서 웨이팅 시간을 줄여보아요!
          </p>
          <div
            className={`${
              isSmallScreen ? 'flex flex-col mt-6' : 'flex'
            }  justify-center items-center`}
          >
            <div
              className={`${
                isSmallScreen ? 'w-1/2' : 'w-1/2'
              } flex flex-col text-center pb-2`}
            >
              <div className="w-full">
                {imageFile && (
                  <img
                    src={imageFile}
                    alt="Preview"
                    className="border mt-2 bg-background border-primary rounded-lg w-full"
                  />
                )}
                <label className="text-sm text-background relative cursor-pointer">
                  <span className="bg-primary text-white p-2 text-xs rounded-md font-Line">
                    Upload your Image
                  </span>
                  <input
                    type="file"
                    name="photo"
                    className="hidden"
                    onChange={(e) => {
                      handleFileChange(e);
                    }}
                  />
                </label>
              </div>
            </div>
            <div className="bg-primary ml-3 w-full flex flex-col p-3 rounded-lg">
              <div>
                <label className="text-sm text-green font-Line m-1">
                  * Title
                </label>
                <br />
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true, maxLength: 100 }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="rounded-lg w-full"
                      placeholder="구인 글의 제목을 지어주세요!"
                    />
                  )}
                />
                {formState.errors.title && clickRegister && (
                  <p className="text-red-300 text-xs p-2">
                    {formState.errors.title.type === 'required'
                      ? '제목은 필수 항목입니다 :D'
                      : formState.errors.title.type === 'maxLength'
                      ? '제목은 100자 이내로 입력해주세요'
                      : '제목에 관한 에러가 발생했습니다.'}
                  </p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  * Store Address
                </label>
                <br />
                <button
                  className="bg-green p-1 font-Line rounded-lg mb-1"
                  onClick={() => {
                    setShowModal(false);
                    setIsModalOpen(true);
                    setValue('address', '');
                  }}
                >
                  주소 검색
                </button>
                <input
                  name="address"
                  className="rounded-lg w-full"
                  placeholder="건물 주소를 적어주세요"
                  value={inputAddressValue}
                />
                {isModalOpen && (
                  <AddressSearchModal
                    setInputAddressValue={setInputAddressValue}
                    setLocationInfo={setLocationInfo}
                  />
                )}
                {inputAddressValue === '' && clickRegister && (
                  <p className="text-red-300 text-xs p-2">
                    주소는 필수 항목입니다 :D
                  </p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line ml-1">
                  Detail Address
                </label>
                <br />
                <span className="text-red-300 text-xs font-Line pl-1">
                  웨이팅 장소는 최대한 상세하게 적어주세요!
                </span>
                <br />
                <Controller
                  name="detailAddress"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <textarea {...field} className="rounded-lg w-full" />
                  )}
                />
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  * Date
                </label>
                <br />
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="rounded-lg w-full"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  )}
                />
                {formState.errors.date && clickRegister && (
                  <p className="text-red-300 text-xs p-2">
                    {formState.errors.date.type === 'min'
                      ? '지난 날짜는 등록되지 않습니다!'
                      : '날짜는 필수 항목입니다 :D'}
                  </p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  * Waiting Time
                </label>
                <br />
                <span className="text-xs text-background font-Line">
                  About{' '}
                </span>
                <Controller
                  name="time_start"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="time"
                      className="rounded-lg w-1/3"
                    />
                  )}
                />
                <span className="text-background"> ~ </span>
                <Controller
                  name="time_end"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="time"
                      className="rounded-lg w-1/3"
                    />
                  )}
                />
                {(formState.errors.time_start || formState.errors.time_end) &&
                  clickRegister && (
                    <p className="text-red-300 text-xs p-2">
                      시작 시간과 끝날 시간 필수 항목입니다 :D
                    </p>
                  )}
                  {validEndTime && (
                    <p className="text-red-300 text-xs p-2">
                      끝날 시간은 시작 시간보다 뒤여야합니다!
                    </p>
                  )}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  Pay(시급)
                </label>
                <br />
                <p className="text-red-300 text-xs font-Line pl-1">
                  숫자 형태로만 적어주세요!
                </p>
                <Controller
                  name="pay"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder=" 0000원"
                      type="number"
                      className="rounded-lg w-1/3"
                    />
                  )}
                />
                {/* {formState.errors.pay && clickRegister && (
                  <p className="text-red-300 text-xs p-2">
                    pay는 필수 항목입니다 :D
                  </p>
                )} */}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  Detail explanation
                </label>
                <br />
                <Controller
                  name="detail"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <textarea {...field} className="w-full rounded-lg" />
                  )}
                />
              </div>
              <br />
              <button
                type="submit"
                onClick={() => {
                  setClickRegister(true);
                }}
                className="text-background text-lg border font-Line border-green p-2 rounded-lg w-full"
              >
                register
              </button>
            </div>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-1/3 text-center">
            <p className="mb-4">등록 완료!</p>
            <button
              onClick={handleModalConfirm}
              className="p-2 bg-primary text-white rounded-md"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
