import React from 'react';

function Lives({ bollywood, correctGuesses }) {
  const renderLives = () => {
    return (
      <span>
        {Array.from(bollywood).map((letter, index) => (
          <span key={index} className={correctGuesses[letter] ? 'strike' : ''}>
            {letter}
          </span>
        ))}
      </span>
    );
  };

  return (
    <p className="bollywood">Lives Remaining: {renderLives()}</p>
  );
}

export default Lives;
