import React from 'react'

export const ButtonPrimary = ({ type = 'button', label, width, loading, isDisabled }) => {
  return (
    <>
      <button
        className={`rounded-xl shadow-sm px-3 py-3 bg-primary text-white font-semibold outline-none hover:bg-disabled ${width ? width : 'w-full'} ${isDisabled ? 'cursor-not-allowed !bg-opacity-50' : ''}`}
        type={type}
        disabled={isDisabled}
      >
        {loading ? 'Loading...' : label}
      </button>
    </>
  )
}

export default React.memo(ButtonPrimary)