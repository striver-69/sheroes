import { useState } from 'react';
import './App.css';
const axios = require('axios').default;

function App() {
  const [search, setSearch] = useState('');
  const [userArray, setUserArray] = useState([]);
  const [result, setResult] = useState('');
  const handleClick = () => {
    setUserArray([...userArray, search]);
    setSearch('');
  };

  const handleInputChange = (e) => {
    const re = /^-?\d+\.?\d*$|^\d*\.?\d+$/;
    if (
      e.target.value === '-' ||
      e.target.value === '' ||
      re.test(e.target.value)
    ) {
      setSearch(e.target.value);
    }
  };
  const getSecondMaximumValue = () => {
    axios
      .post('/api', {
        array: userArray,
      })
      .then((res) => {
        setResult(res.data.secondMax);
      })
      .catch((e) => {
        setResult(-1);
      });
  };

  return (
    <div className="App">
      <h1>Second Maximum Calculator Of An Array</h1>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {userArray.map((e, ind) => {
          return (
            <div style={{ margin: '10px' }} key={ind}>
              {e}
            </div>
          );
        })}
      </div>
      <input type="text" value={search} onChange={handleInputChange} />
      <button onClick={handleClick}>Push Value</button>
      <h2>The Second Maximum value is {result}</h2>
      <button onClick={getSecondMaximumValue}>Get Second Maximum</button>
    </div>
  );
}

export default App;
