import React from 'react'
import { Card } from '../component/Card/Card'
import { CardsData } from '../Data/Data'
import './Cards.css'


const Cards = () => {
  return (
    <div className="Cards">
        {CardsData.map((item,id)=>{
            return(
                <div className="parentContainer">
                <Card
                 title={item.title}
                 color={item.color}
                 barValue={item.barValue}
                 Value={item.Value}
                 Png={item.png}
                 series={item.series}
                />
                </div>
            )

        })}
    </div>
  )
}

export default Cards