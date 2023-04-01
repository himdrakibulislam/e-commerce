import React from 'react';

import { Outlet } from "react-router-dom";
import Nav from './Nav';
import Cart from '../pages/cart/Cart';
import Footer from './Footer';
import Search from '../components/Search';
import WhatsAppWidget from 'react-whatsapp-chat-widget';
import "react-whatsapp-chat-widget/index.css";

const Main = () => {
    return (
        <>
       <WhatsAppWidget
			phoneNo="01775088249"
			position="right"
			widgetWidth="300px"
			widgetWidthMobile="260px"
			autoOpen={true}
			autoOpenTimer={5000}
			messageBox={true}
			messageBoxTxt="Hi Team, is there any related service available ?"
			iconSize="40"
			iconColor="white"
			iconBgColor="tomato"
			// headerIcon={logo}
			headerIconColor="pink"
			headerTxtColor="black"
			headerBgColor="tomato"
			headerTitle="Ekantomart"
			headerCaption="Online"
			bodyBgColor="#bbb"
			chatPersonName="Support"
			chatMessage={<>Hi there 👋 <br /><br /> How can I help you?</>}
			footerBgColor="#999"
			placeholder="Type a message.."
			btnBgColor="green"
			btnTxt="Start Chat"
			btnTxtColor="white"
		/>
        <Nav/>
        <Cart/>
        <Search/>
        <Outlet/>
        <Footer/>
        </>
    );
};

export default Main;