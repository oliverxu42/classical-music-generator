import React from 'react';
import { Work, WorksList } from '../interfaces/Works';
import WorkCard from '../components/Card';

interface WorksDisplayProps {
  Works: WorksList
}

const WorksDisplay: React.FC<WorksDisplayProps> = ({ Works }) => {
  const worksToDisplay: Work[] = Works.slice(0, 10);
  return (
  <div>
    {worksToDisplay.map(work => (
      <div key={work.id}>
       <WorkCard work={work}></WorkCard>
      </div>
    ))}
  </div>
  );
}

export default WorksDisplay;