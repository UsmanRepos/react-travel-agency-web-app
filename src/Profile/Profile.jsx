import { useState, useEffect } from 'react'
import profile from '../Images/profile.png'
import calender from '../Images/calendar.png'
import phone from '../Images/phone.png'
import email from '../Images/email.png'
import user from '../Images/user.png'
import home from '../Images/home.png'
import Close from '../Images/close.png'
import Attention from '../Images/attention.png'
import { db, auth } from '../firebase'
import './Modal.css'
import './Profile.css'


function Profile() {
    const [profileInFO, setProfileInfo] = useState({
        name: "",
        fullname: "",
        phoneNumber: "",
        email: "",
        address: ""

    });
    const [updatedInFO, setUpdatedInFO] = useState({
        name: "",
        fullname: "",
        phoneNumber: "",
        email: "",
        address: "",

    });
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState({
        message: 'Are You Sure, You Want to Log Out',
        type: 'logOut'
    });

    useEffect(() => {
        db.collection('travelAgency').doc(auth.currentUser.uid)
            .get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    setProfileInfo(doc.data())
                    setUpdatedInFO(doc.data())
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
    }, [])


    const handleUpdateProfile = () => {
        let responce = checkValidation();
        if (responce == 1) {
            const vehicleRef = db.collection('travelAgency').doc(auth.currentUser.uid);
            vehicleRef.update(updatedInFO).then(() => {
                setAlert({
                    message: "Success, Record is Updated in the database successfully ..",
                    type: ''
                })
                toggleModal();
                setProfileInfo(updatedInFO)
            })
        }
        else{
            toggleModal();


        }
    }

    const toggleModal = () => {
        setModal(!modal);
    };

    const checkValidation = () => {
        let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
        let phoneReg = /\+[0-9]{12}/

        if (!regEmail.test(profileInFO.email)) {
            setAlert({
                message: "Email address is badly formated ...",
                type: ''
            })
            return 0
        }

        console.log(updatedInFO.phoneNumber)
        console.log(updatedInFO.phoneNumber.length)

        if (!phoneReg.test(updatedInFO.phoneNumber)) {
            console.log("phone")
            setAlert({
                type: '',
                message: 'Invalid Phone Number\nPlease enter the valid information'
            })
            return 0
        }
        return 1
    }


    return (

        <div className="profile">
            <div className="profile_header">
                <h2 className="header_text">Edit User</h2>
                {/* <button className='button profile_header_btn'>create</button> */}
            </div>
            <div className="profile_body">
                <div className="profile_body_left">
                    <div className="profile_body_left_header">
                        <div className="left_profile_img_contianer">
                            <img src={profile} alt="boy img" className="left_profile_img" />
                        </div>

                        <div className="profile_card">
                            <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{profileInFO.fullname ?? "Not Provided"}</span>
                            <span style={{ fontSize: '14px', color: 'white', marginTop: '3px', letterSpacing: '.5px' }}>{profileInFO.email ?? "Not Provided"}</span>
                            <div className="profile_card_button">
                                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>+ Software Developer</span>
                            </div>
                        </div>
                    </div>
                    <div className="body_left_body">
                        <div className="account_details">
                            {/* <h3 className="account_details_text">Account Details</h3> */}
                            <div className="card">
                                <img src={user} alt="" className="profile_icon" />
                                <span style={{ fontSize: '17px' }}>{profileInFO.name ?? "Not Provided"}</span>
                            </div>
                            <div className="horizontal_line"></div>
                            <div className="card">
                                <img src={calender} alt="" className="profile_icon" />
                                <span style={{ fontSize: '17px' }}>21/9/2020</span>
                            </div>
                        </div>
                        <div className="contact_details">
                            {/* <h3 className="contact_details_text">Contact</h3> */}
                            <div className="card">
                                <img src={phone} alt="" className="profile_icon" />
                                <span style={{ fontSize: '17px' }}>{profileInFO.phoneNumber ?? "Not Provided"}</span>
                            </div>
                            <div className="horizontal_line"></div>
                            <div className="card">
                                <img src={email} alt="" className="profile_icon" />
                                <span style={{ fontSize: '17px' }}>{profileInFO.email ?? "Not Provided"}</span>
                            </div>
                            <div className="horizontal_line"></div>
                            <div className="card">
                                <img src={home} alt="" className="profile_icon" />
                                <span style={{ fontSize: '17px' }}>{profileInFO.address ?? "Not Provided"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_body_right">
                    <h2 className="profile_body_right_header">Edit</h2>
                    <div className="profile_body_right_inner">
                        <div className="profile_body_inner_left">
                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>User Name</span>
                            <input type="text" name='Name' className='p-fields' placeholder='User Name'
                                value={updatedInFO.name}
                                onChange={(e) => {
                                    setUpdatedInFO({
                                        ...updatedInFO,
                                        'name': e.target.value
                                    })

                                }}
                            />
                            <br />
                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>Full Name</span>
                            <input type="text" name='FullName' className='p-fields' placeholder='Enter Full Name'
                                value={updatedInFO.fullname}
                                onChange={(e) => {
                                    setUpdatedInFO({
                                        ...updatedInFO,
                                        'fullname': e.target.value
                                    })
                                }}
                            />
                            <span style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '15px' }}>Email</span>
                            <input type="email" name='email' className='p-fields' placeholder='Enter Email'
                                value={updatedInFO.email}
                                onChange={(e) => {
                                    setUpdatedInFO({
                                        ...updatedInFO,
                                        'email': e.target.value
                                    })
                                }}
                            />

                            <span style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '15px' }}>Phone Number</span>
                            <input type='tel' name='Phone' className='p-fields' placeholder='+92 3152331112' pattern="+[0-9]{2} [0-9]{10}"
                                value={updatedInFO.phoneNumber}
                                onChange={(e) => {
                                    setUpdatedInFO({
                                        ...updatedInFO,
                                        'phoneNumber': e.target.value
                                    })
                                }}
                            />

                            <span style={{ fontSize: '16px', fontWeight: 'bold', marginTop: '15px' }}>Address</span>
                            <input type="text" name='Address' className='p-fields' placeholder='Address'
                                value={updatedInFO.address}
                                onChange={(e) => {
                                    setUpdatedInFO({
                                        ...updatedInFO,
                                        'address': e.target.value
                                    })
                                }}
                            />
                        </div>
                        <div className="profile_body_inner_right">
                            <div className="right_profile_img_container">
                                <img src={profile} alt="" className="right_profile_img" />
                            </div>

                            <button className='button profile_button' onClick={handleUpdateProfile}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>

    )
}

export default Profile