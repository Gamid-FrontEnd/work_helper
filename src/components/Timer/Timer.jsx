import React, { useState, useEffect,useRef } from 'react'
import { getPadTime } from './functions'

import './timer.scss'

import audio from './sounds/alert.mp3'

const Timer = () => {
  const [sum, setSum] = useState(2 * 60)
  const [timeLeft, setTimeLeft] = useState(2 * 60)
  const [isCounting, setIsCounting] = useState(false)
  const [timeUp, setTimeUp] = useState(false)

  const secRef = useRef()
  const minRef = useRef()
  const hourRef = useRef()

  const hours = getPadTime(Math.floor(timeLeft / 3600))
  const minutes = getPadTime(Math.floor((timeLeft - (hours * 3600)) / 60))
  const seconds = getPadTime(timeLeft - (hours * 60 * 60) - (minutes * 60))

  let aud = new Audio(audio)

  let numhours = []
  let numminsec = []

  for (let i = 1; i < 25; i++) {
    numhours.push(i)
  }

  for (let i = 1; i < 60; i++) {
    numminsec.push(i)
  }
  

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting && setTimeLeft((timeLeft) => timeLeft >= 1 ? timeLeft - 1 : 0)
    }, 1000)

    if (timeLeft === 0) {
      document.getElementById('circle_svg').style.animation=`none`
      setIsCounting(false)
      setTimeUp(true)
      aud.play()
      setTimeLeft(sum)
    }

    return () => clearInterval(interval)
  }, [timeLeft, isCounting])


  const handleStart = () => {
    if (timeLeft === 0) {
      setTimeLeft(sum)
    }
    document.getElementById('circle_svg').style.animation=`clock-animation ${timeLeft}s linear`
    setIsCounting(true)
    setTimeUp(false)
  }

  const handleStop = () => {
    setIsCounting(false)
    document.getElementById('circle_svg').style.animation=`none`
  }

  const handleReset = () => {
    setIsCounting(false)
    setTimeLeft(sum)
    document.getElementById('circle_svg').style.animation=`none`
  }

  const handleSet = () => {
      setSum(parseInt(hourRef.current.value * 3600) + parseInt(minRef.current.value * 60) + parseInt(secRef.current.value))
      setTimeLeft(parseInt(hourRef.current.value * 3600) + parseInt(minRef.current.value * 60) + parseInt(secRef.current.value))
      setIsCounting(false)
      document.getElementById('circle_svg').style.animation=`none`
  }


  return (
    <div className='main_timer'>
      <div>
        {timeUp && <p>Time's Up!</p>}
      </div>
      <div className='timer_clock'>
        <svg>
          <g>
            <circle cx="150" cy="-3" r="60" id='circle_svg'/>
            <text x="23" y="80" fill="blue">{hours} : {minutes} : {seconds}</text>
          </g>
        </svg>
      </div>
      <div className='timer_input_all'>
        <div className='timer_input'>
          <label>
            H:
            <select ref={hourRef} size='3'>
              <option value={0} selected>0</option>
              {numhours.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          <label>
            M:
            <select ref={minRef} size='3'>
              <option value={0} selected>0</option>
              {numminsec.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
          <label>
            S:
            <select ref={secRef} size='3'>
              <option value={0} selected>0</option>
              {numminsec.map(num => <option key={num} value={num}>{num}</option>)}
            </select>
          </label>
        </div>
      </div>
      <div className='timer_buttons'>
        {isCounting ? <button onClick={handleStop}>Stop</button> : <button onClick={handleStart}>Start</button>}
        <button onClick={handleSet}>Set</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  )
}

export default Timer