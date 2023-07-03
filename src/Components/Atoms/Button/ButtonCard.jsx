import React from 'react'

export const ButtonCard = ({ borderColor, textColor, hoverColor, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 border-2 bg-white text-center rounded-xl text-sm font-bold ${borderColor} ${textColor} ${hoverColor}`}
    >
      {label}
    </button >
  )
}

export default React.memo(ButtonCard)