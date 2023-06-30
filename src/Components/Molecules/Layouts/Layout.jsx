import { Inter } from "next/font/google";
import React from 'react';

const inter = Inter({ subsets: ["latin"] });
export const Layout = ({ children, useHeader }) => {
  return (
    <>
      <div className={`bg-slate-200 min-h-screen w-full ${inter.className}`}>
        {useHeader ?
          <header
            className="z-[99] h-[70px] bg-white border-b fixed top-0 w-full flex items-center justify-end shadow-sm"
          >
            <div className="flex container mx-auto items-center justify-end px-4">
              <div className="flex self-end gap-x-5 items-center">
                <div>
                  Gilang
                </div>

                <img
                  className="rounded-full w-12 h-12 border-1 border-gray-200"
                  src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png" alt="" />
                <button
                  className="w-full border-2 rounded-xl px-8 py-3 bg-dangers text-white text-center bg-logout"
                  type="button"
                >
                  Log out
                </button>
              </div>
            </div>
          </header>
          : null}
        <main className={useHeader ? 'pt-[90px] min-h-screen' : 'min-h-screen'}>
          {children}
        </main>
      </div>
    </>
  )
}

export default React.memo(Layout)