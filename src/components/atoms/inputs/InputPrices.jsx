import React from 'react'

const InputPrices = ({ priceValue, htmlFor, size, nameInput }) => {
  return (
        <>
            <label htmlFor={htmlFor} className=" w-1/2 text-sm">
            {size}
            </label>
            <div>
              <span>Rp.</span>
              <input
                name={nameInput}
                id={nameInput}
                value={priceValue}
                readOnly
                className="w-12"
              />
            </div>
        </>
    )
}

export default InputPrices;