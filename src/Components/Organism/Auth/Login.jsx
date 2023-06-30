import { Layout } from '@/Components/Molecules/Layouts/Layout';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import { formOptions } from '../../../Utils/Validation';
import ButtonPrimary from '../../Atoms/Button/ButtonPrimary';
import InputText from '../../Atoms/Input/InputText';

export const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm(formOptions)

  const onSubmit = (data) => {

  }

  return (
    <>
      <Layout>
        <div className="flex min-h-screen justify-center items-center">
          <div className="bg-white lg:w-[460px] rounded-xl lg:border px-8 py-8 w-11/12">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-gray-600 text-3xl font-bold">Log In</h2>
            </div>
            <div className="mt-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-y-3">
                  <InputText
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

                  <div className="flex justify-between">
                    <div className="flex gap-x-2">
                      <input
                        className="pr-2"
                        type="radio"
                      />
                      Remember Me
                    </div>
                    <div>
                      <span>Forgot Password?</span>
                    </div>
                  </div>
                  <div className="pt-8">
                    <ButtonPrimary
                      label={'Sign In'}
                      type={'submit'}
                    />
                    <div className="text-center pt-3">
                      <span className="text-sm font-normal">Dont Have Account? <Link href="/register" className="cursor-pointer text-primary">Sign Up</Link></span>
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

export default React.memo(Login)