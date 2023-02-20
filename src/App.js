import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Tours from './Page/Tours/Tours';
import Home from './Page/Home/Home';
import TourScreen from './TourScreen/TourScreen';
import Vehicle from './Vehicle/Vehicle';
import Profile from './Profile/Profile';
import Signup from './Authentication/Signup/Signup';
import Login from './Authentication/Login/Login';
import VehicleLocation from './VehicleLocation/VehicleLocation';
import TopTour from './TopTour/TopTour'
import VehicleTable from './VehicleTable/VehicleTable';
import AddTours from './component/AddTours/AddTours';
import VehicleScreen from './VehicleScreen/VehicleScreen';
import MainVehicle from './Page/MainVehicle/VehicleWrapper'
import TourDetail from './TourDetail/TourDetail'
import VehicleDetail from './VehicleDetail/VehicleDetail';
import MainProfile from './Page/MainProfile/ProfileWrapper'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';


function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCc-u9f8sMzo7ETUnr2LEWt47zC9hk-r4w',
    libraries: ['places'],
  })

  if (!isLoaded) {
    return <div>Loading ....</div>
  }
  
  return (
    <div className="App">
      {/* <TourDetail/> */}
      {/* <VehicleScreen/> */}
      {/* <VehicleTable/> */}
      {/* <Vehicle/> */}
      {/* <Profile/> */}

      {/* <TopTour/> */}
      {/* <Profile/> */}
      {/* <Signup/> */}
      {/* <Login/> */}
      {/* <VehicleLocation/> */}
      {/* <AddTours /> */}
      {/* <TourScreen/> 
      <TopTour/> */}
      {/* <MainVehicle/> */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />

        <Route path="/Tours" element={<Tours />} />
        <Route path="/MainVehicle" element={<MainVehicle />} />
        <Route path="/MainProfile" element={<MainProfile />} />
        <Route path="/AddTours" element={<AddTours />} />
        <Route path="/TourDetail" element={<TourDetail />} />
        <Route path="Vehicle" element={<Vehicle />} />
        <Route path="/VehicleDetail" element={<VehicleDetail />} />
        <Route path="/VehicleScreen" element={<VehicleScreen />} />
        <Route path="/VehicleLocation" element= {
          <ChakraProvider theme={theme}>
            <VehicleLocation />
          </ChakraProvider>
        } />

      </Routes>
    </div>
  );
}
export default App;
