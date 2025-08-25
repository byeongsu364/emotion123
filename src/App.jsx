
import './App.css'
import { useReducer, useRef, createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
import New from './pages/New'
import useDiary from './hook/useDiary'


const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-08-17").getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date("2025-08-05").getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  },
  {
    id: 3,
    createdDate: new Date("2025-08-01").getTime(),
    emotionId: 4,
    content: "3번 일기 내용"
  }
]

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case "INIT":
      return action.data
    case "CREATE":
      nextState = [action.data, ...state]
      break;
    case "UPDATE":
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ?
          action.data
          : item
      )
      break;
    case "DELETE":
      nextState = state.filter(
        (item) => String(item.id) !== String(action.id)
      )
      break
    default:
      return state
  }
  localStorage.setItem('diary', JSON.stringify(nextState))

  return nextState

}

export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()
function App() {

  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const storedData = localStorage.getItem('diary')

    if (!storedData) {
      localStorage.setItem('diary', JSON.stringify([]))
      setLoading(false)
      return
    }

    let parsed = []

    try {
      parsed = JSON.parse(storedData)
    } catch {
      localStorage.setItem('diary', JSON.stringify([]))
      return
    }

    if (!Array.isArray(parsed)) {
      setLoading(false)
      return
    }

    let maxId = 0;
    parsed.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = item.id
      }
    })

    idRef.current = maxId + 1

    dispatch({
      type: "INIT",
      data: parsed
    })

    setLoading(false)

  }, [])

  const onCreate = (createdDate, emotionId, content) => {

    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id
    })
  }
  if (loading) {
    return <div>데이터를 불러오는 중입니다.</div>
  }
  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/diary/:id' element={<Diary />} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App