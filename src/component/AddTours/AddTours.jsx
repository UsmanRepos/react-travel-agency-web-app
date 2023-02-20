import React, { useState, useEffect, useRef } from 'react'
import "./Modal.css";
import { db, auth } from '../../firebase'
import { Autocomplete } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import Close from '../../Images/close.png'
import Attention from '../../Images/attention.png'
import './AddTours.css'


const GOOGLE_MAPS_API = "AIzaSyCc-u9f8sMzo7ETUnr2LEWt47zC9hk-r4w"

function AddTours() {

  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    type: ''
  });
  const [message, setMessage] = useState("");
  const [tourInFo, setTourInfo] = useState({
    provinceName: "",
    name: "",
    status: 'open',
    title: "",
    description: "",
    source: "",
    destination: "",
    imageuri: "",
    price: "",
    startdate: "",
    enddate: ""
  });

  const [placeInFo, setPlaceInfo] = useState([{
    name: "",
    imageuri: "",
    description: "",
  }]);

  const routeChange = () => {
    let path = '/Tours';
    navigate(path);
  }

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const placeRef = useRef()

  const [provinces, setProvinces] = useState(['Punjab', 'Balochistan', 'Sindh', 'Kpk', 'Gilgit', 'Kashmir'])

  // useEffect(() => {

  //     provinces.forEach(province => {
  //         db.collection('provinces').doc(province).collection('tours').where('travelAgencyID', '==', auth.currentUser.uid)
  //             .get().then((querySnapshot) => {
  //                 querySnapshot.forEach((doc) => {
  //                     // doc.data() is never undefined for query doc snapshots
  //                     console.log(doc.id, " => ", doc.data());
  //                 });
  //             })
  //             .catch((error) => {
  //                 console.log("Error getting documents: ", error);
  //             });
  //     })


  // }, [])

  const handleAddTour = () => {

    let response = checkEmptyFields()
    if (response == 1) {
      response = checkValidation()
      if (response == 1) {
        const tourRef = db.collection('provinces').doc(tourInFo.provinceName).collection('tours').doc(tourInFo.name);
        tourRef.set({ ...tourInFo, travelAgencyID: auth.currentUser.uid, source: originRef.current.value, destination: destiantionRef.current.value })

        for (let i = 0; i < placeInFo.length; i++) {
          let address = placeInFo[i].name.replace(/ /g, '%20')
          console.log(address)
          fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_MAPS_API)
            .then(response => response.json())
            .then(data => {
              console.log(data)
              tourRef.collection('places').doc(placeInFo[i].name).set({
                ...placeInFo[i],
                coordinates: {
                  lat: data.results[0].geometry.location.lat,
                  lng: data.results[0].geometry.location.lng
                }
              })
            })
        }
        setAlert({
          message: "Success, Record is inserted in the database successfully ..",
          type: ''
        })
        toggleModal();
      } else {
        toggleModal()
      }
    } else {
      toggleModal()
    }
  }


  const handleAddPlace = () => {
    setPlaceInfo((previousPlaces) => {
      return [
        ...previousPlaces,
        {
          name: "",
          imageuri: "",
          description: "",
        }

      ]
    })
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const checkEmptyFields = () => {
    if (!(tourInFo.provinceName == "" || tourInFo.price == "" || tourInFo.startdate == "" || tourInFo.enddate == "" || originRef.current.value == "" || tourInFo.description == ""
      || destiantionRef.current.value == "" || tourInFo.imageuri == "" || tourInFo.name == "" || tourInFo.title == "")) {
      for (let i = 0; i < placeInFo.length; i++) {
        if (placeInFo[i].name == "" || placeInFo[i].imageuri == "" || placeInFo[i].description == "") {
          setAlert({
            message: "Please fill the Place empty fields first",
            type: ''
          })
          return 0
        }
      }
    } else {
      setAlert({
        message: "Please fill the Tour empty fields first ..",
        type: ''
      })
      return 0
    }
    return 1
  }

  const setFieldsEmpty = () => {

    setTourInfo({
      provinceName: "",
      name: "",
      title: "",
      description: "",
      source: "",
      destination: "",
      imageuri: "",
      price: ""
    });

    originRef.current.value = ''
    destiantionRef.current.value = ''

    setPlaceInfo(placeInFo.map(() => {
      return {
        name: "",
        imageuri: "",
        description: ""
      }
    }))
  }

  const checkValidation = () => {
    let startDate = tourInFo.startdate.split("-")
    let endDate = tourInFo.enddate.split("-")
    let currentDate = new Date()
    const month = parseInt(currentDate.getMonth() + 1)
    const day = parseInt(currentDate.getDate())
    const year = parseInt(currentDate.getFullYear().toString())

    console.log("CurrentDate", month + "/" + day + "/" + year)
    console.log("startDate", parseInt(startDate[0]) + "/" + parseInt(startDate[1]) + "/" + parseInt(startDate[2]))
    console.log("startDate", parseInt(endDate[0]) + "/" + parseInt(endDate[1]) + "/" + parseInt(endDate[2]))

    if ((year > parseInt(startDate[0]))
      || ((year == parseInt(startDate[0])) && (month > parseInt(startDate[1])))
      || ((year == parseInt(startDate[0])) && (month == parseInt(startDate[1])) && (day > parseInt(startDate[2])))
    ) {
      setAlert({
        message: 'Invalid Date, Please enter the valid information'
      })
      return 0
    }

    if ((year > parseInt(endDate[0]))
      || ((year == parseInt(endDate[0])) && (month > parseInt(endDate[1])))
      || ((year == parseInt(endDate[0])) && (month == parseInt(endDate[1])) && (day > parseInt(endDate[2])))
    ) {
      setAlert({
        message: 'Invalid Date, Please enter the valid information'
      })
      return 0
    }

    if ((parseInt(startDate[0]) > parseInt(endDate[0]))
      || ((parseInt(startDate[0]) == parseInt(endDate[0])) && (parseInt(startDate[1]) > parseInt(endDate[1])))
      || ((parseInt(startDate[0]) == parseInt(endDate[0])) && (parseInt(startDate[1]) == parseInt(endDate[1])) && (parseInt(startDate[2]) > parseInt(endDate[2])))
    ) {
      setAlert({
        message: 'Invalid Information, Please enter the valid start or end date'
      })
      return 0
    }
    return 1
  }

  const coordinatesGetter = (placeName) => {

  }

  return (
    <div className='Addcontainer'>
      <div className='AddAppGlass'>


        <div className="tour">
          <div className="tour_header">
            <button className='button tour_button' onClick={routeChange}> Back
            </button>
            <button className='button tour_button' onClick={handleAddTour}> Add
            </button>
          </div>
          <div className="tour_body">
            <div className="form1">
              {/* <form method="POST" action="" target="_self"> */}
              <div className="tour_body_left">
                <fieldset>
                  <legend>Tour Details</legend>
                  <div className="tour_dates">
                    <input type="text" name='name' className='tour_dates_fields' placeholder='Tour Name' required
                      value={tourInFo.name}
                      onChange={(e) => {
                        setTourInfo({
                          ...tourInFo,
                          'name': e.target.value
                        })
                      }}
                    />
                    <input type="text" name='provincename' className='tour_dates_fields' placeholder='Province Name' required
                      value={tourInFo.provinceName}
                      onChange={(e) => {
                        setTourInfo({
                          ...tourInFo,
                          'provinceName': e.target.value
                        })
                      }}
                    />
                  </div>

                  <div className="tour_dates">
                    <input type="date" name='startdate' className='tour_dates_fields' placeholder='Start Date' required
                      value={tourInFo.startdate}
                      onChange={(e) => {
                        setTourInfo({
                          ...tourInFo,
                          'startdate': e.target.value
                        })
                      }}
                    />
                    <input type="date" name='enddate' className='tour_dates_fields' placeholder='End Date' required
                      value={tourInFo.enddate}
                      onChange={(e) => {
                        setTourInfo({
                          ...tourInFo,
                          'enddate': e.target.value
                        })
                      }}
                    />
                  </div>

                  <div className="tour_dates">
                    <Autocomplete className='tour_dates_fields_container'>
                      <input type="text" name='source' className='tour_dates_fields' placeholder='Source' required
                        // value={tourInFo.source}
                        ref={originRef}
                      // onChange={(e) => {
                      //   setTourInfo({
                      //     ...tourInFo,
                      //     'source': e.target.value
                      //   })
                      // }}
                      />
                    </Autocomplete>

                    <Autocomplete className='tour_dates_fields_container'>
                      <input type="text" name='destination' className='tour_dates_fields' placeholder='Destination' required
                        // value={tourInFo.destination}
                        ref={destiantionRef}
                      // onChange={(e) => {
                      //   setTourInfo({
                      //     ...tourInFo,
                      //     'destination': e.target.value
                      //   })
                      // }}
                      />
                    </Autocomplete>
                  </div>

                  <input type="text" name='title' className='tour_fields' placeholder='Tour Title' required
                    value={tourInFo.title}
                    onChange={(e) => {
                      setTourInfo({
                        ...tourInFo,
                        'title': e.target.value
                      })
                    }}
                  />



                  <input type="text" name="imageuri" className='tour_fields' placeholder='Image Uri' required
                    value={tourInFo.imageuri}
                    onChange={(e) => {
                      setTourInfo({
                        ...tourInFo,
                        'imageuri': e.target.value
                      })
                    }}
                  />

                  <input type="number" name='price' className='tour_fields' placeholder='Price' required
                    value={tourInFo.price}
                    onChange={(e) => {
                      setTourInfo({
                        ...tourInFo,
                        'price': e.target.value
                      })
                    }}
                  />

                  <textarea name="description" className='tour_fields' placeholder='Description' required
                    value={tourInFo.description}
                    onChange={(e) => {
                      setTourInfo({
                        ...tourInFo,
                        'description': e.target.value
                      })
                    }}
                  />
                </fieldset>
              </div>
              <div className="tour_body_right">
                {
                  placeInFo.map((place, index) => (
                    <fieldset key={`place-${index}`}>
                      <legend>Place Details</legend>
                      <Autocomplete>
                        <input type="text" name='name' className='tour_fields' placeholder='Place Name' required
                          ref={placeRef}
                          onBlur={(e) => {
                            let place = {
                              ...placeInFo[index],
                              'name': placeRef.current.value
                            }

                            let places = []
                            for (let i = 0; i < placeInFo.length; i++) {
                              if (i != index) {
                                places.push(placeInFo[i])
                              } else {
                                places.push(place)
                              }
                            }
                            setPlaceInfo(places)
                          }}
                        />
                      </Autocomplete>

                      <input type="text" name="imageuri" className='tour_fields' placeholder='Image Uri' required
                        value={placeInFo.imageuri}
                        onChange={(e) => {
                          let place = {
                            ...placeInFo[index],
                            'imageuri': e.target.value
                          }

                          let places = []
                          for (let i = 0; i < placeInFo.length; i++) {
                            if (i != index) {
                              places.push(placeInFo[i])
                            } else {
                              places.push(place)
                            }
                          }
                          setPlaceInfo(places)
                        }}
                      />
                      <textarea name="description" className='tour_fields' placeholder='Description' required
                        value={placeInFo.description}
                        onChange={(e) => {
                          let place = {
                            ...placeInFo[index],
                            'description': e.target.value
                          }
                          let places = []
                          for (let i = 0; i < placeInFo.length; i++) {
                            if (i != index) {
                              places.push(placeInFo[i])
                            } else {
                              places.push(place)
                            }
                          }
                          setPlaceInfo(places)
                        }}
                      />

                    </fieldset>
                  ))
                }
                {/* <button className='button add_button'> + </button> */}
                <button className='button add_button' onClick={handleAddPlace} > + </button>
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
                          // let response = checkEmptyFields()
                          // setFieldsEmpty()
                          // if (response === 1) { window.location.reload() }

                        }}
                      >
                        <img src={Close} alt="" style={{ width: '22px', height: '22px' }} />
                      </div>

                    </div>
                  </div>
                )}
              </div>
              {/* </form> */}

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTours