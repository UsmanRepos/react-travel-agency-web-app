import React, { useState }  from 'react'
import Logo from '../imgs/logo.png'
import { SidebarData } from '../Data/Data'
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import './Sidebar.css'


const Sidebar = ({toggleModal, selected}) => {

    let navigate = useNavigate();   
    const [pathName, setPathName] = useState("/")

    const routeChange = (path) => {
        navigate(path);
    }

    return (
        <div className="Sidebar">

            {/* <Link to = {pathName} style = {{ textDecoration: 'none', color: 'black'}} > */}
            {/* logo */}
            <div className="logo">
                <img src={Logo} alt='' />
                <span>
                    Tri<span>p</span>ak
                </span>
            </div>
            {/* menu item */}
            <div className="menu">
                {SidebarData.map((item, index) => {
                    return (
                        <div className={selected == index ? 'menuItem active' : 'menuItem'}
                            key={index}
                            onClick={() => {
                                // setSelected(index)
                                if (item.heading == 'Dashboard') {
                                    routeChange("/Home");
                                }
                                else if (item.heading == 'Vehicle') {
                                    routeChange("/MainVehicle")
                                }
                                else if (item.heading == 'Profile') {
                                    routeChange("/MainProfile")
                                }
                                else if (item.heading == 'SignOut') {
                                    toggleModal();
                                }
                                else {
                                    routeChange("/" + item.heading);
                                }
                            }} >
                            <item.icon />
                            <span>{item.heading}</span>
                        </div>
                    )

                })}
                <div className="menuItem" onClick={() => navigate(-1)} >
                    <UilSignOutAlt />
                </div>
               
           
        </div>
           
        </div >
    )
}

export default Sidebar