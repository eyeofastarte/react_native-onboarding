import type { RootState } from '../../store';
import { useSelector } from 'react-redux';

function CounterDisplay() {
  const apples = useSelector((s: RootState) => s.myApples.apples);
  const appleMessage = useSelector((s: RootState) => {
    const apples = s.myApples.apples;

    let message = 'No Apples';
    if (apples > 0) message = 'Some Apples';
    if (apples > 6) message = 'More then a half-dozen apples';
    if (apples < 0) message = 'Your in apple debt';

    return <p>{message}</p>;
  });

  return (
    <div>
      <h2>Count: {apples}</h2>
      {appleMessage}
    </div>
  );
}

export default CounterDisplay;
