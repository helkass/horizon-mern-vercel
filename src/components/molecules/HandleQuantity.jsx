import React from 'react';
import { ButtonIcon } from '../atoms/button/Button';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const HandleQuantity = ({value, increment, decrement, input, nameInput }) => {
    return (
        <div className="flex gap-2 items-center">
            <ButtonIcon onClick={decrement}>
              <AiOutlineMinus size={16}/>
            </ButtonIcon>
            {
                input ? (
                <input
                    name={nameInput}
                    readOnly
                    value={value}
                    className="sm:w-8 w-5 text-center bg-transparent"
                />
            ) : <span>{value}</span>
            }
            <ButtonIcon onClick={increment}>
              <AiOutlinePlus size={16}/>
            </ButtonIcon>
        </div>
    )
    
}

export default HandleQuantity;