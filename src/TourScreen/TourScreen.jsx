import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './TourScreen.css'
import TourTable from '../component/TourTable/TourTable'
import { db, auth } from '../firebase'



function TourScreen() {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = '/AddTours';
        navigate(path);
    }
    const [tourtableData, setTourTableData] = useState([{
        tourname: "",
        startdate: "",
        enddate: "",
        booking: "",
        price: "",
        status: "",
        tourdetail: "",
    }])
    const [allTours, setAllTours] = useState([])
    const [searchTerm, setSearchTerm] = useState(null)

    const [provinces, setProvinces] = useState(['Punjab', 'Balochistan', 'Sindh', 'Kpk', 'Gilgit', 'Kashmir'])

    useEffect(() => {
        setAllTours([])
        setTourTableData([])
        provinces.forEach(province => {

            db.collection('provinces').doc(province).collection('tours').where('travelAgencyID', '==', auth.currentUser.uid)
                .get().then((querySnapshot) => {
                    let tours = []
                    querySnapshot.forEach((doc) => {
                        tours.push(doc.data())
                    });
                    setAllTours((p) => {
                        return [
                            ...p,
                            ...tours
                        ]
                    })
                    setTourTableData((p) => {
                        return [
                            ...p,
                            ...tours
                        ]
                    })
                    
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        })


    }, [])

    const handleSearch = () => {
        let tours = allTours.filter((item, index) => {
            let record = item.name + '';
            record = record.toLowerCase()
            return record.includes(searchTerm.toLowerCase())
        })
        setTourTableData(tours)
    }

    return (

        <div className="tour_screen_detail">
            <div className="tour_Screen_detail_header">
                <div className='tour_Screen_header_left'>
                    <input type="text" name='Tour_Name' className='tour_screen_detail_fields' placeholder='Search'
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm( e.target.value)
                    }} 
                    />
                    <button className='button tour_screen_button' onClick={handleSearch}> Search </button>
                </div>
                <div className="tour_Screen_header_right">
                    <button className='button tour_screen_button'
                        onClick={routeChange}
                    > Add Tour </button>
                </div>
            </div>
            <div className="tour_detail_body">
                <TourTable tourtableData={tourtableData} />
            </div>
        </div>



    )
}

export default TourScreen