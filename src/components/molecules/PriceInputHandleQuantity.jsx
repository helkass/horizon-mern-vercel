import React from 'react'
import InputPrices from '../atoms/inputs/InputPrices';
import HandleQuantity from './HandleQuantity';

const PriceInputHandleQuantity = ({decrement, increment, size, nameInput, htmlFor, priceValue, valueQuantity }) => {
  return (
    <div className="flex justify-between items-center">
        <InputPrices
            size={size}
            nameInput={nameInput}
            htmlFor={htmlFor}
            priceValue={priceValue}
        />
        <HandleQuantity
          input={true}
          nameInput={nameInput}
          value={valueQuantity}
          increment={increment}
          decrement={decrement}
        />
  </div>
  )
}

export default PriceInputHandleQuantity;