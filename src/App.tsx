import React, { useState } from 'react';
import './App.css';
import WorksDisplay from './components/WorksDisplay';
import { WorksList, Work } from './interfaces/Works';

const getMusicData = async () => {

  const res = await fetch(`http://localhost:8000/generate`)
  const body = await res.json();
  const data = body['works'];
  const works: WorksList = [];

  for (let i = 0; i < data.length; i++) {
    const work: Work = {
      id: data[i]['id'],
      title: data[i]['title'],
      genre: data[i]['genre'],
      composer: data[i]['composer']
    }
    works.push(work); 
  }
  return works;
}

function App() {

  const [Works, setWorks] = useState<WorksList>([]);

  const handleGenerate = async () => {
    setWorks(await getMusicData());
  }

  return (
    <>
    <div className="App">
      <h1>Classical Music Generator</h1>
      <div className='center'>
        <button 
          className='generate'
          onClick={()=>handleGenerate()}>
          Generate
        </button>
      </div>
      <div>
        <WorksDisplay Works={Works}/>
      </div>
    </div>
    </>
  );
}

export default App;
