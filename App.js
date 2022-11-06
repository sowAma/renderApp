import React, { useState, useEffect, useRef } from 'react'
import Messages from './Messages'
import './App.css';

export default function App() { 
  const [message, setMessage]= useState([])
  const inputValue = useRef()
  const LOCAL_STORAGE_KEY = 'messagingApp.message'

  useEffect(()=>{
    const storedMessages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedMessages) setMessage(storedMessages)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(message))
  },[message])

  
  const createMessage = (e)=>{
    e.preventDefault() 
    if(inputValue.current.value === '') return
    setMessage(prevMessage=>
      [...prevMessage, inputValue.current.value])    
  }

  const deleteMessage = ()=>{
    setMessage([])
  }
  const deleteLast = (e)=>{
  const newMessages = [...message]
  newMessages.pop()
  setMessage(newMessages)
  }
  return (
    <>
    <div className='title'>Render text</div>
    <input ref={inputValue} type= 'text' />
    <button onClick= {createMessage } >Add</button>
    <button onClick= {deleteMessage} >Clear </button>
    <button onClick= {deleteLast} >Delete last</button>
    {message.map((mes, idx)=>{
      return (<Messages key={idx} message={mes} onCheck ={null} />)
    })}
    </>
  )
}
