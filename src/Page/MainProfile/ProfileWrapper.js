import React, { useState } from 'react'
import Sidebar from '../../component/Sidebar'
import Profile from '../../Profile/Profile'
import { useNavigate } from "react-router-dom";
import { auth, db } from '../../firebase'
import Close from '../../Images/close.png'
import Warning from '../../Images/warning.png'
import Attention from '../../Images/attention.png'
import './ProfileWrapper.css'
import "./Modal.css";

function ProfileWrapper() {
  let navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({
    message: 'Are You Sure, You Want to Log Out',
    type: 'logOut'
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => { routeChange() })
      .catch(error => alert(error.message))
  };

  const routeChange = () => {
    let path = '/Login';
    navigate(path)
  }

  return (
    <div className='container'>
      <div className='TAppGlass'>
        <Sidebar toggleModal={toggleModal} selected={3} />
        <Profile />
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
                  borderWidth: '3px',
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

                {
                  alert.type === 'logOut' &&
                  <div
                    style={{
                      position: 'absolute',
                      left: '0px', right: '0px',
                      bottom: '0px',
                      padding: '8px 15px',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <button className='modal_buttons' onClick={toggleModal}>Cancel</button>
                    <button className='modal_buttons' onClick={handleSignOut}>LogOut</button>
                  </div>
                }

              </div>
              {
                alert.type !== 'logOut' &&
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
                  onClick={toggleModal}
                >
                  <img src={Close} alt="" style={{ width: '22px', height: '22px' }} />
                </div>
              }
            </div>
          </div>
        )}
        {/* <AddTour /> */}
      </div>
    </div>
  )
}

export default ProfileWrapper