import React, { useState, useEffect, useRef } from 'react'
import { getPadTime } from './functions'
import audio from './sounds/alert.mp3'

import './timer.scss'

const Timer = () => {
  const [timeSet, setTimeSet] = useState(10000)
  const [timeLeft, setTimeLeft] = useState(timeSet)
  const [fixedTime, setFixedTime] = useState(Date.now() + timeSet)
  const [isCounting, setIsCounting] = useState(false)
  const [timeEnd, setTimeEnd] = useState(false)

  const secRef = useRef()
  const minRef = useRef()
  const hourRef = useRef()

  let hours = getPadTime(Math.floor(timeLeft / 3600000))
  let minutes = getPadTime(Math.floor((timeLeft - hours * 3600000) / 60000))
  let seconds = getPadTime(Math.floor((timeLeft - (hours * 3600000) - (minutes * 60000)) / 1000))

  let numhours = []
  let numminsec = []

  const alert = new Audio(audio)

  for (let i = 1; i < 25; i++) {
    numhours.push(i)
  }

  for (let i = 1; i < 60; i++) {
    numminsec.push(i)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      isCounting && setTimeLeft((timeLeft) => timeLeft >=1000 ? fixedTime - Date.now() : 0)

    }, 1000)
    
    if (timeLeft === 0) {
      alert.play()
      setIsCounting(false)
      setTimeEnd(true)
      document.getElementById('circle_svg').style.animation=`none`
    }

    return () => clearInterval(timer)
  }, [timeLeft, fixedTime, isCounting])

  const handleStart = () => {
    setIsCounting(true)
    setTimeLeft(timeSet)
    setFixedTime(Date.now() + timeSet)
    setTimeEnd(false)
    document.getElementById('circle_svg').style.animation = `clock-animation ${timeSet / 1000}s linear`
  }

  const handleStop = () => {
    setIsCounting(false)
    setTimeLeft(timeSet)
    document.getElementById('circle_svg').style.animation=`none`
  }

  const handleSet = () => {
    setIsCounting(false)
    setTimeEnd(false)
    setTimeSet(parseInt(hourRef.current.value * 3600000) + parseInt(minRef.current.value * 60000) + parseInt(secRef.current.value * 1000) + 500)
    setTimeLeft(parseInt(hourRef.current.value * 3600000) + parseInt(minRef.current.value * 60000) + parseInt(secRef.current.value * 1000) + 500)
    document.getElementById('circle_svg').style.animation=`none`
  }

  return (
    <div className='main_timer'>
      <div className='timer_clock'>
        <svg>
          <g>
            <circle cx="150" cy="-3" r="60" className='circle_svg_back'/>
            <circle cx="150" cy="-3" r="60" id='circle_svg'/>
            <text x="23" y="80" fill="blue">{hours} : {minutes} : {seconds}</text>
          </g>
        </svg>
        </div>

      <div className='timer_input_all'>
        <div className='timer_input'>
          <label>
            H:
            <select ref={hourRef} size='3' defaultValue={0}>
              <option value={0}>0</option>
              {numhours.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          <label>
            M:
            <select ref={minRef} size='3' defaultValue={0}>
              <option value={0}>0</option>
              {numminsec.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          <label>
            S:
            <select ref={secRef} size='3' defaultValue={10}>
              <option value={0}>0</option>
              {numminsec.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
        </div>
      </div>

      <div className='timer_buttons'>
        {isCounting ? <button onClick={handleStop}>Stop</button> : <button onClick={handleStart}>Start</button>}
        <button onClick={handleSet}>Set</button>
      </div>

      <div>
        {timeEnd && <p className='p_timesup'>Time's up!</p>}
      </div>
    </div>
  )
}

export default Timer