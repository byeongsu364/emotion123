import './App.css';
import { useReducer, useRef, createContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import New from './pages/New';
import Edit from './pages/Edit';
import Diary from './pages/Diary';
import Notfound from './pages/Notfound';

const mockData = [
  { id: 1, createdDate: new Date('2025-08-17').getTime(), emotionId: 1, content: '1번 일기 내용' },
  { id: 2, createdDate: new Date('2025-08-07').getTime(), emotionId: 2, content: '2번 일기 내용' },
  { id: 3, createdDate: new Date('2025-08-27').getTime(), emotionId: 4, content: '3번 일기 내용' },
];

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.data;
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);
  const [mode, setMode] = useState(() => localStorage.getItem('mode') || 'light');

  useEffect(() => {
    dispatch({ type: 'INIT', data: mockData });
  }, []);

  const handleModeChange = (e) => {
    const next = e.target.value;
    setMode(next);
    localStorage.setItem('mode', next);
  };

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: { id: idRef.current++, createdDate, emotionId, content },
    });
  };

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({ type: 'UPDATE', data: { id, createdDate, emotionId, content } });
  };

  const onDelete = (id) => {
    dispatch({ type: 'DELETE', id });
  };

  return (
    <div className={`Container ${mode === 'dark' ? 'dark' : ''}`}>
      <div className="content-wrap">
        <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
            <div style={{ marginBottom: 16 }}>
              <select value={mode} onChange={handleModeChange}>
                <option value="light">light</option>
                <option value="dark">dark</option>
              </select>
            </div>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </div>
    </div>
  );
}

export default App;
