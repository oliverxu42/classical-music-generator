import React from 'react';
import { Work } from '../interfaces/Works';

interface WorkCardProps {
  work: Work
}

const WorkCard: React.FC<WorkCardProps>  = ({ work }) => {
  return (
    <div className='card'>
      <div className='container'>
        <h4><b>{work.title}</b></h4>
        <p>Composer: {work.composer.complete_name}</p>
        <p>Genre: {work.genre}</p>
      </div>
    </div>
  );
}

export default WorkCard;

