import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { DiaryStateContext } from '../App'
const useDiary = (id,{ redirectOnMissing = true } = {}) => {
    const data = useContext(DiaryStateContext)
    const [curDiaryItem, setCurDiaryItem] = useState(null)
    const nav = useNavigate()

    useEffect(() => {

        const currentDiaryItem = data.find(
            (item) => String(item.id) === String(id))
        if (!currentDiaryItem) {
            if (redirectOnMissing) {
                window.alert("존재하지 않는 일기 입니다.")
                nav("/", { replace: true })
            }
            setCurDiaryItem(null)
            return
        }
        setCurDiaryItem(currentDiaryItem)
    }, [id, data, nav ,redirectOnMissing])
    return curDiaryItem;



}

export default useDiary