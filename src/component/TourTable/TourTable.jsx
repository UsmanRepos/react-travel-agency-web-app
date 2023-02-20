import { color } from '@mui/system';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './TourTable.css'

function TourTable({ tourtableData }) {
  let navigate = useNavigate();
  const routeChange = (item) => {
    let path = '/TourDetail';
    navigate(path, {
      state: {
        tour: item
      }
    });
  }


  const makeStatusStyle = (status) => {
    let style = {
      display: 'flex',
      flex: 1,
      height: '30px',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '15px',
    }

    if (status === 'active') {
      return {
        ...style,
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      }
    }
    else if (status === 'open') {
      return {
        ...style,
        color: 'red',
        background: '#ffadad8f'

      }
    }
    else {
      return {
        ...style,
        color: 'white',
        backgroundColor: '#59bfff'
      }
    }

  }

  return (
    <div className="tour_table_">
      <h2 style={{ color: '#888888'}}>Tours</h2>
      <table className='tour_table_content'>
        <tr className='tour_table_header'>
          <th className='tour_table_header_cell'> Tour Name</th>
          <th className='tour_table_header_cell'>Start Date</th>
          <th className='tour_table_header_cell'> End Date</th>
          <th className='tour_table_header_cell'> Booking</th>
          <th className='tour_table_header_cell'>Price</th>
          <th className='tour_table_header_cell'>Status</th>
          <th className='tour_table_header_cell'></th>
        </tr>

        {tourtableData.map((item, index) => (
          <tr className='tour_table_row' key={index}>
            <td className='tour_table_cell'>{item.name}</td>
            <td className='tour_table_cell'>{item.startdate}</td>
            <td className='tour_table_cell'>{item.enddate}</td>
            <td className='tour_table_cell'>{item.booking}</td>
            <td className='tour_table_cell'>{item.price}</td>
            <td className='tour_table_cell'><span style={makeStatusStyle(item.status)}>{item.status}</span></td>
            <td className='tour_table_cell' onClick={() => routeChange(item)} style={{ cursor: 'pointer', color: 'blue' }}
            >details...</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

export default TourTable