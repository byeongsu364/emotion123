import React from 'react'
import { useParams } from 'react-router-dom'

const Diary = () => {
  const {id}=useParams()
  return (
    <div>{id} Diary</div>
  )
}

export default Diary