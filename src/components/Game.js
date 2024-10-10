import React, { useState, useEffect } from 'react';
import GuessSection from './GuessSection';
import Lives from './Lives';

const movieDatabase = [
  {
    movie: 'Kabir Singh',
    song: 'Tera Ban Jaunga',
    actor: 'Shahid Kapoor',
    actress: 'Kiara Advani',
  },
  {
    movie: 'Dilwale Dulhania Le Jayenge',
    song: 'Tujhe Dekha To',
    actor: 'Shah Rukh Khan',
    actress: 'Kajol',
  },
  {
    movie: '3 Idiots',
    song: 'All Is Well',
    actor: 'Aamir Khan',
    actress: 'Kareena Kapoor',
  },
  {
    movie: 'Zindagi Na Milegi Dobara',
    song: 'Senorita',
    actor: 'Hrithik Roshan',
    actress: 'Katrina Kaif',
  },
  {
    movie: 'Chennai Express',
    song: 'Lungi Dance',
    actor: 'Shah Rukh Khan',
    actress: 'Deepika Padukone',
  },
];

function Game() {
  const [randomMovie, setRandomMovie] = useState(null);
  const [firstLetters, setFirstLetters] = useState({
    actor: '',
    actress: '',
    movie: '',
    song: '',
  });
  const [guesses, setGuesses] = useState({
    actor: '',
    actress: '',
    movie: '',
    song: '',
  });
  const [messages, setMessages] = useState({
    actor: '',
    actress: '',
    movie: '',
    song: '',
  });
  const [bollywood, setBollywood] = useState('BOLLYWOOD');
  const [correctGuesses, setCorrectGuesses] = useState({
    actor: false,
    actress: false,
    movie: false,
    song: false,
  });

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newRandomMovie = movieDatabase[Math.floor(Math.random() * movieDatabase.length)];
    setRandomMovie(newRandomMovie);

    setFirstLetters({
      actor: newRandomMovie.actor[0],
      actress: newRandomMovie.actress[0],
      movie: newRandomMovie.movie[0],
      song: newRandomMovie.song[0],
    });

    setGuesses({ actor: '', actress: '', movie: '', song: '' });
    setMessages({ actor: '', actress: '', movie: '', song: '' });
    setBollywood('BOLLYWOOD');
    setCorrectGuesses({ actor: false, actress: false, movie: false, song: false });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGuesses((prevGuesses) => ({
      ...prevGuesses,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    let newMessages = {};
    let newBollywood = bollywood;
    let allCorrect = true;

    for (const category in guesses) {
      if (!correctGuesses[category]) {
        if (guesses[category].trim() === '') {
          newMessages[category] = 'Skipped!';
        } else if (guesses[category].toLowerCase() === randomMovie[category].toLowerCase()) {
          newMessages[category] = 'Correct!';
          setCorrectGuesses((prevCorrectGuesses) => ({
            ...prevCorrectGuesses,
            [category]: true,
          }));
        } else {
          newMessages[category] = `Wrong! Try again.`;
          if (newBollywood.length > 0) {
            newBollywood = newBollywood.slice(1); // Remove the first letter from "BOLLYWOOD"
          }
        }
      } else {
        newMessages[category] = 'Already Correct!';
      }

      if (!correctGuesses[category] && guesses[category].toLowerCase() !== randomMovie[category].toLowerCase()) {
        allCorrect = false;
      }
    }

    setMessages(newMessages);
    setBollywood(newBollywood);

    if (newBollywood === '') {
      setTimeout(() => {
        alert('Game Over! You ran out of lives.');
        resetGame();
      }, 1000);
    } else if (allCorrect) {
      setTimeout(() => {
        alert('Congratulations! You guessed everything correctly.');
        resetGame();
      }, 1000);
    }
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Guess the Movie, Song, Actor, and Actress</h1>
      <Lives bollywood={bollywood} correctGuesses={correctGuesses} />
      <div className="grid-container">
        <GuessSection
          category="movie"
          firstLetter={firstLetters.movie}
          guess={guesses.movie}
          message={messages.movie}
          onChange={handleInputChange}
          correct={correctGuesses.movie}
        />
        <GuessSection
          category="song"
          firstLetter={firstLetters.song}
          guess={guesses.song}
          message={messages.song}
          onChange={handleInputChange}
          correct={correctGuesses.song}
        />
        <GuessSection
          category="actor"
          firstLetter={firstLetters.actor}
          guess={guesses.actor}
          message={messages.actor}
          onChange={handleInputChange}
          correct={correctGuesses.actor}
        />
        <GuessSection
          category="actress"
          firstLetter={firstLetters.actress}
          guess={guesses.actress}
          message={messages.actress}
          onChange={handleInputChange}
          correct={correctGuesses.actress}
        />
      </div>
      <button onClick={handleSubmit} className="submit-button">Submit All</button>
    </div>
  );
}

export default Game;
