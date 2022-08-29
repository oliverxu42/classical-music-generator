import React, { useState } from 'react';
import './styles/App.css';
import WorksDisplay from './components/WorksDisplay';
import Search from './components/Search';
import { WorksList } from './interfaces/Works';
import { SearchOptions } from './interfaces/SearchOptions';
import { getWorks } from './getWorks';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

function App() {
  const [moreVisible, setMoreVisible] = useState(false);
  const [Works, setWorks] = useState<WorksList>([]);
  const [isPopularWork, setIsPopularWork] = useState(false);

  const [options, setOptions] = useState<SearchOptions>({
    popularWork: false,
    recommendedWork: false,
    popularComposer: false,
    recommendedComposer: false,
    genre: 'All',
    epoch: 'All',
    composer: '',
  });

  const handleGenerate = async () => {
    setWorks(await getWorks(isPopularWork));
    setMoreVisible(true);
  };

  const backAndGenerate = () => {
    scrollToTop();
    handleGenerate();
  };

  return (
    <>
      <div className="App">
        <h1>Classical Music Generator</h1>
        <Search
          isPopularWork={isPopularWork}
          setIsPopularWork={setIsPopularWork}
        />
        <div className="center">
          <button className="generate" onClick={() => handleGenerate()}>
            Generate
          </button>
        </div>
        <div>
          <WorksDisplay Works={Works} />
        </div>
        <div className="load-more">
          {moreVisible && (
            <button className="generate" onClick={() => backAndGenerate()}>
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
