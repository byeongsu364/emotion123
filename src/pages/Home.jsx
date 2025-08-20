import React, { useState, useContext, useMemo } from 'react';
import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';
import { DiaryStateContext } from '../App';

const Home = () => {
  const data = useContext(DiaryStateContext);

  const [pivotDate, setPivotDate] = useState(new Date());

  const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth(),
      1, 0, 0, 0, 0
    ).getTime();

    const endTime = new Date(
      pivotDate.getFullYear(),
      pivotDate.getMonth() + 1,
      0, 23, 59, 59, 999
    ).getTime();

    return data.filter(
      (item) => beginTime <= item.createdDate && item.createdDate <= endTime
    );
  };

  const monthlyData = useMemo(
    () => getMonthlyData(pivotDate, data),
    [pivotDate, data]
  );

  const onIncrementMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 1)
    );
  };

  const onDecrementMonth = () => {
    setPivotDate(
      new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1, 1)
    );
  };

  return (
    <div>
      <Header
        leftchild={<Button text={'<'} onClick={onDecrementMonth} />}
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        rightchild={<Button text={'>'} onClick={onIncrementMonth} />}
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
