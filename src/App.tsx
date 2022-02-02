import React, { useState } from 'react';
import './App.css';
import WorksDisplay from './components/WorksDisplay';
import { WorksList, Work, Composer} from './interfaces/Works';

const NUM_WORKS = 10;

const getMusicData = async () => {

  const works: WorksList = [];

  const res = await fetch(`/api/get-works`)
  const body = await res.json();
  const data = body['works'];

  for (let i = 0; i < NUM_WORKS; i++) {
    
    const composer_id = data[i]['composer']['id'];
    const getComposer = await fetch(`https://api.openopus.org/composer/list/ids/${composer_id}.json`).then(res => res.json());
    const composer_data = getComposer['composers'][0];

    const composer: Composer = {
      id: composer_data['id'],
      name: composer_data['name'],
      complete_name: composer_data['complete_name'],
      epoch: composer_data['epoch'],
      portrait: composer_data['portrait']
    }

    const work: Work = {
      id: data[i]['id'],
      title: data[i]['title'],
      genre: data[i]['genre'],
      composer: composer
    }
    works.push(work); 
  }

  return works;
}

const scrollToTop = () =>{
  window.scrollTo({
    top: 0, 
    behavior: 'smooth'
  });
};

function App() {

  const [moreVisible, setMoreVisible] = useState(false);
  const [Works, setWorks] = useState<WorksList>([]);

  const handleGenerate = async () => {
    setWorks(await getMusicData());
    setMoreVisible(true);
  }

  const backAndGenerate = () => {
    scrollToTop();
    handleGenerate();
  }

  return (
    <>
    <div className="App">
      <h1>Classical Music Generator</h1>
      <div className="center">
        <button 
          className="generate"
          onClick={()=>handleGenerate()}>
          Generate
        </button>
      </div>
      <div>
        <WorksDisplay Works={Works}/>
      </div>
      <div className="load-more">
        {moreVisible && 
        <button
          className="generate"
          onClick={()=>backAndGenerate()}>
          Load More
        </button>}
      </div>
    </div>
    </>
  );
}

export default App;
