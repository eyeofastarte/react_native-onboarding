import { useEffect, useState } from "react"

// Strick Mode Enabled - Expect double mount!
export default function PreviousNumbers({ numbers }) {
  const [randomStr, setRandomStr] = useState<number | null>(null);
  async function getRandomStr() {
    const randomId = Math.floor(Math.random() * 100) + 1;
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomId}`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const post = await res.json();
      setRandomStr(post.title);
    } catch (err) {
      console.error("Failed to fetch random number:", err);
    }
  }

  const lastNumbers = Array.from({ length: 5 }, (_, i) => numbers - (i + 1));
  // No dependencies
  useEffect(() => {
    console.log('Mounted');

    return () => {
      console.log('Unmounted');
    };
  }, []);

  return <>
    {lastNumbers.map((x, i) => <p key={i}>Previous {i + 1}) {x}</p>)}
    <br></br>
    <button className="cursor-pointer py-1.25 px-2.5 rounded-[5px] text-(--accent) bg-(--accent-bg) border-2 border-transparent transition-[colors,scale] duration-300 mb-6 hover:border-(--accent-border) focus-visible:outline-2 focus-visible:outline-(--accent) focus-visible:outline-offset-2 tracking-wider active:scale-95" onClick={() => getRandomStr()}>Random String</button>
    <br />
    {randomStr !== null && <p>{randomStr}</p>}
  </>
}
