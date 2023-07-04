import InputUpload from '@/Components/Atoms/Input/InputUpload';
import { Layout } from '@/Components/Molecules/Layouts/Layout';
import { PostAPIFile } from '@/Helpers/Api';
import { formOptions } from '@/Utils/Validation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ButtonPrimary from '../../Atoms/Button/ButtonPrimary';
import InputText from '../../Atoms/Input/InputText';

export const Register = () => {
  const { register, setError, setValue, getValues, watch, handleSubmit, formState: { errors, isValid } } = useForm({
    ...formOptions, defaultValues: {
      phone: ''
    }
  })
  const [isLoading, setIsLoading] = useState(null)
  const router = useRouter()

  const handlePhone = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setValue('phone', value);
  }

  const onSubmit = async (data) => {
    setIsLoading(true)

    let payload = new FormData()
    payload.append('name', data.name)
    payload.append('email', data.email)
    payload.append('phone', data.phone)
    payload.append('password', data.password)
    payload.append('repeat_password', data.repeat_password)
    payload.append('upload_photo', data.upload_photo)
    payload.append('upload_cv', data.upload_cv)

    const response = await PostAPIFile({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
      payload: payload,
      header: {
        'Content-Type': 'multipart/form-data'
      },
      message: {
        success: 'Register successful',
      },
      setError: setError,
    })

    const { errors } = response
    if (!errors) {
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', response.user)
      localStorage.setItem('photo', response.photo)
      router.push('/dashboard')
    }
    if (errors) {
      toast.error('Register unsuccessful')
    }

    setIsLoading(false)
  }

  return (
    <>
      <Layout>
        <div className="flex min-h-screen justify-center items-center">
          <div className="bg-white lg:w-[460px] rounded-xl lg:border px-8 py-8 w-11/12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-gray-600 text-3xl font-bold">Register</h2>
            </div>
            <div className="mt-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-3">
                  <InputText
                    htmlFor={'name'}
                    fieldName={'name'}
                    label={'Name'}
                    placeholder={'Input your full name'}
                    type={'text'}
                    registerUseForm={register}
                    rules={
                      {
                        required: {
                          value: true,
                          message: "Name is required"
                        }
                      }
                    }
                  />

                  {errors.name && <p className="text-danger text-sm font-semibold">{errors.name.message}</p>}

                  <InputText
                    htmlFor={'email'}
                    fieldName={'email'}
                    label={'Email'}
                    placeholder={'Example@gmail.com'}
                    type={'text'}
                    registerUseForm={register}
                    rules={
                      {
                        required: {
                          value: true,
                          message: "Email is required"
                        },
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Entered value does not match email format"
                        }
                      }
                    }
                  />

                  {errors.email && <p className="text-danger text-sm font-semibold">{errors.email.message}</p>}

                  <InputText
                    htmlFor={'phone'}
                    fieldName={'phone'}
                    label={'Phone Number'}
                    placeholder={'+628xx-xxxx-xxxx'}
                    type={'text'}
                    registerUseForm={register}
                    onInput={handlePhone}
                    rules={
                      {
                        required: {
                          value: true,
                          message: "Phone is required"
                        },
                      }
                    }
                  />

                  {errors.phone && <p className="text-danger text-sm font-semibold">{errors.phone.message}</p>}

                  <InputText
                    htmlFor={'password'}
                    fieldName={'password'}
                    label={'Password'}
                    placeholder={'Input your password'}
                    type={'password'}
                    togglePassword={true}
                    registerUseForm={register}
                    rules={
                      {
                        required: {
                          value: true,
                          message: "Password is required"
                        }
                      }
                    }
                  />

                  {errors.password && <p className="text-danger text-sm font-semibold">{errors.password.message}</p>}

                  <InputText
                    htmlFor={'repeat-password'}
                    fieldName={'repeat_password'}
                    label={'Repeat Password'}
                    placeholder={'Input your password'}
                    type={'password'}
                    togglePassword={true}
                    registerUseForm={register}
                    rules={
                      {
                        required: {
                          value: true,
                          message: "Password is required"
                        }
                      }
                    }
                  />

                  {errors.repeat_password && <p className="text-danger text-sm font-semibold">{errors.repeat_password.message}</p>}

                  {watch("repeat_password") !== watch("password") &&
                    getValues("repeat_password") ? (
                    <p className="text-danger text-sm font-semibold">Password not match</p>
                  ) : null}

                  <InputUpload
                    htmlFor={'image'}
                    fieldName={'upload_photo'}
                    label={'Image Upload'}
                    placeholder={'Upload your image'}
                    accept={"image/png,image/gif,image/jpeg"}
                    onChange={(e) => {
                      const photo = e.target.files[0]
                      setValue('upload_photo', photo)
                    }}
                  />

                  <InputUpload
                    htmlFor={'cv'}
                    fieldName={'upload_cv'}
                    label={'CV Upload'}
                    placeholder={'Upload your cv'}
                    accept={"application/pdf,application/msword"}
                    onChange={(e) => {
                      const cv = e.target.files[0]
                      setValue('upload_cv', cv)
                    }}
                  />

                  <div className="pt-8">
                    <ButtonPrimary
                      label={'Sign In'}
                      type={'submit'}
                      loading={isLoading}
                      isDisabled={!isValid}
                    />
                    <div className="text-center pt-3">
                      <span className="text-sm font-normal">Already have an account? <Link href="/login" className="cursor-pointer text-primary">Sign In</Link></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default React.memo(Register)