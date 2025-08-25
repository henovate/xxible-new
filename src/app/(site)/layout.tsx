import React from 'react';
import Head from 'next/head';
import Header from './components/header/header';
import "../../../public/styles/main.css"                                                             
import Footer from './components/footer/footer';

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
	<div>
	   <Header />
	  {children}
	  <Footer />
	</div>
  )
}

export default Layout
