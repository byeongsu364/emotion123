import React from 'react'
import { emotionList } from '../util/constants'
import './Viewer.css'
import { getEmotionImage } from '../util/getEmotionImage'
const Viewer = ({ emotionId, content }) => {
  
  const emotionItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  )
  return (
    <div className='Viewer'>
      <section className="viewer-img-section">
        <h4>오늘의 감정</h4>
        <div className={`emotion-img-wrapper img-${emotionId}`}>
          <img src={getEmotionImage(emotionId)} alt="" />
          <div>
            {emotionItem.emotionName}
          </div>
        </div>
      </section>
      <section className="content-section">
        <h4>오늘의 일기</h4>
        <div className="content-wrapper">
          <p>{content} </p>
        </div>
      </section>
    </div>
  )
}

export default Viewer