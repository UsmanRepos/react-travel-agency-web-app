import React from 'react'
import './VehicleTable.css'
import { useNavigate } from "react-router-dom";

function VehicleTable({ vehicletableData }) {
    let navigate = useNavigate();
    const routeChange = (item) => {
        let path = '/VehicleDetail';
        navigate(path, {
            state: {
                vehicle: item
            }
        });
    }
   
    return (
        <div className="Vehicle_table_">
            <h2 style={{ color: '#888888'}}>Vehicle</h2>
            <table className='Vehicle_table_content'>
                <tr className='Vehicle_table_header'>
                    <th className='vehicle_table_header_cell'> Vehicle Id</th>
                    <th className='vehicle_table_header_cell'>Vehicle No</th>
                    <th className='vehicle_table_header_cell'> Chases No</th>
                    <th className='vehicle_table_header_cell'> Model</th>
                    <th className='vehicle_table_header_cell'> Tour Id</th>
                    <th className='vehicle_table_header_cell'> </th>
                </tr>

                {vehicletableData.map((item, index) => (
                    <tr className='Vehicle_table_row' key={index}>
                        <td className='Vehicle_table_cell'>{item.vehicle_id}</td>
                        <td className='Vehicle_table_cell'>{item.vehicle_no}</td>
                        <td className='Vehicle_table_cell'>{item.chases_no}</td>
                        <td className='Vehicle_table_cell'>{item.Model}</td>
                        <td className='Vehicle_table_cell'>{item.tour_id}</td>
                        <td className='Vehicle_table_cell' onClick={() => routeChange(item)} style={{ cursor: 'pointer', color: 'blue' }}>
                            detail...</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}

export default VehicleTable