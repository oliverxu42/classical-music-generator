import React, { useState } from 'react';
import { SearchOptions } from '../interfaces/SearchOptions';
import '../styles/Search.css';

interface SearchProps {
  isPopularWork: boolean;
  setIsPopularWork: React.Dispatch<React.SetStateAction<boolean>>;
}

const Search: React.FC<SearchProps> = ({ isPopularWork, setIsPopularWork }) => {
  return (
    <>
      <div className="container">
        <div>
          <label>
            <input
              type="checkbox"
              checked={isPopularWork}
              onChange={() => setIsPopularWork(!isPopularWork)}
            />
            Popular Works
          </label>
        </div>
      </div>
    </>
  );
};

export default Search;
