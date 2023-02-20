import React, { useState, useEffect } from 'react'
import './Login.css'
import svglogin from '../../Images/Signup.png'
import { auth, db } from '../../firebase'
import Logo from '../../Images/Loginlogo.png'
import { useNavigate } from "react-router-dom";
import cPassword from '../../Images/confirm_password.png'
import emial from '../../Images/email.png'
import close_eye from '../../Images/disable_eye.png'
import eye from '../../Images/eye.png'
import completed from '../../Images/completed.png'
import Close from '../../Images/close.png'
import Attention from '../../Images/attention.png'
import "./Modal.css";



function Login() {

    let navigate = useNavigate();
    const [alert, setAlert] = useState({
        message: '',
        type: ''
    });

    const [modal, setModal] = useState(false);
    const [resetModal, setResetModal] = useState(false)
    const [disableBtn, setDisableBtn] = useState(true)
    const [userInFo, setUserInFo] = useState({
        email: '',
        password: '',
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidEmail: true,
    });

    const [resetInFo, setResetInFo] = useState({
        email: '',
        password: '',
        confirm_password: '',
        password_secureTextEntry: true,
        confirm_secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
        isValidEmail: true,
    });

    const handleSignIn = () => {
        if (userInFo.password == "" || userInFo.email == "") {
            setAlert({
                message: 'Fields are empty, Please fill the fields first'
            })
            toggleModal();
        }
        else {
            auth
                .signInWithEmailAndPassword(userInFo.email, userInFo.password)
                .then(userCredentials => {
                    console.log(userCredentials);
                    setUserInFo({
                        email: '',
                        password: '',
                        secureTextEntry: true,
                        isValidUser: true,
                        isValidPassword: true,
                    });
                    routeChange('/Home');
                })
                .catch(error => {
                    setAlert({
                        message: error.message
                    })
                    toggleModal();

                })
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                routeChange('/Home')
            }
        })
        return unsubscribe
    }, []);

    const routeChange = (path) => {
        navigate(path)
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const textChangeHandler = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

        if (val.trim().length >= 11) {
            if (reg.test(val)) {
                setUserInFo({
                    ...userInFo,
                    email: val,
                    isValidUser: true,
                    isValidEmail: true
                });
            } else {
                setUserInFo({
                    ...userInFo,
                    email: val,
                    isValidUser: true,
                    isValidEmail: false
                });
            }
        } else {
            setUserInFo({
                ...userInFo,
                email: val,
                isValidUser: false,
                isValidEmail: false
            });
        }
    };

    const passwordChangeHandler = (val) => {
        if (val.trim().length >= 6) {
            setUserInFo({
                ...userInFo,
                password: val,
                isValidPassword: true,
            });
        } else {
            setUserInFo({
                ...userInFo,
                password: val,
                isValidPassword: false
            });
        }
    };

    const handleVisibility = () => {
        const email = userInFo.email.trim()
        const password = userInFo.password.trim()

        if (email == '' || password == '') {
            setDisableBtn(true);
        } else {
            setDisableBtn(false)
        }
    };

    const resetTextChangeHandler = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/

        if (val.trim().length >= 11) {
            if (reg.test(val)) {
                setResetInFo({
                    ...resetInFo,
                    email: val,
                    isValidUser: true,
                    isValidEmail: true
                });
            } else {
                setResetInFo({
                    ...resetInFo,
                    email: val,
                    isValidUser: true,
                    isValidEmail: false
                });
            }
        } else {
            setResetInFo({
                ...resetInFo,
                email: val,
                isValidUser: false,
                isValidEmail: false
            });
        }
    };

    const resetPasswordChangeHandler = (val) => {
        if (val.trim().length >= 6) {
            setResetInFo({
                ...resetInFo,
                password: val,
                isValidPassword: true,
            });
        } else {
            setResetInFo({
                ...resetInFo,
                password: val,
                isValidPassword: false
            });
        }
    };

    const confirmPasswordChangeHandler = (val) => {
        let length = val.length
        let password = resetInFo.password.slice(0, length)
        if (val == password) {
            setResetInFo({
                ...resetInFo,
                confirm_password: val,
                isValidConfirmPassword: true
            });
        } else {
            setResetInFo({
                ...resetInFo,
                confirm_password: val,
                isValidConfirmPassword: false
            });
        }
    }

    const handleResetPassword = () => {
        const email = resetInFo.email.trim()
        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setResetModal(!resetModal)
                setResetInFo({
                    email: '',
                    password: '',
                    confirm_password: '',
                    password_secureTextEntry: true,
                    confirm_secureTextEntry: true,
                    isValidUser: true,
                    isValidPassword: true,
                    isValidConfirmPassword: true,
                    isValidEmail: true,
                })
            })
            .catch((error) => {
                toggleModal()
                setAlert({
                    message: error.message
                });
            });
    }

    return (
        <div className="login">
            <div className="login_body">
                <div className="login_left">
                    <img src={svglogin} alt="" className="login_left_svg" />
                </div>
                <div className="login_right">
                    <div className="login_right_header">
                        <img src={Logo} alt="" className="login_logo" />
                        <h3 className="login_text">login</h3>
                    </div>

                    <div className="login_fields">
                        <div className="input_wrapper">
                            <img src={emial} alt="" className="input_icon" style={{ width: 20, height: 20 }} />
                            <input type="email" name='Email' className='l-fields' placeholder='Email'
                                value={userInFo.email}
                                onChange={(e) => {
                                    textChangeHandler(e.target.value)
                                    handleVisibility()
                                }}
                            />
                            {userInFo.isValidEmail
                                ? <img src={completed} alt="" className="input_icon" style={{ width: 17, height: 17 }} /> : null
                            }
                        </div>
                        <span
                            style={{
                                color: '#FF0000',
                                fontSize: '14px',
                                margin: '0px',
                                visibility: userInFo.isValidEmail ? 'hidden' : 'visible'
                            }}
                        >
                            Email address is badly formated
                        </span>

                        <div className="input_wrapper" >
                            <img src={cPassword} alt="" className="input_icon" style={{ width: 20, height: 20 }} />
                            <input type={userInFo.secureTextEntry ? 'password' : 'text'} name='Password' className='l-fields' placeholder='Password'
                                value={userInFo.password}
                                onChange={(e) => {
                                    passwordChangeHandler(e.target.value)
                                    handleVisibility()
                                }}
                            />
                            <img src={userInFo.secureTextEntry ? close_eye : eye} alt="" className="input_icon" onClick={() => setResetInFo({
                                ...userInFo,
                                secureTextEntry: !userInFo.secureTextEntry
                            })} style={{ width: 17, height: 17 }} />
                        </div>
                        <span
                            style={{
                                color: '#FF0000',
                                fontSize: '14px',
                                margin: '0px',
                                visibility: userInFo.isValidPassword ? 'hidden' : 'visible'
                            }}
                        >
                            Password must be 6 characters long
                        </span>
                        <div className="forget_Password" onClick={() => setResetModal(!resetModal)}>
                            <span>Forget Password</span>
                        </div>
                    </div>

                    <button className='login_button' style={{ border: 'none' }} onClick={handleSignIn} >Log In</button>
                    <button className='login_button' style={{ color: '#888888', background: 'transparent' }} onClick={() => routeChange('/Signup')}>Register</button>
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
                                    }}
                                >
                                    <img src={Close} alt="" style={{ width: '22px', height: '22px' }} />
                                </div>

                            </div>
                        </div>
                    )}

                    {resetModal && (
                        <div className="modal">
                            <div onClick={() => setResetModal(!resetModal)} className="overlay"></div>
                            <div className="modal_content" style={{}}>
                                <div className="reset_modal_fields">
                                    <div className='promt_text'>
                                        <span
                                            style={{
                                                fontSize: '18px',
                                            }}
                                        >
                                            Please enter the email address you're using with your account
                                        </span>
                                    </div>
                                    <div className="input_wrapper">
                                        <img src={emial} alt="" className="input_icon" style={{ width: 20, height: 20 }} />
                                        <input type="email" name='Email' className='l-fields' placeholder='Email'
                                            value={resetInFo.email}
                                            onChange={(e) => {
                                                resetTextChangeHandler(e.target.value)
                                                handleVisibility()
                                            }}
                                        />
                                        {resetInFo.isValidEmail
                                            ? <img src={completed} alt="" className="input_icon" style={{ width: 17, height: 17 }} /> : null
                                        }
                                    </div>
                                    <span
                                        style={{
                                            color: '#FF0000',
                                            fontSize: '14px',
                                            marginBottom: '50px',
                                            visibility: resetInFo.isValidEmail ? 'hidden' : 'visible'
                                        }}
                                    >
                                        Email address is badly formated
                                    </span>
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: '0px', right: '0px',
                                            bottom: '20px',
                                            padding: '8px 20px',
                                            display: 'flex',
                                            justifyContent: 'flex-end'
                                        }}
                                    >
                                        <button className='modal_buttons' onClick={() => {
                                            setResetModal(!resetModal)
                                            setResetInFo({
                                                email: '',
                                                password: '',
                                                confirm_password: '',
                                                password_secureTextEntry: true,
                                                confirm_secureTextEntry: true,
                                                isValidUser: true,
                                                isValidPassword: true,
                                                isValidConfirmPassword: true,
                                                isValidEmail: true,
                                            })
                                            
                                        }}>Cancel</button>
                                        <button className='modal_buttons' onClick={() => {
                                            handleResetPassword()
                                            setResetInFo({
                                                email: '',
                                                password: '',
                                                confirm_password: '',
                                                password_secureTextEntry: true,
                                                confirm_secureTextEntry: true,
                                                isValidUser: true,
                                                isValidPassword: true,
                                                isValidConfirmPassword: true,
                                                isValidEmail: true,
                                            })
                                        }}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>

        </div >

    )
}


export default Login