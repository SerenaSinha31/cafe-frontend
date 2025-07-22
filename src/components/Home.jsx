
export default function Home({ age }) {
  return age > 18 && <h2>Welcome</h2>;
}

export default function Home({ age }) {
  return age > 18 ? <h2>Welcome</h2> : <h2>Not allowed</h2>;
}

export default function Home({ age }) {
  if (age > 18) return <h2>Welcome</h2>;
  else return <h2>Not allowed</h2>;
}

export default function Home({ age }) {
  const handleClick = () => {
    alert("Hello");
  };
  const handleSubmit = (name) => {
    alert(`Hello ${name}`);
  };
  return (
    <>
      <h2>Hello World</h2>
      <button onClick={handleClick}>Click</button>
      <button onClick={() => handleSubmit("John")}>Submit</button>
    </>
  );
}

import { useState } from "react";
export default function Home() {
  const [wicket, setWicket] = useState(0);
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState();
  const incrementRun = () => {
    if (wicket < 10) {
      setRun(run + 1);
      setMessage("Well Done");
    }
  };
  const incrementWicket = () => {
    if (wicket < 10) {
      setWicket(wicket + 1);
      setMessage("Better Luck Next Time");
    } else {
      setMessage("Game Over");
    }
  };

  return (
    <>
      <button onClick={incrementRun}>Run</button>
      <h3>{run}</h3>
      <button onClick={incrementWicket}>Wicket</button>
      <h3>{wicket}</h3>
      <hr />
      {message}
    </>
  );
}


