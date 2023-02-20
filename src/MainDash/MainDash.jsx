import React from 'react'
import Cards from '../Cards/Cards'
import './MainDash.css'
import TopTour from '../TopTour/TopTour'

const MainDash = () => {
  return (
    <div className="MainDash">
      <h1>DashBoard</h1>
      <Cards />
      <TopTour />
      {/* <div className="main_dashboard_header">
        <h1>DashBoard</h1>
      </div>
      <div className="main_dashboard_body">
        <div className="main_dashboard_body_card">
          <Cards />
        </div>
        <div className="main_dashboard_body_table">
          <Saad />
        </div>

      </div> */}
      {/* <Table/> */}
    </div>
  )
}

export default MainDash