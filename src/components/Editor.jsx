import React, { useState,useEffect } from 'react'
import "./Editor.css"
import Button from './Button'
import EmotionItem from './EmotionItem'
import { useNavigate } from 'react-router-dom'
import {emotionList} from '../util/constants'
import { getStringDate } from '../util/getStringDate'


const Editor = ({ onSubmit,initData }) => {
    // const emotionId = 4

    const nav = useNavigate()


    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 3,
        content: ""
    })

    useEffect(()=>{

        if(initData){
            setInput({
                ...initData,
                createdDate:new Date(Number(initData.createdDate))
            })
        }

    },[initData])


    const onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value

        if (name === 'createdDate') {
            value = new Date(value)
        }

        setInput({
            ...input,
            [name]: value
        })
    }

    const onSubmitButtonClick = () => {
        onSubmit(input)
    }
    return (
        <div className='Editor'>
            <section className="date-section">
                <h4>오늘의 날짜</h4>
                <input
                    name='createdDate'
                    onChange={onChangeInput}
                    type="date"
                    value={getStringDate(input.createdDate)}
                />
            </section>
            <section className="emotion-section">
                {emotionList.map((item) => (
                    <EmotionItem
                        key={item.emotionId}
                        {...item}
                        isSelected={item.emotionId == input.emotionId}
                        onClick={() =>
                            onChangeInput({
                                target: {
                                    name: 'emotionId',
                                    value: item.emotionId
                                }
                            })
                        }
                    />

                ))}


            </section>
            <section className="content-section">
                <h4>오늘의 일기</h4>
                <textarea
                    name="content"
                    value={input.content}
                    onChange={onChangeInput}
                    placeholder='오늘은 어땠나요?'>

                </textarea>
            </section>
            <section className="button-section">
                <Button text={"취소하기"} onClick={() => nav(-1)} />
                <Button text={"작성완료"}
                    onClick={onSubmitButtonClick}
                    type={'POSITIVE'} />
            </section>
        </div>
    )
}

export default Editor