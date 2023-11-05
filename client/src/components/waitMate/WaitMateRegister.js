import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddressSearchModal from './AddressSearchModal';
export default function WaitMateRegister({ id, nickname, photo, userId }) {
  const { control, handleSubmit, setValue, formState } = useForm();
  const [imageFile, setImageFile] = useState('/images/waitMate.png');
  const [inputAddressValue, setInputAddressValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);
  const [locationInfo, setLocationInfo] = useState({});

  const onSubmit = async (data, event) => {
    console.log('dd');
    const wmAddress = inputAddressValue;
    const formData = new FormData();
    formData.append('id', 1);
    formData.append('title', data.title);
    formData.append('wmAddress', wmAddress);
    formData.append('date', data.date);
    formData.append('waitTime', data.time);
    formData.append('pay', data.pay);
    formData.append('description', data.detail);
    formData.append('photo', imageFile);
    try {
      const response = await fetch(`http://localhost:3000/waitMate`, {
        method: 'POST',
        body: formData,
      });
      if (response === 'success') {
        // const responseData = await response.json();
        console.log('aaaa');
      } else {
        console.error('Failed to submit the form');
        console.log(response.status);
      }
    } catch (error) {
      console.error('Error!');
    }
  };
  console.log("setlocationInfo",setLocationInfo.lat);
  return (
    <div className="w-full">
      <p className="text-xs">좋은 웨이트메이트가 되어주세요!</p>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border border-primary rounded-lg"
        >
          <div className="flex">
            <div className="flex justify-center items-center w-1/4">
              <div className="w-full">
                {imageFile && (
                  <img
                    src={imageFile}
                    alt="Preview"
                    className="border border-primary rounded-lg"
                  />
                )}
                <label className="text-xs text-primary m-1">가게 사진</label>
              </div>
            </div>
            <div className="bg-primary ml-3 w-full flex flex-col p-3 rounded-lg">
              <div>
                <label className="text-sm text-background m-1">*title</label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true, maxLength: 100 }}
                  render={({ field }) => <input {...field} />}
                />
                {formState.errors.title && clickRegister && (
                  <p className="text-red-500">
                    {formState.errors.title.type === 'required'
                      ? '제목은 필수 항목입니다 :D'
                      : '제목은 100자 이내로 입력해주세요'}
                  </p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-background m-1">
                  *Store Address
                </label>
                <input
                  name="address"
                  className="w-full"
                  placeholder="주소"
                  value={inputAddressValue}
                />
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setValue('address', '');
                  }}
                >
                  주소 검색
                </button>
                {isModalOpen && (
                  <AddressSearchModal
                    setInputAddressValue={setInputAddressValue}
                    setLocationInfo={setLocationInfo}
                  />
                )}
                {inputAddressValue === '' && clickRegister && (
                  <p className="text-red-500">주소는 필수 항목입니다 :D</p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-background m-1">*Date</label>
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <input {...field} type="date" />}
                />
                {formState.errors.date && clickRegister && (
                  <p className="text-red-500">날짜는 필수 항목입니다 :D</p>
                )}
              </div>
              <br />
              <div>
                <label className="text-sm text-background m-1">
                  Waiting Time
                </label>
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
              <br />
              <div>
                <label className="text-sm text-background m-1">Pay(시급)</label>
                <Controller
                  name="pay"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <input {...field} />}
                />
              </div>
              <br />
              <div>
                <label className="text-sm text-background m-1">
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
                onClick={() => setClickRegister(true)}
                className="text-background text-sm border"
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
