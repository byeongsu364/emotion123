import Editor from '../components/Editor'
import EmotionItem from '../components/EmotionItem'
import Header from '../components/Header'
import Button from '../components/Button'
import {useContext, useState} from 'react'
import {DiaryDispatchContext} from '../App'
import { useNavigate } from 'react-router-dom'
import useTitle from '../hook/useTitle'
const New = () => {
  const nav =useNavigate()
  const {onCreate}=useContext(DiaryDispatchContext)
useTitle("새 일기 쓰기")
  const onSubmit =(input)=>{
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    )
    nav('/',{replace:true})
  }

  return (
    <div>
      <Header 
      title={"새 일기 쓰기"}
      leftChild={<Button onClick={()=>nav(-1)} text={"< 뒤로가기"}/>}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New