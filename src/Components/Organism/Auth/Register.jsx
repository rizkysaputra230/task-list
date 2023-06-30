import InputUpload from '@/Components/Atoms/Input/InputUpload';
import { Layout } from '@/Components/Molecules/Layouts/Layout';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import ButtonPrimary from '../../Atoms/Button/ButtonPrimary';
import InputText from '../../Atoms/Input/InputText';

export const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data) => {

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
                    rules={
                      {
                        required: {
                          value: true,
                          message: "Email is required"
                        }
                      }
                    }
                  />

                  {errors.email && <p className="text-danger text-sm font-semibold">{errors.email.message}</p>}

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
                    fieldName={'repeat-password'}
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

                  {errors.password && <p className="text-danger text-sm font-semibold">{errors.password.message}</p>}

                  <InputUpload
                    htmlFor={'image'}
                    label={'Image Upload'}
                    placeholder={'Upload your image'}
                  />

                  <InputUpload
                    htmlFor={'cv'}
                    label={'CV Upload'}
                    placeholder={'Upload your cv'}
                  />

                  <div className="pt-8">
                    <ButtonPrimary
                      label={'Sign In'}
                      type={'submit'}
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