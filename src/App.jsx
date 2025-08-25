import './App.css'
import { useReducer, useRef, createContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Diary from './pages/Diary'
import Edit from './pages/Edit'
import Home from './pages/Home'
import Notfound from './pages/Notfound'
import New from './pages/New'

// Context 추가
export const DiaryStateContext = createContext()
export const DiaryDispatchContext = createContext()
export const ThemeContext = createContext()

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
        String(item.id) === String(action.data.id)
          ? action.data
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

function App() {
  const [data, dispatch] = useReducer(reducer, [])
  const idRef = useRef(0)
  const [loading, setLoading] = useState(true)

  // ✅ 다크/라이트 모드 상태
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  // ✅ body에 theme 클래스 적용
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <div className={`App ${theme}`}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/new' element={<New />} />
              <Route path='/edit/:id' element={<Edit />} />
              <Route path='/diary/:id' element={<Diary />} />
              <Route path='*' element={<Notfound />} />
            </Routes>
          </div>
        </ThemeContext.Provider>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  )
}

export default App
