import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
// import { Modal, Button } from "antd";

export default function WaitMateRegister() {
  const { control, handleSubmit } = useForm();
  const [imageFile, setImageFile] = useState('/images/waitMate.png');
  const [ modalState, setModalState ] = useState(false);
  const [ inputAddressValue, setInputAddressValue ] = useState('');

  const onSubmit = (data, event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('address', data.storeAddress);
    formData.append('date', data.date);
    formData.append('time', data.time);
    formData.append('pay', data.pay);
    formData.append('detail', data.detail);
    formData.append('image', imageFile);
    console.log(formData);
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImageFile(reader.result);
    };
  }

  const onCompletePost = data => {
    setModalState(false);
    setInputAddressValue(data.address);
  };

  const handleAddressClick = () => {
    const res = !modalState;
    setModalState(res);
  };

  return (
    <div className='w-full'>
      <p className='text-xs'>좋은 웨이트메이트가 되어주세요!</p>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border border-primary rounded-lg"
        >
          <div className='flex'>
            <div className='flex justify-center items-center w-1/4'>
              <div className='w-full'>
                {imageFile && <img src={imageFile} alt="Preview" className="border border-primary rounded-lg" />}
                <label className="text-xs text-primary m-1">가게 사진 및 아이콘</label>
                  <input
                    accept='image/*'
                    multiple type='file'
                    onChange={(e) => onUpload(e)}
                    className='text-xs'
                  />
              </div>
              </div>
              <div className='bg-primary ml-3 w-full flex flex-col p-3 rounded-lg'>
                <div>
                  <label className='text-sm text-background m-1'>*title</label>
                  <Controller
                    name="title"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <input {...field} />}
                  />
                </div><br />
                <div>
                <label className='text-sm text-background m-1'>*Store Address</label>
                  <Controller
                    name="storeAddress"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) =>(
                    <div className="relative">
                      <input
                        {...field}
                        onChange={handleAddressClick}
                        className="w-full"
                        placeholder="주소"
                        value={inputAddressValue}
                      />
                      <DaumPostcode
                      onComplete={onCompletePost}
                      className={`w-40 h-40 absolute top-12 ${modalState ? 'block' : 'hidden'}`}
                    ></DaumPostcode>
                    <button
                      onClick={handleAddressClick}
                      className="bg-primary text-white px-2 py-1 mt-2"
                    >
                      주소 찾기
                    </button>
                  </div>
                )}
                  />
                </div><br />
                <div>
                <label className='text-sm text-background m-1'>*Date</label>
                  <Controller
                    name="Date"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <input {...field} type="date" />
                    )}
                  />
                </div><br />
              <div>
              <label className='text-sm text-background m-1'>Waiting Time</label>
                <Controller
                  name="time"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <input {...field} />}
                />
              </div><br />
              <div>
              <label className='text-sm text-background m-1'>Pay(시급)</label>
                <Controller
                  name="pay"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <input {...field} />}
                />
              </div><br />
              <div>
              <label className='text-sm text-background m-1'>Datail explanation</label><br/>
                <Controller
                  name="detail"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <textarea {...field} className='w-full rounded-lg'/>}
                />
              </div><br />
              <button type="submit"
              className='text-background text-sm border'
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