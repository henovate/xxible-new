import React from 'react';
import Head from 'next/head';
import Header from './header/header';
import "../../../public/styles/main.css"                                                             

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
	<div>
	   <Header />
	  {children}
	</div>
  )
}

export default Layout
