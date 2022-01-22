import React from 'react';
import { WorksList } from '../interfaces/Works';

interface WorksDisplayProps {
  Works: WorksList
}

const WorksDisplay: React.FC<WorksDisplayProps> = ({ Works }) => {
  console.log(Works)
  return (
  <div>
    <p>TEST</p>
  </div>
  );
}

export default WorksDisplay;