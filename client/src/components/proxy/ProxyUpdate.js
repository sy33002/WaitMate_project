import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddressSearchModal from '../proxy/AddressSearchModal';
import axios from 'axios';
import useUserStore from '../../store/useUserStore';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProxyRegister({ cities, photo }) {
  const { control, handleSubmit, formState, setValue } = useForm();
  const [imageFile, setImageFile] = useState('/images/someone.png');
  const [proxy, setProxy] = useState({});
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 700);
  const apiUrl = process.env.REACT_APP_URL;
  const { id, nickname, userId } = useUserStore();
  const { proxyId } = useParams();
  console.log(proxyId);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 700);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${apiUrl}/proxy/updateGet/${proxyId}`);
        console.log('result', result.data.result);
        setProxy(result.data.result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [proxyId]);


  const [inputAddressValue, setInputAddressValue] = useState(proxy.address);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);

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

  const onSubmit = async (data) => {
    const address = inputAddressValue || '';
    const addressParts = address.split(' ');
    const combinedAddress = addressParts[0] + ' ' + addressParts[1];

    console.log('데이터값', data);
    console.log(combinedAddress);
    const formData = new FormData();
    formData.append('proxyAddress', combinedAddress);
    formData.append('title', data.title);
    formData.append('gender', data.gender);
    formData.append('age', data.age);
    formData.append('proxyMsg', data.proxyMsg);
    formData.append('photo', data.photo);
    try {
      console.log('찍힘?');
      const response = await axios.patch(
        `${apiUrl}/proxy/update2/${proxyId}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('찍힌듯', response);
      console.log(response.data);
    } catch (error) {
      console.error('Error!', error);
    }
  };

  useEffect(() => {
    if (Object.keys(proxy).length > 0) {
      setValue('title', proxy.title);
      setValue('address', proxy.proxyAddress);
      setValue('gender', proxy.gender);
      setValue('age', proxy.age);
      setValue('proxyMsg', proxy.proxyMsg);
      setImageFile(proxy.photo);
    }
  }, [proxy]);

  return (
    <div className="p-4">
      <p className="text-xs pl-1 pb-1 font-Line">you are my best proxy.</p>
      <div className="relative w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 bg-primary rounded-lg"
        >
          <p className="text-[12px] text-green font-Line">프록시란(Proxy)?</p>
          <p className="text-[12px]  text-background font-Line">
            대신 웨이팅 할 사람을 지칭하는 말입니다!{' '}
          </p>
          <p className="text-[12px]  text-background font-Line">
            저희 웨이트 메이트를 위해 대신 줄서기를 하며 좋은 시간을 보내보아요!
          </p>
          <br />
          <div
            className={`${
              isSmallScreen ? 'flex flex-col' : 'flex'
            } justify-center items-center`}
          >
            <div
              className={`flex flex-col ${isSmallScreen ? 'w-full' : 'w-1/3'}`}
            >
              <div className="w-full h-28 bg-background p-2 rounded-lg">
                {imageFile && (
                  <img
                    src={imageFile}
                    alt="Preview"
                    className="w-full h-full"
                  />
                )}
              </div>
              <label className="text-sm text-background m-1 relative cursor-pointer">
                <span className="bg-primary text-white px-3 py-1 rounded-md font-Line ">
                  Upload your Image
                </span>
                <input
                  type="file"
                  name="photo"
                  className="hidden" // 숨겨진 input 엘리먼트
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </label>
            </div>
            <div className={`${isSmallScreen ? 'w-full' : 'w-2/3 pl-4'}`}>
              <div className="w-full">
                <label className="text-sm text-green m-1 font-Line">
                  * Title (100자 이내)
                </label>
                <br />
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true, maxLength: 100 }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="w-full rounded-lg"
                      placeholder=" 자기소개에 대한 제목을 지어주세요!"
                    />
                  )}
                />
                {formState.errors.title && clickRegister && (
                  <p className="text-red-300 text-xs p-2">
                    {formState.errors.title.type === 'required'
                      ? '제목은 필수 항목입니다 :D'
                      : '제목은 100자 이내로 입력해주세요'}
                  </p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  * Address
                </label>
                <br />
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setValue('address', '');
                  }}
                  className="bg-green p-1 font-Line rounded-lg mb-1"
                >
                  주소 검색
                </button>{' '}
                <span className="text-red-300 text-xs font-Line pl-1">
                  저희는 구체적인 프록시의 주소는 받지 않아요!
                </span>
                <input
                  name="Address"
                  className="w-full rounded-lg"
                  placeholder=" 주소"
                  value={inputAddressValue}
                  readOnly
                  onChange={(e) => setInputAddressValue(e.target.value)}
                />
                {isModalOpen && (
                  <AddressSearchModal
                    setInputAddressValue={setInputAddressValue}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
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
                <label className="text-sm text-green font-Line m-1">
                  * Gender
                </label>
                <br />
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select {...field} className="w-1/2 rounded-lg">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  )}
                />
                {formState.errors.gender && clickRegister && (
                  <p className="text-red-300 text-xs p-2">
                    성별은 필수 항목입니다 :D
                  </p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  * Age
                </label>
                <br />
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select {...field} className="w-1/2 rounded-lg">
                      <option value=""> Select Age</option>
                      <option value="10">10대</option>
                      <option value="20">20대</option>
                      <option value="30">30대</option>
                      <option value="40">40대</option>
                      <option value="50">50대</option>
                      <option value="60">60대 이상</option>
                    </select>
                  )}
                />
                {formState.errors.age && clickRegister && (
                  <p className="text-red-300 text-xs p-2">
                    나이는 필수 항목입니다 :D
                  </p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-green font-Line m-1">
                  Introduce yourself!
                </label>
                <br />
                <Controller
                  name="proxyMsg"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => (
                    <textarea {...field} className="rounded-lg" />
                  )}
                />
              </div>
              <br />
              <button
                type="submit"
                onClick={() => setClickRegister(true)}
                className="text-background text-lg border font-Line border-green p-2 rounded-lg w-full"
              >
                register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
