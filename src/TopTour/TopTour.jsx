import { color } from '@mui/system';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { db, auth } from '../firebase'
import './TopTour.css'

function Table() {

    let navigate = useNavigate();
    const routeChange = (item) => {
        let path = '/TourDetail';
        navigate(path, {
            state: {
                tour: item
            }
        });
    }

    const [tourtableData, setTourTableData] = useState([{
        name: "",
        startdate: "",
        enddate: "",
        booking: "",
        price: "",
        status: "",
        tourdetail: "",
    }])

    const [provinces, setProvinces] = useState(['Punjab', 'Balochistan', 'Sindh', 'Kpk', 'Gilgit', 'Kashmir'])

    useEffect(() => {
        setTourTableData([])
        provinces.forEach(province => {
            db.collection('provinces').doc(province).collection('tours').where('travelAgencyID', '==', auth.currentUser.uid)
                .get().then((querySnapshot) => {
                    let tours = []
                    querySnapshot.forEach((doc) => {
                        tours.push(doc.data())
                    });
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

    const makeStatusStyle = (status) => {
        let style = {
            display: 'flex',
            flex: 1,
            height: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
        }

        if (status === 'approved') {
            return {
                ...style,
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            }
        }
        else if (status === 'pending') {
            return {
                ...style,
                color: 'red',
                background: '#ffadad8f'

            }
        }
        else {
            return {
                ...style,
                color: 'red',
                background: '#ffadad8f'
            }
        }

    }

    const makeBookingStyle = (booking) => {
        let style = {
            display: 'flex',
            flex: 1,
            height: '30px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '15px',
        }

        if (booking >= 18 ) {
            return {
                ...style,
                background: 'rgb(145 254 159 / 47%)',
                color: 'green',
            }
        }
        else if (booking >= 10) {
            return {
                ...style,
                color: 'white',
                background: '#FFC664'

            }
        }
        else {
            return {
                ...style,
                color: 'red',
                background: '#ffadad8f'
            }
        }

    }

    return (
        <div className="top_tour_table_">
            <h2 style={{ color: '#888888' }}>Tours</h2>
            <table className='top_table_content'>
                <tr className='top_tour_table_header'>
                    <th className='top_tour_table_header_cell'> Tour Name</th>
                    <th className='top_tour_table_header_cell'>Start Date</th>
                    <th className='top_tour_table_header_cell'> End Date</th>
                    <th className='top_tour_table_header_cell'> Booking</th>
                    <th className='top_tour_table_header_cell'>Price</th>
                    <th className='top_tour_table_header_cell'>Status</th>
                    <th className='top_tour_table_header_cell'></th>
                </tr>

                {tourtableData.map((item, index) => (
                    <tr className='top_tour_table_row' key={index}>
                        <td className='top_tour_table_cell'>{item.name}</td>
                        <td className='top_tour_table_cell'>{item.startdate}</td>
                        <td className='top_tour_table_cell'>{item.enddate}</td>
                        <td className='top_tour_table_cell'><span style={makeBookingStyle(item.booking)}>{item.booking}</span></td>
                        <td className='top_tour_table_cell'>{item.price}</td>
                        <td className='top_tour_table_cell' ><span style={makeStatusStyle(item.status)}>{item.status}</span></td>
                        <td className='top_tour_table_cell' onClick={() => routeChange(item)} style={{ cursor: 'pointer', color: 'blue' }}
                        >details...</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}


export default Table