import { Typography } from '@material-ui/core';
import React from 'react'
import CircleLoader from "react-spinners/CircleLoader";
const Lodding = () => {
    return ( 
        <div style={{zIndex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white',height:'100vh'}}>
            <CircleLoader color='black' size={110}/>
            <Typography variant='h6' style={{marginTop:30}}>در حال ارتباط با سرور هستیم لطفا چند لحضه منتظر بمانید</Typography>
        </div>
    );
}
 
export default Lodding;