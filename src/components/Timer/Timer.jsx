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
    if (secRef.current.value > 59 || secRef.current.value < 0 || 
        minRef.current.value > 59 || minRef.current.value < 0 ||
        hourRef.current.value > 23 || hourRef.current.value < 0) {
      alert ('no sec')
    } else {
      setSum((hourRef.current.value * 3600) + (minRef.current.value * 60) + secRef.current.value)
      setTimeLeft((hourRef.current.value * 3600) + (minRef.current.value * 60) + secRef.current.value)
      setIsCounting(false)
      document.getElementById('circle_svg').style.animation=`none`
    }

    secRef.current.value = null
    minRef.current.value = null 
    hourRef.current.value = null
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
      <div className='timer_input'>
        <input type='text' ref={hourRef} placeholder='hours'/>
        <input type='text' ref={minRef} placeholder='minutes'/>
        <input type='text' ref={secRef} placeholder='seconds'/>
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