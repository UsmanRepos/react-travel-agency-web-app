import React from 'react'
import { UpdatesData } from '../../Data/Data'
import './Update.css'

function Update() {
    console.log("Updates data",UpdatesData);
    return (
        <div className="Updates">
            {UpdatesData.map((update,index) => {
                
                return (
                    <div className="update" key={index}>
                        <img src={update.img} alt=""/>
                        <div className="noti">
                            <div style={{
                                marginBottom:"0.5rem"
                            }}>
                                <span>{update.name}</span>
                                <span> {update.noti}</span>
                                

                            </div>
                            <div>
                                <span>{update.time}</span>
                            </div>
                        </div>
                    </div>
                )
                    

            })}

        </div>
    )
}

export default Update