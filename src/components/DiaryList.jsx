import React ,{useState}from 'react'
import "./DiaryList.css"
import DiaryItem from './DiaryItem'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
const DiaryList = ({ data }) => {
  const nav = useNavigate()
  const [sortType, setSortType]=useState('latest')

  const onChangeSortType =(e)=>{
    setSortType(e.target.value)
  }

  const getSortedData =()=>{
    return data.toSorted((a,b)=>{
      if(sortType ==='oldest'){
        return Number(a.createdDate)-Number(b.createdDate)
      }else{
        
        return Number(b.createdDate)-Number(a.createdDate)
      }
    })
  }
  const sortData = getSortedData()

  return (
    <div className='DiaryList'>
      <div className="menu-bar">
        <select value={sortType} onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된순</option>
        </select>
        <Button
        onClick={()=>nav('/new')}
        text={"새 일기 쓰기"} type={"POSITIVE"} />
      </div>
      <div className="list-wrapper">
        {sortData.map((item) => (

          <DiaryItem key={item.id} {...item}/>
        ))}

      </div>
    </div>
  )
}

export default DiaryList