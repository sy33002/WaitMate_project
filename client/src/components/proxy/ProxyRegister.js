import React from 'react';
import { useForm, Controller } from 'react-hook-form';

export default function ProxyRegister() {
  const { control, handleSubmit, formState } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // 여기서 데이터를 처리.
  };

  return (
    <div >
      <p className='z-100'>aaaaaaaaaaaaaaaaaaaa</p>
      <div className="relative">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute top-0 right-0 p-4 bg-primary shadow-md sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        >
          <div>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} />}
            />
          </div>
          <div>
            <label>주소</label>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <input {...field} />}
            />
          </div>
          <div>
            <label>성별</label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <select {...field}>
                  <option value="male">남성</option>
                  <option value="female">여성</option>
                </select>
              )}
            />
          </div>
          <div>
            <label>나이</label>
            <Controller
              name="age"
              control={control}
              rules={{ required: true, min: 18 }}
              render={({ field }) => <input type="number" {...field} />}
            />
          </div>
          <div>
            <label>자기 소개</label>
            <Controller
              name="introduction"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <textarea {...field} />}
            />
          </div>
          <button type="submit" disabled={formState.isSubmitting}>
            제출
          </button>
        </form>
      </div>
    </div>
  );
}
