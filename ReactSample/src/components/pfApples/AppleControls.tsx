import { useDispatch } from 'react-redux';
import { increment, decrement, reset } from './pfAppleCountSlice';

function CounterControls() {
  const dispatch = useDispatch();

  return (
    <div>
      <button className='p-2 bg-slate-700 rounded-4xl m-1 cursor-pointer' onClick={() => dispatch(increment())}>+</button>
      <button className='p-2 bg-slate-700 rounded-4xl m-1 cursor-pointer' onClick={() => dispatch(decrement())}>-</button>
      <button className='p-2 bg-slate-700 rounded-4xl m-1 cursor-pointer' onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default CounterControls;
