import React from 'react'

export const IconWithTitle = ({title, icon}) => {
    const Icon = icon
  return (
    <div className="w-4/12 hover-1 py-2 rounded">
        <Icon size={20} className="m-auto"/>
        <span>{title}</span>
    </div>
  )
}