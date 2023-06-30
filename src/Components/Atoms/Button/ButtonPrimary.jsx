import React from 'react'

export const ButtonPrimary = ({ type = 'button', label, isDisabled, width }) => {
  return (
    <>
      <button
        className={`rounded-xl shadow-sm px-3 py-3 bg-primary text-white font-semibold outline-none hover:bg-disabled ${width ? width : 'w-full'}`}
        disabled={isDisabled}
        type={type}
      >
        {label}
      </button>
    </>
  )
}

export default React.memo(ButtonPrimary)