import React from "react";
var datetime =()=>
    {
        var showdate= new Date();
        var displaytodaysdate= showdate.getDate()+'/'+showdate.getMonth()+'/'+showdate.getFullYear();
        return(
            <div>
                <input type='text' value={displaytodaysdate}/>
            </div>
        );
    }

export default datetime;