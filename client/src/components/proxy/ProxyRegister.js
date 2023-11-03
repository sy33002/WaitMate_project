import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddressSearchModal from '../proxy/AddressSearchModal';
import axios from 'axios'; 

export default function ProxyRegister() {
  const { control, handleSubmit, formState,setValue } = useForm();
  const [imageFile, setImageFile] = useState('/images/someone.png');
  const [inputAddressValue, setInputAddressValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickRegister, setClickRegister] = useState(false);

  const onSubmit = async (data) => {
    console.log("onSubmit 들어옴!");
      const address = inputAddressValue;
      const addressParts = address.split(" ");
      const combinedAddress = addressParts[0] + " " + addressParts[1];
      console.log(combinedAddress);
      const data1 = {
        proxyAddress: combinedAddress,
        title: data.title,
        id: data.id,
        gender: data.gender,
        age: data.age,
        proxyMsg: data.proxyMsg,
      };
      console.log(data1);
      axios({
        url : 'http://localhost:8080/proxy/proxyTest',
        method : 'post',
        data : data1,
      })
      .then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.error(err);
      })
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
                    <label className='text-sm text-background m-1'>*Title (100자 이내)</label><br/>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: true,  maxLength: 100 }}
                      render={({ field }) => <input {...field} placeholder="자기소개에 대한 제목을 지어주세요!"/>}
                    />
                    {formState.errors.title && clickRegister && (
                      <p className="text-red-500">
                        {formState.errors.title.type === 'required'
                          ? '제목은 필수 항목입니다 :D'
                          : '제목은 100자 이내로 입력해주세요'}
                      </p>
                    )}
                  </div><br />
                <div>
                <label className="text-sm text-background m-1">
                  *Address
                </label>
                  <input
                    name='Address'
                    className="w-full"
                    placeholder="주소"
                    value={inputAddressValue}
                    readOnly
                    onChange={(e) => setInputAddressValue(e.target.value)}
                  />
                  <button onClick={() => {setIsModalOpen(true); 
                    setValue('address', '');}}>주소 검색</button>
                  {isModalOpen && (
                    <AddressSearchModal
                      setInputAddressValue={setInputAddressValue}
                      isModalOpen={isModalOpen}
                      setIsModalOpen={setIsModalOpen}
                    />
                  )}
                  {inputAddressValue === ''  && clickRegister && (<p className="text-red-500">주소는 필수 항목입니다 :D</p>)}
                </div><br />
                <div>
                <label className='text-sm text-background m-1'>*Gender</label>
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
                  {formState.errors.gender && clickRegister && (
                      <p className="text-red-500">성별은 필수 항목입니다 :D</p>
                    )}
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
                      <p className="text-red-500">나이는 필수 항목입니다 :D</p>
                    )}
              </div><br />
              <div>
              <label className='text-sm text-background m-1'>Introduce yourself!</label><br/>
                <Controller
                  name="proxyMsg"
                  control={control}
                  rules={{ required: false }}
                  render={({ field }) => <textarea {...field} />}
                />
              </div><br />
              <button type="submit" 
                onClick={() => setClickRegister(true)}
                className="text-background text-sm border">
                register
              </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}