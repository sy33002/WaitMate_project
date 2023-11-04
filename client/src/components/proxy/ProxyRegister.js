import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AddressSearchModal from '../proxy/AddressSearchModal';
import axios from 'axios'; 

export default function ProxyRegister() {
  const { control, handleSubmit, formState,setValue } = useForm();
  const [imageFile, setImageFile] = useState('/images/someone.png');
  const [inputAddressValue, setInputAddressValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log("onSubmit 들어옴!");
    const address = inputAddressValue;
    const addressParts = address.split(" ");
    const combinedAddress = addressParts[0] + " " + addressParts[1];
    console.log(combinedAddress);
  
    const formData = new FormData();
    formData.append('proxyAddress', combinedAddress);
    formData.append('title', data.title);
    formData.append('id', data.id);
    formData.append('gender', data.gender);
    formData.append('age', data.age);
    formData.append('proxyMsg', data.proxyMsg);
   
    if (data.photo[0]) {
      formData.append('photo', data.photo[0]);
    }

    axios({
      url: 'http://localhost:8080/proxy/proxyTest',
      method: 'post',
      data: formData,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
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
                  type="file"
                  name="photo"
                  onChange={(e) => {
                    handleFileChange(e);
                  }}
                />
              </div>
              <div>
                <div>
                    <label className='text-sm text-background m-1'>*Title</label>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => <input {...field} placeholder="소개 제목"/>}
                    />
                  </div><br />
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
                  *Address
                </label>
                  <input
                    name='Address'
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