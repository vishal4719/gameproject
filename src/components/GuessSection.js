import React from 'react';

function GuessSection({ category, firstLetter, guess, message, onChange, correct }) {
  return (
    <div className="guess-section">
      <p className="category-title">{category.charAt(0).toUpperCase() + category.slice(1)}</p>
      <p>First Letter: <strong>{firstLetter}</strong></p>
      <input
        type="text"
        name={category}
        value={guess}
        onChange={onChange}
        placeholder={`Guess the ${category.charAt(0).toUpperCase() + category.slice(1)}`}
        className="guess-input"
        disabled={correct}
      />
      <p className="message">{message}</p>
    </div>
  );
}

export default GuessSection;
