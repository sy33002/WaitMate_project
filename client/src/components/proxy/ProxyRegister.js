import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DaumPostcode from 'react-daum-postcode';
import AddressSearchModal from '../proxy/AddressSearchModal';

export default function ProxyRegister() {
  const { control, handleSubmit, formState,setValue } = useForm();
  const [imageFile, setImageFile] = useState('/images/someone.png');
  const [inputAddressValue, setInputAddressValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data) => {
    console.log("onSubmit 들어옴!");
    const address = inputAddressValue;
    const formData = new FormData();
    formData.append('proxyAddress', address);
    formData.append('id', data.id);
    formData.append('gender', data.gender);
    formData.append('age', data.age);
    formData.append('proxyMsg', data.introduction);
    formData.append('image', imageFile);
    // formData 출력
    for (var pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    try {
      const response = await fetch(`http://localhost:8080/proxy/register`, {
        method: 'POST',
        body: formData,
      });
      if (response === 'success') {
        // const responseData = await response.json();
        console.log("aaaa");
      } else {
        console.error('Failed to submit the form');
        console.log(response.status);
      }
    } catch (error) {
      console.error('Error!');
    }
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
                  className=''
                />
              </div>
              <div>
                <div>
                  <label className='text-sm text-background m-1'>*Id</label>
                  <Controller
                    name="id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <input {...field} placeholder="이름"/>}
                  />
                </div><br />
                <div>
                <label className="text-sm text-background m-1">
                  *Store Address
                </label>
                  <input
                    name='address'
                    className="w-full"
                    placeholder="주소"
                    value={inputAddressValue}
                  />
                <button onClick={() => {
                  setIsModalOpen(true); 
                  setValue('address', '');}}
                  >주소 검색</button>
                {isModalOpen && (
                  <AddressSearchModal
                    setInputAddressValue ={setInputAddressValue}
                  />
                )}
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
                        <option value="male">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  />
                </div><br />
                <div>
                <label className='text-sm text-background m-1'>*Age</label>
                <Controller
                  name="age"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select {...field}>
                      <option value="">Select Age</option>
                      <option value="10대">10대</option>
                      <option value="20대">20대</option>
                      <option value="30대">30대</option>
                      <option value="30대">40대</option>
                      <option value="30대">50대</option>
                      <option value="30대">60대 이상</option>
                    </select>
                  )}
                />
              </div><br />
              <div>
              <label className='text-sm text-background m-1'>Introduce yourself!</label><br/>
                <Controller
                  name="introduction"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <textarea {...field} />}
                />
              </div><br />
              <button type="submit" className="text-background text-sm border">
                register
              </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}