import React from 'react'
import { useState, useEffect } from 'react'
import './VehicleScreen.css'
import { db, auth } from '../firebase'
import { useNavigate } from "react-router-dom";
import Close from '../Images/close.png'
import Attention from '../Images/attention.png'
import "./Modal.css";


function VehicleScreen() {
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: ''
  });

  const [validate, setValidate] = useState(null)

  const [vehicleInFo, setVehicleInfo] = useState({
    vehicle_id: "",
    vehicle_no: "",
    chases_no: "",
    Model: "",
  });

  const [driverInFo, setDriverInfo] = useState([{
    vehicle_id: "",
    name: "",
    driver_id: "",
    address: "",
    phone: "",
    email: "",
  }]);

  let navigate = useNavigate();

  const routeChange = () => {
    let path = '/MainVehicle';
    navigate(path);
  }

  // useEffect(() => {
  //     db.collection('travelAgency').doc(auth.currentUser.uid).collection('vehicles')
  //         .get().then((querySnapshot) => {
  //             querySnapshot.forEach((doc) => {
  //                 // doc.data() is never undefined for query doc snapshots
  //                 console.log(doc.id, " => ", doc.data());
  //             });
  //         })
  //         .catch((error) => {
  //             console.log("Error getting documents: ", error);
  //         });

  // }, [])

  const handleAddVehicle = () => {

    let response = checkEmptyFields()
    if (response == 1) {
      response = checkValidation()
      if (response == 1) {
        const vehicleRef = db.collection('travelAgency').doc(auth.currentUser.uid).collection('vehicles').doc(vehicleInFo.vehicle_id);
        vehicleRef.set(vehicleInFo);
        for (let i = 0; i < driverInFo.length; i++) {
          vehicleRef.collection('drivers').doc(driverInFo[i].driver_id).set(driverInFo[i]);
        }

        setFieldsEmpty()
        setAlert({
          message: "Success, Record is inserted in the database successfully ..",
          type: ''
        })
        toggleModal();
      }
      else {
        toggleModal()
      }
    } else {
      toggleModal();
    }
  }

  const checkEmptyFields = () => {

    if (!(vehicleInFo.vehicle_id == "" || vehicleInFo.chases_no == "" || vehicleInFo.Model == "" || vehicleInFo.vehicle_no == "")) {
      for (let i = 0; i < driverInFo.length; i++) {
        if (driverInFo[i].name == "" || driverInFo[i].address == "" || driverInFo[i].driver_id == "" || driverInFo[i].email == "" || driverInFo[i].phone == "") {
          setAlert({
            message: "Please fill the driver empty fields first",
            type: ''
          })
          return 0
        }
      }
    } else {
      setAlert({
        message: "Please fill the vehicle empty fields first ..",
        type: ''
      })
      return 0
    }
    return 1
  }

  const setFieldsEmpty = () => {

    setVehicleInfo({
      vehicle_id: "",
      vehicle_no: "",
      chases_no: "",
      Model: "",
    })

    setDriverInfo(driverInFo.map(() => {
      return {
        vehicle_id: "",
        name: "",
        driver_id: "",
        address: "",
        phone: "",
        email: "",
      }
    }))

  }

  const checkValidation = () => {
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    let phoneReg = /\+[0-9]{12}/
    for (let i = 0; i < driverInFo.length; i++) {
      if (!regEmail.test(driverInFo[i].email)) {
        setAlert({
          message: "Email address is badly formated ...",
          type: ''
        })
        return 0
      }

      console.log(driverInFo[i].phone)
      console.log(driverInFo[i].phone.length)

      if (!phoneReg.test(driverInFo[i].phone)) {
        console.log("phone")
        setAlert({
          type: '',
          message: 'Invalid Phone Number\nPlease enter the valid information'
        })
        return 0
      }
    return 1
  }
}

const handleAddDriver = () => {
  // let drivers = driverInFo
  // drivers.push(
  //     {
  //         vehicle_id: "",
  //         name: "",
  //         driver_id: "",
  //         address: "",
  //         phone: "",
  //         email: "",
  //     })
  // setDriverInfo(drivers)

  setDriverInfo((previousDrivers) => {
    return [
      ...previousDrivers,
      {
        vehicle_id: "",
        name: "",
        driver_id: "",
        address: "",
        phone: "",
        email: "",
      }
    ]
  })

}

const toggleModal = () => {
  setModal(!modal);
};


return (
  <div className='Vehicle_screen_container'>
    <div className='Vehicle_Screen_AppGlass'>
      <div className="Vehicle_screen">
        <div className="Vehicle_screen_header">
          <button className='button Vehicle_screen_button'
            onClick={routeChange}> Back
          </button>
          <button className='button Vehicle_screen_button'
            onClick={handleAddVehicle}> Add
          </button>
        </div>
        <div className="Vehicle_screen_body">

          <div className="form">
            <div className="Vehicle_screen_body_left">
              <fieldset>
                <legend>Vehicle Details</legend>
                <input type="text" name='vehicle_id' className='Vehicle_screen_field' placeholder='Vehicle Id'
                  value={vehicleInFo.vehicle_id}
                  onChange={(e) => {
                    setVehicleInfo({
                      ...vehicleInFo,
                      'vehicle_id': e.target.value
                    })
                  }}
                />

                <input type="text" name='vehicle_no' className='Vehicle_screen_field' placeholder='Vehicle No'
                  value={vehicleInFo.vehicle_no}
                  onChange={(e) => {
                    setVehicleInfo({
                      ...vehicleInFo,
                      'vehicle_no': e.target.value
                    })
                  }}
                />


                <input type="text" name='chases_no' className='Vehicle_screen_field' placeholder='Chases No'
                  value={vehicleInFo.chases_no}
                  onChange={(e) => {
                    setVehicleInfo({
                      ...vehicleInFo,
                      'chases_no': e.target.value
                    })
                  }}
                />
                <input type="number" name='Model' className='Vehicle_screen_field' placeholder='Model'
                  value={vehicleInFo.Model}
                  onChange={(e) => {
                    setVehicleInfo({
                      ...vehicleInFo,
                      'Model': e.target.value
                    })
                  }}
                />
              </fieldset>
            </div>
            <div className="Vehicle_screen_body_right">
              {console.log("driverInfo", driverInFo)}
              {
                driverInFo.map((driver, index) => (
                  <fieldset key={`driver-${index}`}>
                    <legend>Driver Details</legend>
                    <input type="text" name='name' className='Vehicle_screen_field' placeholder='Driver Name'
                      value={driverInFo.name}
                      onChange={(e) => {
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
                      }}
                    />
                    <input type="text" name="driver_id" className='Vehicle_screen_field' placeholder='Driver Id'
                      value={driverInFo.driver_id}
                      onChange={(e) => {

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
                      }}
                    />


                    <input type="text" name='phone' className='Vehicle_screen_field' placeholder='Phone'
                      value={driverInFo.phone}
                      onChange={(e) => {
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
                      }}
                    />
                    <input type="text" name="address" className='Vehicle_screen_field' placeholder='Address'
                      value={driverInFo.address}
                      onChange={(e) => {

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
                      }}
                    />

                    <input type="text" name="Email" className='Vehicle_screen_field' placeholder='Email'
                      value={driverInFo.email}
                      onChange={(e) => {

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
                      }}
                    />
                  </fieldset>
                ))
              }
              <button className='button add_button' onClick={handleAddDriver}> + </button>
              {modal && (
                <div className="modal">
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal_content">
                    <div
                      style={{
                        display: 'flex',
                        width: '60px', height: '60px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: '-35px',
                        borderRadius: '40px',
                        borderWidth: '2px',
                        borderColor: 'white',
                        borderStyle: 'solid',
                        background: 'yellow',
                        zIndex: 1
                      }}
                    >
                      <img src={Attention} alt="" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div
                      style={{
                        width: '25vw',
                        height: '25vh',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: '12px',
                        padding: '8px 15px',
                        backgroundColor: '#f1f1f1',
                        transform: 'translate(0%, 0%)'
                      }}
                    >
                      <span className='modal_title'>Alert</span>
                      <span className='modal_message'>{alert.message}</span>

                    </div>
                    <div
                      style={{
                        display: 'flex',
                        width: '60px',
                        height: '60px',
                        borderRadius: '30px',
                        marginTop: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f1f1f1',
                        transform: 'translate(0%, 0%)'
                      }}
                      onClick={() => {
                        toggleModal()
                        let response = checkEmptyFields()
                        if (response === 1) { window.location.reload() }

                      }}
                    >
                      <img src={Close} alt="" style={{ width: '22px', height: '22px' }} />
                    </div>

                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

)
}

export default VehicleScreen