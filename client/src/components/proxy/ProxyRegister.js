import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';

export default function ProxyRegister() {
  const { control, handleSubmit, formState } = useForm();
  const [imageFile, setImageFile] = useState('/images/someone.png');
  const [ modalState, setModalState ] = useState(false);
  const [ inputAddressValue, setInputAddressValue ] = useState('');

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('gender', data.gender);
    formData.append('age', data.age);
    formData.append('introduction', data.introduction);
    formData.append('image', imageFile);
    console.log(formData);
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // 이미지 파일을 읽어 Base64로 변환
    reader.onload = () => {
      setImageFile(reader.result); // 이미지 파일 경로 설정
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
      <p className='text-xs'>you are my best proxy.</p>
      <div className='relative'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 bg-primary rounded-lg"
        >
          <p className='text-[10px] text-background'>
            프록시란(Proxy)?</p>
          <p className='text-[10px]  text-background'>
            대신 웨이팅 할 사람을 지칭하는 말입니다! 저희 웨이트 메이트를 위해 대신 줄서기를 하며 좋은 시간을 보내보아요!</p><br />
          <div className='flex'>
            <div>
              <div className='aspect-w-16 aspect-h-9'>
                  {imageFile && <img src={imageFile} alt="Preview" 
                  className="max-w-full max-h-40" />}
              </div>
              <label className="text-sm text-background m-1">Upload Image</label><br />
                <input
                  accept='image/*'
                  multiple type='file'
                  onChange={(e) => onUpload(e)}
                  className=''
                />
              </div>
              <div>
                <div>
                  <label className='text-sm text-background m-1'>Name</label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <input {...field} placeholder="이름"/>}
                  />
                </div><br />
                <div>
                <label className='text-sm text-background m-1'>Address</label>
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
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
                        className={`w-40 h-40 absolute top-12 ${modalState ? 'hidden' : 'block'}`}
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
                </div>
                  <br />
                <div>
                <label className='text-sm text-background m-1'>Gender</label>
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
              <label className='text-sm text-background m-1'>Age</label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: true, min: 18 }}
                  render={({ field }) => <input type="number" {...field} />}
                />
              </div><br />
              <div>
              <label className='text-sm text-background m-1'>Introduce yourself!</label><br/>
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
