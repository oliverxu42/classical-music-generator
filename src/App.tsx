import React from 'react';
import './App.css';
import MusicCard from './components/Card';



function App() {

  const getMusicData = async () => {

    const res = await fetch(`http://localhost:8000/generate`)
    .then(res => res.json())
    .then(data => console.log(data));

    // const res = await fetch(`https://api.openopus.org/dyn/work/random`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   }
    // )
    // .then(res => res.json())
    // .then(data => console.log(data));
  }

  return (
    <>
    <div className="App">
      <h1>Classical Music Generator</h1>
      <div className='center'>
        <button 
          className='generate'
          onClick={()=>getMusicData()}>
          Generate
        </button>
      </div>
      <div>
        <MusicCard></MusicCard>
        <MusicCard></MusicCard>
      </div>
    </div>
    </>
  );
}

export default App;
