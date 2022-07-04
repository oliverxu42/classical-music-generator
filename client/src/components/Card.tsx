import React from 'react';
import { Work } from '../interfaces/Works';
import FadeIn from 'react-fade-in';

interface WorkCardProps {
  work: Work
}

const WorkCard: React.FC<WorkCardProps>  = ({ work }) => {
  return (
    <>
    <FadeIn>
      <div className='card'>
        <img src={work.composer.portrait} alt='composer' className='composer-avatar'/>
        <div className='card-text'>
          <h4><b>{work.title}</b></h4>
          <p>{work.composer.complete_name}</p>
          <p>Genre: {work.genre}</p>
        </div>
      </div>
    </FadeIn>
    </>
  );
}

export default WorkCard;

