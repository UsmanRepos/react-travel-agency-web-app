import React from 'react'
import CustomerReview from '../CustomerReview/CustomerReview'
import Update from '../Updates/Update'
import './RightSide.css'

function RightSide() {
  return (
    <div className="RightSide">
    <div>
        <h3>Updates</h3>
        <Update/>
    </div>
    <div>
        <h3  style={{
              padding:"10px"
            }}>
            Customer Review
           
        </h3>
        <CustomerReview/>
    </div>

    </div>
  )
}

export default RightSide