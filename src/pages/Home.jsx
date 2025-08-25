import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import Button from '../components/Button'
import DiaryList from '../components/DiaryList'
import { DiaryStateContext } from '../App'
import useTitle from '../hook/useTitle'
const Home = () => {

  const data = useContext(DiaryStateContext)

  useTitle("감정 일기장 홈")

  const [pivotDate, setPivotDate] = useState(new Date())



  const getMonthlyData = (pivotDate, data) => {

    const beginTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth(),
      1,
      0, 0, 0
    ).getTime()
    const endTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth() + 1,
      0,
      23, 59, 59
    ).getTime()

    return data.filter(
      (item) => beginTime <= item.createdDate && item.createdDate <= endTime
    )
  }


  const monthlyData = getMonthlyData(pivotDate,data)
  const onIncreamentMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1)
    )
  }
  const onDecreamentMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1)
    )
  }
  return (
    <div>
      <Header
        leftChild={<Button text={"<"} onClick={onDecreamentMonth} />}
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        rightChild={<Button text={">"} onClick={onIncreamentMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  )
}

export default Home