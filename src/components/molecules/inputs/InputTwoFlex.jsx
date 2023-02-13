import React from 'react';
import InputReadDefaultValue from '../../atoms/inputs/InputReadDefaultValue';

const InputTwoFlex = ({border, label1, label2, type1, type2, inputName1, inputName2, defaultValue1, styledCustom, defaultValue2 }) => {
  return (
    <div className={`flex sm:gap-2 gap-3 sm:flex-row flex-col ${styledCustom}`}>
        <InputReadDefaultValue
          name={inputName1}
          defaultValue={defaultValue1}
          type={type1}
          label={label1}
          border={border}
        />
        <InputReadDefaultValue
          name={inputName2}
          defaultValue={defaultValue2}
          type={type2}
          label={label2}
          border={border}
        />
    </div>
  )
}

export default InputTwoFlex;