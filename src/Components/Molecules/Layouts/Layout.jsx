import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Layout = ({ children, useHeader, user = null }) => {
  const [isLogout, setIsLogout] = useState(null)
  const router = useRouter()

  const logoutUser = (data) => {
    setIsLogout(true)
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/')
    })
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={`bg-slate-200 min-h-screen w-full`}>

        {useHeader ?
          <header
            className="z-[99] h-[70px] bg-white border-b fixed top-0 w-full flex items-center justify-end shadow-sm"
          >
            <div className="flex container mx-auto items-center justify-end px-4">
              <div className="flex self-end gap-x-5 items-center">
                <span className="text-lg font-medium">
                  {user}
                </span>
                <img
                  className="rounded-full w-12 h-12 border-1 border-gray-200"
                  src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png" alt="" />
                <button
                  className="w-full border-2 rounded-xl px-8 py-3 bg-dangers text-white text-center bg-logout"
                  type="button"
                  onClick={logoutUser}
                >
                  {isLogout
                    ? <Spin indicator={antIcon} />
                    : <>
                      <span className="max-lg:hidden">Log out</span>
                      <span className="lg:hidden">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.62516 16.5C8.62516 16.845 8.34516 17.125 8.00016 17.125H4.66683C2.48433 17.125 0.708496 15.3492 0.708496 13.1667V4.83333C0.708496 2.65083 2.48433 0.875 4.66683 0.875H8.00016C8.34516 0.875 8.62516 1.155 8.62516 1.5C8.62516 1.845 8.34516 2.125 8.00016 2.125H4.66683C3.1735 2.125 1.9585 3.34 1.9585 4.83333V13.1667C1.9585 14.66 3.1735 15.875 4.66683 15.875H8.00016C8.34516 15.875 8.62516 16.155 8.62516 16.5ZM15.1085 8.55831L11.7752 5.22498C11.531 4.98081 11.1352 4.98081 10.891 5.22498C10.6468 5.46914 10.6468 5.865 10.891 6.10917L13.1577 8.37581H6.3335C5.9885 8.37581 5.7085 8.65581 5.7085 9.00081C5.7085 9.34581 5.9885 9.62581 6.3335 9.62581H13.1577L10.891 11.8925C10.6468 12.1366 10.6468 12.5325 10.891 12.7767C11.0127 12.8983 11.1727 12.96 11.3327 12.96C11.4927 12.96 11.6527 12.8992 11.7743 12.7767L15.1077 9.44332C15.3527 9.19748 15.3527 8.80248 15.1085 8.55831Z" fill="white" />
                        </svg>
                      </span>
                    </>
                  }
                </button>
              </div>
            </div>
          </header>
          : null}
        <main className={useHeader ? 'pt-[90px] min-h-screen' : 'min-h-screen'}>
          {children}
        </main>
      </div >
    </>
  )
}

export default React.memo(Layout)