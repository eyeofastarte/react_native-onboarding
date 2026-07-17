import { increment } from "./counterSlice"
import { useDispatch } from "react-redux"

function Counter() {
  const dispatch = useDispatch()

  return (
    <>
      <p>Number Counter</p>
      <div>
        <button className='p-2 bg-slate-700 rounded-4xl m-1 cursor-pointer' onClick={() => dispatch(increment())}>+</button>
      </div>
    </>
  )
}

export default Counter
