import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    
    let {user,token} =useSelector((state)=>state.auth)
    const Navigate=useNavigate();
 useEffect(()=>{
    if (! token && !user) {
         Navigate("/login");
      }
 },[token,user])
 return(
    <>
    {
        children
    }
    </>
 )
  


}
