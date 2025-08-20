import Editor from '../components/Editor'
import EmotionItem from '../components/EmotionItem'
import Header from '../components/Header'
import Button from '../components/Button'
import { useContext, useState } from 'react'
import { DiaryDispatchContext } from '../App'
import { useNavigate } from 'react-router-dom'

const New = () => {

  const nav = useNavigate()
  const {onCreate} = useContext(DiaryDispatchContext)


  const onSubmit = (input)=>{
    onCreate(
      input.createdDate.getTime(),
      input.emotionId,
      input.content
    )
    nav('/', {replace:true})
  }

  return (
    <div>
      <Header
      title = {"새 일기 쓰기"}
      leftchild={<Button text={" < 뒤로가기"} onClick={()=>nav(-1)}/>}
      />
      <Editor onSubmit={onSubmit}/>
    </div>
  )
}

export default New