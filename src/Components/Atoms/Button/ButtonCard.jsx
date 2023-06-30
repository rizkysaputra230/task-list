import React from 'react'

export const ButtonCard = ({ borderColor, textColor, label }) => {
  return (
    <button
      className={`px-8 py-3 border-2 bg-white text-center rounded-xl text-sm font-bold ${borderColor} ${textColor}`}
    >
      {label}
    </button >
  )
}

export default React.memo(ButtonCard)