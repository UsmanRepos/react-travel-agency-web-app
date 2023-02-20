import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { db, auth } from '../firebase'
import VehicleTable from '../VehicleTable/VehicleTable';
import './Vehicle.css'

function Vehicle() {
    let navigate = useNavigate();

    const routeChange = () => {
        let path = '/VehicleScreen';
        navigate(path);
    }
    
    const [vehicletableData, setVehicleTableData] = useState([
        {
            vehicle_id: "",
            vehicle_no: "",
            chases_no: "",
            Model: "",
            tour_id: "",
        }]);

    const [allVehicles, setAllVehicles] = useState([])

    useEffect(() => {
        db.collection('travelAgency').doc(auth.currentUser.uid).collection('vehicles')
            .get().then((querySnapshot) => {
                let vehicles = []
                querySnapshot.forEach((doc) => {
                    vehicles.push(doc.data())
                });
                setAllVehicles(vehicles)
                setVehicleTableData(vehicles)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [])

    const [searchTerm, setSearchTerm] = useState(null)

    const handleSearch = () => {
        let vehicles = allVehicles.filter((item, index) => { 
            let record = item.vehicle_id + item.vehicle_no + item.chases_no + item.Model + item.tour_id + '';
            return record.includes(searchTerm)
        })
        setVehicleTableData(vehicles)
    }

    return (
        <div className="vehicle_screen_detail">
            <div className="vehicle_Screen_detail_header">
                <div className='vehicle_Screen_header_left'>
                    <input type="text" name='Tour_Name' className='vehicle_screen_detail_fields' placeholder='Search' 
                         value={searchTerm}
                         onChange={(e) => {
                             setSearchTerm( e.target.value)
                         }} 
                    />
                    <button className='button vehicle_screen_button' onClick={handleSearch}> Search </button>
                </div>
                <div className="vehicle_Screen_header_right">
                    <button className='button vehicle_screen_button'
                    onClick={routeChange}
                    > Add</button>
                </div>
            </div>
            <div className="vehicle_detail_body">
                <VehicleTable vehicletableData = {vehicletableData}/>
            </div>
        </div>
    )
}

export default Vehicle