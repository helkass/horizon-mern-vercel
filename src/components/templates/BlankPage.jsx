import React from 'react';
import Alert from "../atoms/alerts/Alert";

const BlankPage = ({ onClick, message, error, success }) => {
  return (
    <main className='min-h-[437px] flex jusity-center items-center'>
        <Alert
            message={message}
            onClick={onClick}
            success={success}
            error={error}
        />
    </main>
  )
}

export default BlankPage