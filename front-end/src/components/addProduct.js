import "../styles/signup.css";
import React, { useEffect, useState } from "react";

const addProduct = ()=>{
    return(
        <div className="register">
            <h1>Display Your product on Rewear</h1>
            <input className="inputBox" type="text" placeholder="Enter Name"
                
            />
            <input className="inputBox" type="text" placeholder="Enter Email"
                
            />
            <input className="inputBox" type="password" placeholder="Enter password"
                
            />
            <button className="appButton" type="button">Add Item</button>
        </div>
    )
}

export default addProduct