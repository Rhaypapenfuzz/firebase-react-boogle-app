import React from 'react';
import './FoundSolutions.css';


function FoundSolutions2({words, headerText}) {

  return (
    <div className="Found-solutions-list">
      {words.length > 0 &&
        <h4>{headerText}: {words.length}</h4>
      }
      <ul>
        {words.map((solution) => {return <li key={solution}>{solution}</li>})}
      </ul>
    </div>
  );
}

export default FoundSolutions2;
