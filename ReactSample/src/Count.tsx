export default function Counter({ number, btnClick }) {
  return (
    <>
      <button
        type="button"
        className="cursor-pointer py-1.25 px-2.5 rounded-[5px] text-(--accent) bg-(--accent-bg) border-2 border-transparent transition-[colors,scale] duration-300 mb-6 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-2 tracking-wider active:scale-95"
        onClick={btnClick}
      >Count is {number}</button>
    </>
  )
}
