import React from 'react'
import PasswordChecklist from "react-password-checklist"
import Logo from '../../Images/Loginlogo.png'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { auth, db } from '../../firebase'
import "./Modal.css";
import './Signup.css'


const GOOGLE_MAPS_API = "AIzaSyCc-u9f8sMzo7ETUnr2LEWt47zC9hk-r4w"

function Signup() {

    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    let navigate = useNavigate();
    const [disable, setDisable] = useState(false)
    const [coordinates, setCoordinates] = useState({
        latitude: '',
        longitude: ''
    })
    const [userInFo, setUserInfo] = useState({
        name: "",
        email: "",
        password: '',
        confirm_password: '',
        address: ""
    });

    const coordinatesGetter = (user) => {
        let address = userInFo.address.replace(/ /g, '%20')
        console.log(address)
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + GOOGLE_MAPS_API)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const userData = {
                    'email': userInFo.email,
                    'address': userInFo.address,
                    'fullName': userInFo.name,
                    'coordinates': {
                        latitude: data.results[0].geometry.location.lat,
                        longtude: data.results[0].geometry.location.lng
                    }
                }
                const userID = user.uid
                db.collection('travelAgency').doc(userID).set(userData)
            })
    }

    const routeChange = (path) => {
        navigate(path)
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleSignUp = () => {
        if (userInFo.name == "" || userInFo.email == "" || userInFo.password == ""
            || userInFo.confirm_password == "" || userInFo.address == "") {
            setMessage("please Fill the Signup fields First")
            toggleModal();
        }
        else {
            auth
                .createUserWithEmailAndPassword(userInFo.email, userInFo.password)
                .then(userCredentials => {
                    const user = userCredentials.user

                    user.sendEmailVerification()
                    coordinatesGetter(user)
                    setUserInfo({
                        name: "",
                        email: "",
                        phone: "",
                        password: '',
                        confirm_password: ''
                    })
                    routeChange('/Home')

                })
                .catch(error => {
                    setMessage(error.message);
                    toggleModal();
                });
        }
    };

    const [password, setPassword] = useState("")
    const [passwordAgain, setPasswordAgain] = useState("")

    return (
        <div className="signup">
            <div className="signup_body">
                <div className="signup_right">
                    <div className="signup_right_header">
                        <img src={Logo} alt="" className="icon" style={{
                            height: "20vh",
                            width: "20vh",
                        }} />
                    </div>
                    <div className="signup_fields">
                        <div className="fields_wrapper">
                            <input type="text" name='Name' className='s-fields' placeholder='Full Name'
                                value={userInFo.name}
                                onChange={(e) => {
                                    setUserInfo({
                                        ...userInFo,
                                        'name': e.target.value
                                    })
                                }}
                            />
                            <input type="email" name='Email' className='s-fields' placeholder='Email Address'
                                value={userInFo.email}
                                onChange={(e) => {
                                    setUserInfo({
                                        ...userInFo,
                                        'email': e.target.value
                                    })
                                }}
                                style={{

                                }}
                            />
                        </div>
                        <div className="fields_wrapper">
                            <input type="password" name='password' className='s-fields' placeholder='Password'
                                value={userInFo.password}
                                onChange={(e) => {
                                    setUserInfo({
                                        ...userInFo,
                                        'password': e.target.value
                                    })
                                    setPassword(e.target.value)
                                }}
                            />
                            <input type="password" name='confirm_password' className='s-fields' placeholder='Confirm Password'
                                value={userInFo.confirm_password}
                                onChange={(e) => {
                                    setUserInfo({
                                        ...userInFo,
                                        'confirm_password': e.target.value
                                    })
                                    setPasswordAgain(e.target.value)
                                }}
                            />
                        </div>
                        <input type="text" name='address' className='s-fields' placeholder='Full Address'
                            value={userInFo.address}
                            onChange={(e) => {
                                setUserInfo({
                                    ...userInFo,
                                    'address': e.target.value
                                })
                            }}
                            style={{ width: "98.2%" }}
                        />
                    </div>
                    <PasswordChecklist
                        rules={["minLength", "specialChar", "number", "capital", "match"]}
                        minLength={6}
                        value={password}
                        valueAgain={passwordAgain}
                        onChange={(isValid) => { }}
                    />
                    <br />

                    <button className='signup_button' style={{ border: 'none', fontSize: '18px', fontWeight: 'bold' }} onClick={() => {
                        handleSignUp()

                    }}>Register</button>
                    <button className='signup_button' style={{ color: '#888888', background: 'transparent', fontSize: '18px', fontWeight: 'bold' }} onClick={() => routeChange('/Login')}>Log In</button>

                    {modal && (
                        <div className="modal">
                            <div onClick={toggleModal} className="overlay"></div>
                            <div className="modal-content">
                                <h2>Alert</h2>
                                <p>
                                    {message}

                                </p>
                                <button className="close-modal" onClick={() => {
                                    toggleModal()

                                }}>
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    )}

                </div>


            </div>

        </div >
    )
}

export default Signup