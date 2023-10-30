import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';

export default function WaitMateRegister() {
  const { control, handleSubmit, formState } = useForm();
  const [imageFile, setImageFile] = useState('/images/someone.png');
  const [ modalState, setModalState ] = useState(false);
  const [ inputAddressValue, setInputAddressValue ] = useState('');

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('address', data.address);
    formData.append('date', data.date);
    formData.append('time', data.time);
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
    setInputAddressValue(data.jibunAddress);
  };

  const handleAddressClick = () => {
    const res = !modalState;
    setModalState(res);
  };

  return (
    <div>
      <p className='text-xs'>좋은 웨이트메이트가 되어주세요!</p>
      <div className='relative'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 border border-primary rounded-lg"
        >
          <div className='flex'>
            <div className='flex justify-center items-center w-1/4'>
              <div className='w-full'>
                {imageFile && <img src={imageFile} alt="Preview" className="border border-primary rounded-lg w-full h-40" />}
                <label className="text-xs text-primary m-1">가게 사진 및 아이콘</label>
                  <input
                    accept='image/*'
                    multiple type='file'
                    onChange={(e) => onUpload(e)}
                    className='text-xs'
                  />
              </div>
              </div>
              <div className='bg-primary ml-3 w-full flex flex-col p-3'>
                <div>
                  <label className='text-sm text-background m-1'>title</label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <input {...field} />}
                  />
                </div><br />
                <div>
                <label className='text-sm text-background m-1'>Store Address</label>
                  <Controller
                    name="address"
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
                      /><DaumPostcode
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
                <label className='text-sm text-background m-1'>Date</label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <select {...field}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  />
                </div><br />
              <div>
              <label className='text-sm text-background m-1'>Waiting Time</label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: true, min: 18 }}
                  render={({ field }) => <input type="number" {...field} />}
                />
              </div><br />
              <div>
              <label className='text-sm text-background m-1'>Hourly rate(시급)</label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: true, min: 18 }}
                  render={({ field }) => <input type="number" {...field} />}
                />
              </div><br />
              <div>
              <label className='text-sm text-background m-1'>Datail explanation</label><br/>
                <Controller
                  name="introduction"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => <textarea {...field} />}
                />
              </div><br />
              <button type="submit" disabled={formState.isSubmitting}
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
