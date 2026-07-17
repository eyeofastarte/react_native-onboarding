import { Link } from "react-router"
import CounterDisplay from "./components/pfApples/AppleDisplay";
import CounterControls from "./components/pfApples/AppleControls";
import Counter from "./components/counter/Counter";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

function Profile() {
  const getCount = () => useSelector((s: RootState) => s.counter.count);

  return (
    <>
      <h1 className="mt-3">Profile Page</h1>
      <Link to={{
        pathname: '/'
      }} className="mt-5 inline-block mx-auto cursor-pointer py-1.25 px-2.5 rounded-[5px] text-(--accent) bg-(--accent-bg) border-2 border-transparent transition-[colors,scale] duration-300 mb-6 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-2 tracking-wider active:scale-95">
        Go Home
      </Link>

      <div className="mt-2" />
      <h2 className="mb-2">Redux Counter</h2>
      <CounterDisplay></CounterDisplay>
      <CounterControls></CounterControls>
      <div className="mt-2" />
      <h2 className="mb-2">Counter Simple</h2>
      <p>Number: {getCount()}</p>
      <Counter></Counter>
    </>
  )
}

export default Profile
