import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import OutsideWrapperElement from "react-click-outside-element";
import { motionContentVariants, motionVariants } from "./CardCollapse.framer";
import CardCollapseHeader from "./CardCollapseHeader";

export const CardCollapse = (props = {}) => {
  const { children, headerClassName, initial, title, buttonAction, renderAction } = props
  const [isCollapse, setIsCollapse] = useState(initial === "open");
  const [showAction, setShowAction] = useState(false);

  const toggleShowAction = () => {
    setShowAction((prev) => !prev);
  };

  const toggleCollapse = () => {
    setIsCollapse((prev) => !prev);
  }

  return (
    <>
      <div className="border rounded-xl select-none">
        <CardCollapseHeader
          isCollapse={isCollapse}
          onClick={toggleCollapse}
          title={title}
          className={headerClassName}
        />
        <AnimatePresence initial={false}>
          {isCollapse && (
            <motion.div
              initial={"collapsed"}
              animate={"open"}
              variants={motionVariants}
              exit="collapsed"
              className="bg-white rounded-b-xl"
              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <motion.div
                variants={motionContentVariants}
                transition={{ duration: 0.5 }}
                className="p-5"
              >
                <div className="relative">
                  <div className="flex justify-between items-center">
                    {children}
                    {buttonAction ? (
                      <OutsideWrapperElement
                        onClickOutside={(e) => {
                          alert('test')
                        }}
                      >
                        <button type="button" onClick={toggleShowAction}>
                          <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g>
                              <path d="M15.125 12C15.125 12.5192 14.971 13.0267 14.6826 13.4584C14.3942 13.8901 13.9842 14.2265 13.5045 14.4252C13.0249 14.6239 12.4971 14.6758 11.9879 14.5746C11.4787 14.4733 11.011 14.2233 10.6438 13.8562C10.2767 13.489 10.0267 13.0213 9.92544 12.5121C9.82415 12.0029 9.87614 11.4751 10.0748 10.9955C10.2735 10.5158 10.61 10.1058 11.0416 9.81739C11.4733 9.52895 11.9808 9.375 12.5 9.375C13.1954 9.37747 13.8617 9.65483 14.3534 10.1466C14.8452 10.6383 15.1225 11.3046 15.125 12ZM5 9.375C4.48083 9.375 3.97331 9.52895 3.54163 9.81739C3.10995 10.1058 2.7735 10.5158 2.57482 10.9955C2.37614 11.4751 2.32415 12.0029 2.42544 12.5121C2.52673 13.0213 2.77673 13.489 3.14385 13.8562C3.51096 14.2233 3.97869 14.4733 4.48789 14.5746C4.99709 14.6758 5.52489 14.6239 6.00455 14.4252C6.4842 14.2265 6.89417 13.8901 7.18261 13.4584C7.47105 13.0267 7.625 12.5192 7.625 12C7.62253 11.3046 7.34518 10.6383 6.85343 10.1466C6.36168 9.65483 5.69543 9.37747 5 9.375ZM20 9.375C19.4808 9.375 18.9733 9.52895 18.5416 9.81739C18.11 10.1058 17.7735 10.5158 17.5748 10.9955C17.3761 11.4751 17.3242 12.0029 17.4254 12.5121C17.5267 13.0213 17.7767 13.489 18.1438 13.8562C18.511 14.2233 18.9787 14.4733 19.4879 14.5746C19.9971 14.6758 20.5249 14.6239 21.0045 14.4252C21.4842 14.2265 21.8942 13.8901 22.1826 13.4584C22.471 13.0267 22.625 12.5192 22.625 12C22.6225 11.3046 22.3452 10.6383 21.8534 10.1466C21.3617 9.65483 20.6954 9.37747 20 9.375Z" fill="#737373" />
                            </g>
                            <defs>
                              <clipPath id="clip0_163_1338">
                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </OutsideWrapperElement>
                    ) : null}
                    {renderAction && showAction && (
                      <div className="absolute top-6 -right-10 bg-white border rounded-lg p-3 w-[120px]">
                        {renderAction}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default React.memo(CardCollapse)
