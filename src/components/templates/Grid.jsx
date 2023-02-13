import React from 'react'

const GridMdFour = ({children, styledCustom}) => {
  return (
    <main className={`grid lg:grid-cols-4 grid-cols-2 sm:grid-cols-3 gap-2 px-4 ${styledCustom}`}>
        {children}
    </main>
  )
}

export default GridMdFour;