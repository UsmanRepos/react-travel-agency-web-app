
import React, { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker, useJsApiLoader, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { realdb, db } from '../firebase'
import { useLocation } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa'

const VecicleLocation = () => {

  let location = useLocation()
  let vehicle = location.state.vehicle
  const [coordinates, setCoordinates] = useState({
    lat: 33.5969,
    lng: 73.0528
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

  const [allTours, setAllTours] = useState([])
  const [placesDetail, setPlacesDetail] = useState([])
  
  const [provinces, setProvinces] = useState(['Punjab', 'Balochistan', 'Sindh', 'Kpk', 'Gilgit', 'Kashmir'])

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  useEffect(() => {
    provinces.forEach(province => {
      db.collection('provinces').doc(province).collection('tours').where('vehicleID', '==', vehicle.vehicle_id)
        .get().then((querySnapshot) => {
         
          let tours = []
          querySnapshot.forEach((doc) => {
            console.log("Tour: ", doc.data())
            tours.push(doc.data())
            console.log(doc.data())
          });
          setAllTours((p) => {
            return [
              ...p,
              ...tours
            ]
          })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        })
    });
  }, [])

  useEffect(() => {
    let selectedTour = allTours[0]
    let selectedProvince = selectedTour?.provinceName
    
    setPlacesDetail([])
    db.collection("provinces").doc(selectedProvince).collection("tours")
      .doc(selectedTour?.name).collection("places").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setPlacesDetail((previous) => {
            return [
              ...previous,
              doc.data()
            ]
          });
        });
      });
    calculateRoute(selectedTour)
  },[allTours])

  useEffect(() => {
    const onChildChanged = realdb
    .ref('/GPS')
    .on('child_changed', (snapshot) => {
      if (snapshot.exists()) {
        setCoordinates({
          lat:snapshot.val().latitude,
          lng: snapshot.val().longitude
        })
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    });

    return realdb.ref('/GPS').off('child_changed', onChildChanged);
  },[])

  const containerStyle = {
    width: '100vw',
    height: '100vh'
  };
  
  const center = {
    lat: 3.135662,
    lng: 101.687128,
  };
  
  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  async function calculateRoute(selectedTour) {
    originRef.current.value = selectedTour?.source ?? originRef.current.value
    destiantionRef.current.value = selectedTour?.destination ?? destiantionRef.current.value

   if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }

    console.log("originRef: ", originRef.current.value)
    console.log("destiantionRef: ", destiantionRef.current.value)
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
          
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
        <Marker key={'vehicle'} position={coordinates} />;
        {placesDetail.map((item, index) => {
          console.log('coordinates: ', item.coordinates)
          return <Marker key={index} position={item.coordinates} />;
        })}

        {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      </Box>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button colorScheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent='space-between'>
          <Text>Distance: {distance} </Text>
          <Text>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>
      </Box>
    </Flex>
  )
}

export default VecicleLocation

// function MyMap(props) {

  // let location = useLocation()
  // let vehicle = location.state.vehicle
  // const [coordinates, setCoordinates] = useState({
  //   lat: 33.6593,
  //   lng: 73.0238,
  // })
  // const [allTours, setAllTours] = useState([])
  // const [placesDetail, setPlacesDetail] = useState([])
  
  // const [provinces, setProvinces] = useState(['Punjab', 'Balochistan', 'Sindh', 'Kpk', 'Gilgit', 'Kashmir'])

  // useEffect(() => {
  //   provinces.forEach(province => {
  //     db.collection('provinces').doc(province).collection('tours').where('vechileID', '==', vehicle.vehicle_id).where('status' == 'active')
  //       .get().then((querySnapshot) => {
  //         let tours = []
  //         querySnapshot.forEach((doc) => {
  //           tours.push(doc.data())
  //           console.log(doc.data())
  //         });
  //         setAllTours((p) => {
  //           return [
  //             ...p,
  //             ...tours
  //           ]
  //         })
  //       })
  //       .catch((error) => {
  //         console.log("Error getting documents: ", error);
  //       });
  //   })
  // }, [])

  // const locationGetter = () => {
  //   const dbRef = realdb.ref();
  //   dbRef.child("GPS").get().then((snapshot) => {
  //     if (snapshot.exists()) {
  //       setCoordinates({
  //   lat:snapshot.val().latitude,
  //   lng: snapshot.val().longitude
  // })
  //       console.log(snapshot.val());
  //     } else {
  //       console.log("No data available");
  //     }
  //   }).catch((error) => {
  //     console.error(error);
  //   });
  // }
  // window.setInterval(locationGetter, 5000);

//   return (
//     <Map
//       google={props.google}
//       style={{
//         width: "100%",
//         height: "100%",
//         position: 'relative'
//       }}
//       zoom={13}
//       initialCenter={{
//         lat: 33.6593,
//         lng: 73.0238,
//       }}
//     >
//       <Marker title={props.title} name={"SOMA"} position={props.position} />
//     </Map>
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCc-u9f8sMzo7ETUnr2LEWt47zC9hk-r4w",
// })(MyMap);

