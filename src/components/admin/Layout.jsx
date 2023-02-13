import React from 'react'
import Header from "./Header";
import Content from "./Content";

const Layout = ({children}) => {
  return (
    <main>
        <Header/>
        <Content>
            {children}
        </Content>
    </main>
  )
}

export default Layout