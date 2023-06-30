import React from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

export const CardCollapseHeader = (props = {}) => {
  const { className = '', title, isCollapse, onClick } = props
  return (
    <button
      type={"button"}
      className={`flex w-full justify-between items-center p-5 bg-primary active:bg-primary/90 hover:bg-primary/95 rounded-t-xl text-white transition duration-300 ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-row">
        <h3 className="text-medium font-semibold">{title}</h3>
        <span className="pl-4">4 Task</span>
      </div>
      <div className="text-xl font-semibold">
        {isCollapse ? <BiSolidDownArrow /> : <BiSolidUpArrow />}
      </div>
    </button>
  )
}

export default React.memo(CardCollapseHeader)