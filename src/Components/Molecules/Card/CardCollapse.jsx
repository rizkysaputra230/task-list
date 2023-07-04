import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { motionContentVariants, motionVariants } from "./CardCollapse.framer";
import CardCollapseHeader from "./CardCollapseHeader";

export const CardCollapse = (props = {}) => {
  const { children, headerClassName, initial, title, renderAction, count } = props
  const [isCollapse, setIsCollapse] = useState(initial === "open");

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
          count={count}
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
