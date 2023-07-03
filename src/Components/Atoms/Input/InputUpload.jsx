import React, { useRef, useState } from "react"

export const InputUpload = (props = {}) => {
  const {
    isDisabled,
    fieldName,
    htmlFor,
    label,
    placeholder,
    accept = '',
    onChange,
    registerUseForm,
    rules = []
  } = props

  const [uploadValue, setUploadValue] = useState()
  const inputFileRef = useRef()

  const onFileChange = (e) => {
    if (onChange) {
      onChange(e)
    }

    if (e.target.files.length > 0) {
      const { target } = e
      const files = target.files[0]
      const name = files.name
      setUploadValue(name)
    }
  }

  const onClickInputFile = () => {
    inputFileRef.current.click();
  }

  return (
    <>
      <div>
        <label
          htmlFor={htmlFor}
          className="block text-medium font-normal leading-6 text-label"
        >
          {label}
          <div className='flex justify-between mt-1'>
            <input
              className="md:w-3/4 w-2/3 rounded-xl px-4 py-3 shadow-sm bg-transparent border-2 ring-0 outline-none focus:ring-0 border-[#D8D8D8] focus:border-primary placeholder:!text-[#90909090] pr-2"
              type="text"
              placeholder={uploadValue ? uploadValue : placeholder}
              disabled
            />
            <input
              ref={inputFileRef}
              id={fieldName}
              name={fieldName}
              className="hidden"
              type="file"
              accept={accept}
              onChange={onFileChange}
              {...(registerUseForm
                ? {
                  ...registerUseForm(fieldName, rules),
                }
                : {})}
            />
            <button
              className="md:w-1/5 w-1/4 border-2 rounded-xl px-4 py-3 bg-primary text-white text-center"
              type="button"
              onClick={onClickInputFile}
            >
              Add
            </button>
          </div>
        </label>
      </div>
    </>
  )
}

export default React.memo(InputUpload)
