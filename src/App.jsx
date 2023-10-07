import Flashcard from './components/Flashcard';
import { useState } from 'react';
import './App.css';

const App = () => {
  const initialCards = [
    {
      question: "What is the largest planet in the solar system?",
      answer: "Jupiter",
      difficulty: "easy",
      acceptedAnswer: "jupiter"
    },
    {
      question: "What is the smallest planet in the solar system?",
      answer: "Mercury",
      difficulty: "easy",
      acceptedAnswer: "mercury"
    },
    {
      question: "What planet is this?",
      answer: "Earth",
      difficulty: "easy",
      frontImage: "https://i.imgur.com/cbnt8BL.png",
      acceptedAnswer: "earth"
    },
    {
      question: "What planet is this?",
      answer: "Mars",
      difficulty: "easy",
      frontImage: "https://i.imgur.com/LUh5jPe.png",
      acceptedAnswer: "mars"
    },
    {
      question: "How many stars are in the Milky Way?",
      answer: "The Milky Way is only a medium sized galaxy with an estimated 200 billion stars. The largest galaxy we know of is called IC 1101 and has over 100 trillion stars.",
      difficulty: "hard",
      acceptedAnswer: "200 billion"
    },
    {
      question: "What is the name of the galaxy we live in?",
      answer: "The Milky Way!",
      difficulty: "easy",
      acceptedAnswer: "the milky way"
    },
    {
      question: "What is the name of the galaxy closest to the Milky Way?",
      answer: "The Andromeda Galaxy. It is 2.537 million light years away.",
      difficulty: "medium",
      backImage: "https://upload.wikimedia.org/wikipedia/commons/c/c2/M31_09-01-2011_%28cropped%29.jpg",
      acceptedAnswer: "the andromeda galaxy"
    },
    {
      question: "What is the hottest planet in our solar system?",
      answer: "Venus! It's the second planet from the Sun and Earth's closest planetary neighbor. Even though Mercury is closer to the Sun, Venus is the hottest planet in our solar system. Its thick atmosphere is full of the greenhouse gas carbon dioxide, and it has clouds of sulfuric acid.",
      difficulty: "medium",
      acceptedAnswer: "venus"
    },
    {
      question: "What is the coldest planet in our solar system?",
      answer: "Neptune! Neptune, the eighth and farthest planet from the Sun, has the coldest average temperature of -353 Fahrenheit or -214 Celsius.",
      difficulty: "medium",
      acceptedAnswer: "neptune"
    },
    {
      question: "How many planets are in our solar system?",
      answer: "8. Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
      difficulty: "easy",
      backImage: "https://images.edrawmax.com/article/science-diagrams/solar-system/solar-system-diagram.jpg",
      acceptedAnswer: "8"
    },
    {
      question: "How old is the Milky Way?",
      answer: "Scientists estimate that the Universe is about 13.7 billion years old and that the Milky Way is about 13.6 billion years old. Although the main parts of the galaxy were formed in the early days of the Universe, the disk and the bulge did not fully form until about 10-12 billion years ago.",
      difficulty: "hard",
      acceptedAnswer: "13.6 billion years old"
    },
    {
      question: "How many moons does Jupiter have?",
      answer: "By most counts, Jupiter has between 80 and 95 moons, but neither number captures the complexity of the Jovian system of moons, rings and asteroids. The giant planet commands thousands of small objects in its orbit. The number of moons of Jupiter can change as new moons are discovered.",
      difficulty: "hard",
      acceptedAnswer: "80-95"
    },
    {
      question: "About how long does it take for the Sun to orbit around the galaxy once?",
      answer: "The Sun takes 225-250 million years to complete one orbit around the Milky Way (a galactic year). Our whole solar system orbits around the center of the Milky Way Galaxy. We are moving at an average velocity of 828,000 km/hr.",
      difficulty: "hard",
      acceptedAnswer: "225-250 million years"
    },
    {
      question: "What is a galaxy?",
      answer: "A galaxy is a huge collection of gas, dust, and billions of stars and their solar systems. A galaxy is held together by gravity. Our galaxy, the Milky Way, also has a supermassive black hole in the middle called Sagittarius A*.",
      difficulty: "medium",
      backImage: "https://cdn.zmescience.com/wp-content/uploads/2012/10/black-hole-milky-way.jpg",
      acceptedAnswer: "a huge collection of gas, dust, and billions of stars and their solar systems"
    },
    {
      question: "There's a region of our solar system between Mars and Jupiter where many asteroids are located. What is this region called?",
      answer: "The asteroid belt. It is a region of the solar system that is between the orbits of Mars and Jupiter. It is occupied by numerous irregularly shaped bodies called asteroids or minor planets.",
      difficulty: "medium",
      frontImage: "https://www.universetoday.com/wp-content/uploads/2014/03/spitzer-20061010-full.jpg",
      acceptedAnswer: "asteroid belt"
    },
    {
      question: "What star is closest to Earth?",
      answer: "The Sun! It is 92.96 million miles away.",
      difficulty: "easy",
      acceptedAnswer: "sun"
    }
  ]

  // define a function to shuffle the cards
  const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = cards[i];
      cards[i] = cards[j];
      cards[j] = temp;
    }
  };

  // shuffling right at the start
  const shuffledCards = [...initialCards];
  shuffleCards(shuffledCards);

  // state initialization
  const [cards, setCards] = useState(shuffledCards);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const [userInput, setUserInput] = useState("");
  const [answerStatus, setAnswerStatus] = useState("");
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // fuzzy match function
  const fuzzyMatch = (userInput, acceptedAnswer) => {
    const minimumLength = Math.min(userInput.length, acceptedAnswer.length);
    let matchCount = 0;

    for (let i = 0; i < minimumLength; i++) {
      if (userInput[i] === acceptedAnswer[i]) {
        matchCount++;
      }
    }

    return (matchCount / acceptedAnswer.length) >= 0.75; // true only if there's at least 75% match
  }

  // nav functions
  const goToNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } 
    setIsFlipped(false); // reset the card to the front
    setAnswerStatus("");  // reset the status
    setUserInput("");  // clear the text box
  };

  const goToPrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
    setIsFlipped(false); // reset the card to the front
    setAnswerStatus("");  // reset the status
    setUserInput("");  // clear the text box
  };

  const checkAnswer = () => {
    if (!isFlipped) {
        setAnswerStatus("");  // reset the status
        if (fuzzyMatch(userInput.trim().toLowerCase(), cards[currentCardIndex].acceptedAnswer)) {
            setTimeout(() => setAnswerStatus("correct"), 10); 
            const newStreak = streak + 1;
            setStreak(streak + 1);
  
            if (newStreak > longestStreak) {
              setLongestStreak(newStreak);
            }
  
        } else {
            setTimeout(() => setAnswerStatus("incorrect"), 10); 
            setStreak(0);
        }
    }
  }
  

  const handleShuffle = () => {
    const currentCard = cards[currentCardIndex];
    shuffleCards(cards);
    const newIndex = cards.findIndex(card => card.question === currentCard.question);
    setCurrentCardIndex(newIndex);
  }

  return (
    <div className="App">
      <div className = "header">
        <h2>The Galactic Explorer!</h2>
        <h4>Embark on a journey through the Milky Way and test your knowledge of the cosmos!</h4>
        <h5>Number of cards: {cards.length}</h5>
        <h5>🎉 Longest Streak: {longestStreak} , ✅ Current Streak: {streak}</h5>
      </div>
      <Flashcard card={cards[currentCardIndex]} isFlipped={isFlipped} setIsFlipped={setIsFlipped} />
      <input className = {`answer-input ${answerStatus}`} type="text" placeholder="Enter your answer here" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button className = "submit-button" onClick={checkAnswer}>Submit</button>
      <div className = "button-container">
        <button 
          className={`prev-button ${currentCardIndex === 0 ? 'disabled-button' : ''}`} 
          onClick={goToPrevCard} 
          disabled={currentCardIndex === 0}
        >
          ⬅️
        </button>
        <button 
          className={`next-button ${currentCardIndex === cards.length - 1 ? 'disabled-button' : ''}`} 
          onClick={goToNextCard} 
          disabled={currentCardIndex === cards.length - 1}
        >
          ➡️
        </button>
        <button className = "shuffle-button" onClick={() => shuffleCards(cards)}>🔀</button>
      </div>


    </div>
  )
}

export default App