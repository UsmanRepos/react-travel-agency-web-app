import React from 'react'
import { useState, useEffect } from 'react'
import './VehicleDetail.css'
import { db, auth } from '../firebase'
import { useNavigate, useLocation, useParams } from "react-router-dom";

function VehicleDetail() {
    let navigate = useNavigate();
    let location = useLocation()

    const routeChange = (item) => {
        let path = '/VehicleLocation';
        navigate(path, {
            state: {
                vehicle: item
            }
        });
    }

    let vehicle = location.state.vehicle
    const [vehicleInFo, setVehicleInfo] = useState(location.state.vehicle);

    const [driverInFo, setDriverInfo] = useState([{
        name: "",
        id: "",
        address: "",
        phone: "",
        email: "",
        vehicle_id: "",
    }]);

    useEffect(() => {
        setVehicleInfo(vehicle)
        db.collection('travelAgency').doc(auth.currentUser.uid).collection('vehicles').doc(vehicle.vehicle_id).collection('drivers')
            .get().then((querySnapshot) => {
                let drivers = []
                querySnapshot.forEach((doc) => {
                    drivers.push(doc.data())
                });
                setDriverInfo(drivers)
                console.log(drivers)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [])

    const handleUpdate = () => {
        const vehicleRef = db.collection('travelAgency').doc(auth.currentUser.uid).collection('vehicles').doc(vehicleInFo.vehicle_id);
        vehicleRef.update(vehicleInFo);
        for (let i = 0; i < driverInFo.length; i++) {
            vehicleRef.collection('drivers').doc(driverInFo[i].driver_id).update(driverInFo[i]);
        }
    }

    const handleDelete = () => {
        db.collection('travelAgency').doc(auth.currentUser.uid).collection('vehicles').doc(vehicleInFo.vehicle_id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const routeChange1 = () => {
        let path = '/MainVehicle';
        navigate(path);
    }

    return (
        <div className='vehicle_detail_container'>
            <div className='vehicle_detail_AppGlass'>
                <div className="vehicle_detail">
                    <div className="vehicle_detail_header">
                        <div className='button_wrapper'>
                            <button className='button vehicle_detail_button' style={{}} onClick={routeChange1}> Back </button>
                        </div>

                        <button className='button vehicle_detail_button'
                            onClick={() => routeChange(vehicle)}> Location
                        </button>
                        <button className='button vehicle_detail_button' onClick={handleUpdate}> Update
                        </button>
                        <button className='button vehicle_detail_button' onClick={handleDelete}> Delete
                        </button>
                    </div>
                    <div className="vehicle_detail_body">
                        <div className="form2">
                            <div className="vehicle_detail_body_left">
                                <fieldset>
                                    <legend>Vehicle Details</legend>
                                    <input type="text" name='vehicle_id' className='vehicle_detail_fields' placeholder='Vehicle Id'
                                        value={vehicleInFo.vehicle_id}
                                        onChange={(e) => {
                                            setVehicleInfo({
                                                ...vehicleInFo,
                                                'vehicle_id': e.target.value
                                            })
                                        }}

                                    />

                                    <input type="text" name='vehicle_no' className='vehicle_detail_fields' placeholder='Vehicle No'
                                        value={vehicleInFo.vehicle_no}
                                        onChange={(e) => {
                                            setVehicleInfo({
                                                ...vehicleInFo,
                                                'vehicle_no': e.target.value
                                            })
                                        }}
                                    />


                                    <input type="text" name='chases_no' className='vehicle_detail_fields' placeholder='Chases No'
                                        value={vehicleInFo.chases_no}
                                        onChange={(e) => {
                                            setVehicleInfo({
                                                ...vehicleInFo,
                                                'chases_no': e.target.value
                                            })
                                        }}
                                    />
                                    <input type="text" name='Model' className='vehicle_detail_fields' placeholder='Model'
                                        value={vehicleInFo.Model}
                                        onChange={(e) => {
                                            setVehicleInfo({
                                                ...vehicleInFo,
                                                'Model': e.target.value
                                            })
                                        }}
                                    />

                                    {/* <input type="text" name='tour_id' className='vehicle_detail_fields' placeholder='Tour Id'
                                        value={vehicleInFo.tour_id}
                                        onChange={(e) => {
                                            setVehicleInfo({
                                                ...vehicleInFo,
                                                'tour_id': e.target.value
                                            })
                                        }}
                                    /> */}

                                </fieldset>
                            </div>
                            <div className="vehicle_detail_body_right">
                                {
                                    driverInFo.map((driver, index) => (
                                        <fieldset key={`driver-${index}`}>
                                            <legend>Driver Details</legend>
                                            <input type="text" name='name' className='vehicle_detail_fields' placeholder=' Name'
                                                value={driverInFo[index].name}
                                                onChange={(e) => {
                                                    // setDriverInfo({
                                                    //     ...driverInFo,
                                                    //     'name': e.target.value
                                                    // })

                                                    // let driver = {
                                                    //     ...driverInFo[index],
                                                    //     'name': e.target.value
                                                    // }

                                                    // let drivers = driverInFo.filter((_, i) => { return i != index })
                                                    // setDriverInfo(drivers)

                                                    let driver = {
                                                        ...driverInFo[index],
                                                        'name': e.target.value
                                                    }


                                                    let drivers = []
                                                    for (let i = 0; i < driverInFo.length; i++) {
                                                        if (i != index) {
                                                            drivers.push(driverInFo[i])
                                                        } else {
                                                            drivers.push(driver)
                                                        }
                                                    }
                                                    setDriverInfo(drivers)

                                                    // let drivers = driverInFo.filter((_, i) => { return i != index })
                                                    // drivers.push(driver)
                                                    // setDriverInfo(drivers)
                                                }}
                                            />
                                            <input type="text" name="driver_id" className='vehicle_detail_fields' placeholder='Driver Id'
                                                value={driverInFo[index].driver_id}
                                                onChange={(e) => {
                                                    // setDriverInfo({
                                                    //     ...driverInFo,
                                                    //     'driver_id': e.target.value
                                                    // })
                                                    let driver = {
                                                        ...driverInFo[index],
                                                        'driver_id': e.target.value
                                                    }

                                                    let drivers = []
                                                    for (let i = 0; i < driverInFo.length; i++) {
                                                        if (i != index) {
                                                            drivers.push(driverInFo[i])
                                                        } else {
                                                            drivers.push(driver)
                                                        }
                                                    }
                                                    setDriverInfo(drivers)

                                                    // let drivers = driverInFo.filter((_, i) => { return i != index })
                                                    // drivers.push(driver)
                                                    // setDriverInfo(drivers)
                                                }}
                                            />

                                            {/* <input type="text" name="Vehicle_id" className='vehicle_detail_fields' placeholder='Vehicle Id'
                                                value={driverInFo[index].vehicle_id}
                                                onChange={(e) => {
                                                    // setDriverInfo({
                                                    //     ...driverInFo,
                                                    //     'vehicle_id': e.target.value
                                                    // })
                                                    let driver = {
                                                        ...driverInFo[index],
                                                        'vehicle_id': e.target.value
                                                    }

                                                    let drivers = driverInFo.filter((_, i) => { return i != index })
                                                    drivers.push(driver)
                                                    setDriverInfo(drivers)
                                                }}
                                            /> */}

                                            <input type="text" name='phone' className='vehicle_detail_fields' placeholder='Phone'
                                                value={driverInFo[index].phone}
                                                onChange={(e) => {
                                                    // setDriverInfo({
                                                    //     ...driverInFo,
                                                    //     'phone': e.target.value
                                                    // })
                                                    let driver = {
                                                        ...driverInFo[index],
                                                        'phone': e.target.value
                                                    }


                                                    let drivers = []
                                                    for (let i = 0; i < driverInFo.length; i++) {
                                                        if (i != index) {
                                                            drivers.push(driverInFo[i])
                                                        } else {
                                                            drivers.push(driver)
                                                        }
                                                    }
                                                    setDriverInfo(drivers)


                                                    // let drivers = driverInFo.filter((_, i) => { return i != index })
                                                    // drivers.push(driver)
                                                    // setDriverInfo(drivers)
                                                }}
                                            />
                                            <input type="text" name="address" className='vehicle_detail_fields' placeholder='Address'
                                                value={driverInFo[index].address}
                                                onChange={(e) => {
                                                    // setDriverInfo({
                                                    //     ...driverInFo,
                                                    //     'address': e.target.value
                                                    // })
                                                    let driver = {
                                                        ...driverInFo[index],
                                                        'address': e.target.value
                                                    }



                                                    let drivers = []
                                                    for (let i = 0; i < driverInFo.length; i++) {
                                                        if (i != index) {
                                                            drivers.push(driverInFo[i])
                                                        } else {
                                                            drivers.push(driver)
                                                        }
                                                    }
                                                    setDriverInfo(drivers)

                                                    // let drivers = driverInFo.filter((_, i) => { return i != index })
                                                    // drivers.push(driver)
                                                    // setDriverInfo(drivers)
                                                }}
                                            />

                                            <input type="text" name="Email" className='vehicle_detail_fields' placeholder='Email'
                                                value={driverInFo[index].email}
                                                onChange={(e) => {
                                                    // setDriverInfo({
                                                    //     ...driverInFo,
                                                    //     'email': e.target.value
                                                    // })
                                                    let driver = {
                                                        ...driverInFo[index],
                                                        'email': e.target.value
                                                    }



                                                    let drivers = []
                                                    for (let i = 0; i < driverInFo.length; i++) {
                                                        if (i != index) {
                                                            drivers.push(driverInFo[i])
                                                        } else {
                                                            drivers.push(driver)
                                                        }
                                                    }
                                                    setDriverInfo(drivers)
                                                    // let drivers = driverInFo.filter((_, i) => { return i != index })
                                                    // drivers.push(driver)
                                                    // setDriverInfo(drivers)
                                                }}
                                            />
                                        </fieldset>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VehicleDetail