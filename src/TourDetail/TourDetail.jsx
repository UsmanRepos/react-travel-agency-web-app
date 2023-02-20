import React from 'react'
import { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import { useNavigate, useLocation } from "react-router-dom";
import './TourDetail.css'

function TourDetail() {
    let navigate = useNavigate();
    let location = useLocation()
    // const [tourdetailInFo, setTourDetailInfo] = useState({
    //     provinceName: "",
    //     name: "",
    //     title: "",
    //     description: "",
    //     source: "",
    //     destination: "",
    //     imageuri: "",
    //     price: "",
    //     startdate: "",
    //     enddate: "",
    //     tour_id: "",
    //     travelAgencyName: "",
    // });

    const [placeDetailInFo, setPlaceDetailInfo] = useState([{
        name: "",
        imageuri: "",
        description: "",
    }]);

    let tour = location.state.tour
    const [tourdetailInFo, setTourDetailInfo] = useState({});

    useEffect(() => {
        setTourDetailInfo(tour)
        db.collection('provinces').doc(tour.provinceName).collection('tours').doc(tour.name).collection('places')
            .get().then((querySnapshot) => {
                let places = []
                querySnapshot.forEach((doc) => {
                    places.push(doc.data())
                });

                setPlaceDetailInfo(places)
                console.log(places)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            })
    }, [tour])



    const handleUpdatePlace = () => {

        const tourRef = db.collection('provinces').doc(tourdetailInFo.provinceName).collection('tours').doc(tourdetailInFo.name);
        tourRef.update(tourdetailInFo);

        for (let i = 0; i < placeDetailInFo.length; i++) {
            tourRef.collection('places').doc(placeDetailInFo[i].name).update(placeDetailInFo[i]);
        }

    }
    const routeChange1 = () => {
        let path = '/Tours';
        navigate(path);
    }


    const handleDeletePlace = () => {
        db.collection('provinces').doc(tourdetailInFo.provinceName).collection('tours').doc(tourdetailInFo.name)
            .delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
    }



    // const [provinces, setProvinces] = useState(['Punjab', 'Balochistan', 'Sindh', 'Kpk', 'Gilgit', 'Kashmir'])

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


    return (
        <div className='Addcontainer'>
            <div className='AddAppGlass'>
                <div className="detail_tour">
                    <div className="detail_tour_header">
                        <div className='button_wrapper'>
                            <button className='button vehicle_detail_button' onClick={routeChange1}> Back </button>
                        </div>
                        <button className='button detail_tour_button' onClick={handleUpdatePlace}> Update
                        </button>
                        <button className='button detail_tour_button' onClick={handleDeletePlace}> Delete
                        </button>
                    </div>
                    <div className="detail_tour_body">
                        <div className="form3">
                            {/* <form method="POST" action="" target="_self"> */}
                            <div className="detail_tour_body_left">
                                <fieldset>
                                    <legend>Tour Details</legend>
                                    <div className="tour_dates">
                                        <input type="text" name='name' className='detail_tour_dates_fields' placeholder='Tour Name'
                                            value={tourdetailInFo.name}
                                            onChange={(e) => {
                                                setTourDetailInfo({
                                                    ...tourdetailInFo,
                                                    'name': e.target.value
                                                })
                                            }}
                                        />
                                        <input type="text" name='provinceName' className='detail_tour_dates_fields' placeholder='Province Name'
                                            value={tourdetailInFo.provinceName}
                                            onChange={(e) => {
                                                setTourDetailInfo({
                                                    ...tourdetailInFo,
                                                    'provinceName': e.target.value
                                                })
                                            }}
                                        />
                                    </div>

                                    <div className="tour_dates">
                                        <input type="text" name='startdate' className='detail_tour_dates_fields' placeholder='Start Date'
                                            value={tourdetailInFo.startdate}
                                            onChange={(e) => {
                                                setTourDetailInfo({
                                                    ...tourdetailInFo,
                                                    'startdate': e.target.value
                                                })
                                            }}
                                        />
                                        <input type="text" name='enddate' className='detail_tour_dates_fields' placeholder='End Date'
                                            value={tourdetailInFo.enddate}
                                            onChange={(e) => {
                                                setTourDetailInfo({
                                                    ...tourdetailInFo,
                                                    'enddate': e.target.value
                                                })
                                            }}
                                        />
                                    </div>

                                    <div className="tour_dates">
                                        <input type="text" name='source' className='detail_tour_fields' placeholder='Source'
                                            value={tourdetailInFo.source}
                                            onChange={(e) => {
                                                setTourDetailInfo({
                                                    ...tourdetailInFo,
                                                    'source': e.target.value
                                                })
                                            }}
                                        />
                                        <input type="text" name='destination' className='detail_tour_fields' placeholder='Destination'
                                            value={tourdetailInFo.destination}
                                            onChange={(e) => {
                                                setTourDetailInfo({
                                                    ...tourdetailInFo,
                                                    'destination': e.target.value
                                                })
                                            }}
                                        />
                                    </div>

                                    <input type="text" name='title' className='detail_tour_fields' placeholder='Tour Title'
                                        value={tourdetailInFo.title}
                                        onChange={(e) => {
                                            setTourDetailInfo({
                                                ...tourdetailInFo,
                                                'title': e.target.value
                                            })
                                        }}
                                    />



                                    <input type="text" name="imageuri" className='detail_tour_fields' placeholder='Image Uri'
                                        value={tourdetailInFo.imageuri}
                                        onChange={(e) => {
                                            setTourDetailInfo({
                                                ...tourdetailInFo,
                                                'imageuri': e.target.value
                                            })
                                        }}
                                    />


                                    <input type="text" name='price' className='detail_tour_fields' placeholder='Price'
                                        value={tourdetailInFo.price}
                                        onChange={(e) => {
                                            setTourDetailInfo({
                                                ...tourdetailInFo,
                                                'price': e.target.value
                                            })
                                        }}
                                    />

                                    <textarea name="description" className='detail_tour_fields' placeholder='Description'
                                        value={tourdetailInFo.description}
                                        onChange={(e) => {
                                            setTourDetailInfo({
                                                ...tourdetailInFo,
                                                'description': e.target.value
                                            })
                                        }}
                                    />
                                </fieldset>
                            </div>
                            <div className="tour_body_right">
                                {
                                    placeDetailInFo.map((place, index) => (
                                        <fieldset key={`place-${index}`}>
                                            <legend>Place Details</legend>
                                            <input type="text" name='name' className='detail_tour_fields' placeholder='Place Name'
                                                value={placeDetailInFo[index].name}
                                                onChange={(e) => {
                                                    let place = {
                                                        ...placeDetailInFo[index],
                                                        'name': e.target.value
                                                    }
                                                    let places = []
                                                    for (let i = 0; i < placeDetailInFo.length; i++) {
                                                        if (i != index) {
                                                            places.push(placeDetailInFo[i])
                                                        } else {
                                                            places.push(place)
                                                        }
                                                    }
                                                    setPlaceDetailInfo(places)
                                                }}
                                            />
                                            <input type="text" name="imageuri" className='detail_tour_fields' placeholder='Image Uri'
                                                value={placeDetailInFo[index].imageuri}
                                                onChange={(e) => {
                                                    let place = {
                                                        ...placeDetailInFo[index],
                                                        'imageuri': e.target.value
                                                    }
                                                    let places = []
                                                    for (let i = 0; i < placeDetailInFo.length; i++) {
                                                        if (i != index) {
                                                            places.push(placeDetailInFo[i])
                                                        } else {
                                                            places.push(place)
                                                        }
                                                    }
                                                    setPlaceDetailInfo(places)
                                                }}
                                            />
                                            <textarea name="description" className='detail_tour_fields' placeholder='Description'
                                                value={placeDetailInFo[index].description}
                                                onChange={(e) => {
                                                    let place = {
                                                        ...placeDetailInFo[index],
                                                        'description': e.target.value
                                                    }
                                                    let places = []
                                                    for (let i = 0; i < placeDetailInFo.length; i++) {
                                                        if (i != index) {
                                                            places.push(placeDetailInFo[i])
                                                        } else {
                                                            places.push(place)
                                                        }
                                                    }
                                                    setPlaceDetailInfo(places)
                                                }}
                                            />

                                        </fieldset>
                                    ))
                                }
                                {/* <button className='button detail_add_button'> + </button> */}
                            </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourDetail