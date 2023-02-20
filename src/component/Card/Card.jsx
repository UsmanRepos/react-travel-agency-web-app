import React from 'react'
import { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Card.css'
import { motion, AnimateSharedLayout } from 'framer-motion'
import { UilTimes } from '@iconscout/react-unicons'
import Chart from 'react-apexcharts'

export const Card = (props,index) => {
  const [expanded, setExpanded] = useState(false)
  return (
    
    <AnimateSharedLayout key={index}>
      {
        expanded ?

          <ExpandedCard param={props} setExpanded={() => setExpanded(false)} /> :
          <CompactCard param={props} setExpanded={() => setExpanded(true)} />
      }
    </AnimateSharedLayout>

  )
}

function CompactCard({ param, setExpanded }) {
  const Png = param.Png;
  return (
    <motion.div className="CompactCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow
      }}
      onClick={setExpanded}
      layoutId='expendableCard'>

      <div className="radialBar">
        <CircularProgressbar
          value={param.barValue}
          text={`${param.barValue}%`}
        />
        <span>{param.title}</span>
      </div>
      <div className="detail">
        <Png />
        <span>${param.Value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div >
  )
}

function ExpandedCard({ param, setExpanded }) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },
      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },
      fill: {
        color: ["#fff"],
        type: "gradient",

      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],

      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datatime",
        catagories: [
          "2018-09-19t00:00:00.000Z",
          "2018-09-19t01:00:00.000Z",
          "2018-09-19t02:00:00.000Z",
          "2018-09-19t03:00:00.000Z",
          "2018-09-19t04:00:00.000Z",
          "2018-09-19t05:00:00.000Z",
          "2018-09-19t06:00:00.000Z"
        ],
      },
    }
  }
  return (

    <motion.div
      className="ExpandedCard"
      style={{
        background: param.color.backGround,
        boxShadow: param.color.boxShadow
      }}
      layoutId='expendableCard'>

      <div
        style={{ alignSelf: 'flex-end', cursor: 'pointer', color: 'white' }} >
        <UilTimes onClick={setExpanded}
        />
      </div>
     
        <span>
          {param.title}
        </span>
        <div className="chartContainer">
          <Chart series={param.series} type='area' options={data.options} />

        </div>
        <span>Last 24 Hours</span>
    </motion.div >
  )
}

export default Card