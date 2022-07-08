import React, { useState } from "react";
import "./styles/App.css";
import WorksDisplay from "./components/WorksDisplay";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { WorksList, Work, Composer } from "./interfaces/Works";

const NUM_WORKS = 10;

const getMusicData = async () => {
  const works: WorksList = [];

  const res = await fetch(`/api/get-works`);
  const body = await res.json();
  const data = body["works"];

  const composerIds: String[] = [];

  for (let i = 0; i < NUM_WORKS; i++) {
    const composerId = data[i]["composer"]["id"];
    composerIds.push(composerId);
  }

  const getComposer = await fetch(
    `https://api.openopus.org/composer/list/ids/${composerIds}.json`
  ).then((res) => res.json());

  const composerData = getComposer["composers"];

  for (let i = 0; i < NUM_WORKS; i++) {
    const composer: Composer = {
      id: composerData[i]["id"],
      name: composerData[i]["name"],
      complete_name: composerData[i]["complete_name"],
      epoch: composerData[i]["epoch"],
      portrait: composerData[i]["portrait"],
    };
    const work: Work = {
      id: data[i]["id"],
      title: data[i]["title"],
      genre: data[i]["genre"],
      composer: composer,
    };
    works.push(work);
  }
  return works;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

function App() {
  const [moreVisible, setMoreVisible] = useState(false);
  const [Works, setWorks] = useState<WorksList>([]);

  const handleGenerate = async () => {
    setWorks(await getMusicData());
    setMoreVisible(true);
  };

  const backAndGenerate = () => {
    scrollToTop();
    handleGenerate();
  };

  return (
    <>
      <div className="App">
        <Navbar />
        <Search />
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
