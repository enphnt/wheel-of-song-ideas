"use client";
import { useState, useEffect } from "react";
import WheelComponent from "./wheel";
import initialSongIdeas from "../data/song-ideas";

const ANIMATION_DURATION = 80;

const WheelOfSongIdeas = () => {
  const [winner, setWinner] = useState<string | null>("");
  const [segments, setSegments] = useState(initialSongIdeas.map((idea, index) => ({ id: index, text: idea })));
  const [newIdea, setNewIdea] = useState<string>("");
  const [key, setKey] = useState<number>(initialSongIdeas.length);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [removingIndex, setRemovingIndex] = useState<number | null>(null);

  const onFinished = (winner: string) => {
    setIsSpinning(false);
    setWinner(winner);
  };

  const handleAddIdea = () => {
    setWinner(null);
    if (newIdea.trim()) {
      setSegments([...segments, { id: key, text: newIdea }]);
      setNewIdea('');
      setKey(key + 1);
    }
  };

  const handleRemoveIdea = (id: number) => setRemovingIndex(id);

  useEffect(() => {
    if (removingIndex !== null) {
      const timer = setTimeout(() => {
        setSegments((prevSegments) => prevSegments.filter((segment) => segment.id !== removingIndex));
        setWinner(null);
        setRemovingIndex(null);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [removingIndex]);

  const handleClearAll = () => {
    setSegments([]);
    setKey(initialSongIdeas.length);
    setWinner(null);
  };

  const handleRecallDefaults = () => {
    setSegments(initialSongIdeas.map((idea, index) => ({ id: index, text: idea })));
    setKey(initialSongIdeas.length);
    setWinner(null);
  }

  const handleSpinStart = () => {
    setIsSpinning(true);
    setWinner(null);
  }

  return (
    <>
      <h1 className="font-bold text-center sm:text-6xl text-blue-500">Wheel of Song Ideas</h1>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <p className="text-3xl p-2 font-bold text-center">{segments.length ? "You should write a song... " : ""}</p>
        {winner && segments.length && 
        <div className="bg-yellow-100 p-2 rounded-lg transform -rotate-[1deg]">
          <span className="text-3xl font-bold text-center rotate-[-1deg] text-green-900">{winner}</span>
        </div>
        }
      </div>
      <div className="flex justify-center p-4 m-4i">
        {segments.length ? (
          <WheelComponent
            key={segments.length}
            segments={segments.map(segment => segment.text)}
            winningSegment="won 10"
            onFinished={onFinished}
            primaryColor="daekblue"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={false}
            upDuration={40}
            downDuration={10}
            onSpinStart={handleSpinStart}
          />
        ) : (
          <div className="text-2xl font-bold text-center">
            <div>No song ideas on the wheel</div>
            <div className="sm:text-lg font-normal text-gray-500">Add some to get started</div>
          </div>
        )}
      </div>
      <div className="flex m-4i sm:items-center sm:gap-4 sm:p-2 sm:rounded-lg sm:border sm:border-gray-300 sm:shadow-sm sm:bg-gray-100">
        <h2 className="m-2 sm:text-lg">Add an idea to the wheel:</h2>
        <input
          type="text"
          className="border border-gray-300 mx-2 p-1"
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          disabled={isSpinning}
        />
        <button
          className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded transition-colors duration-${ANIMATION_DURATION} ${isSpinning ? 'cursor-not-allowed' : ''}`}
          onClick={handleAddIdea}
          disabled={isSpinning}
        >
          Add
        </button>
        {segments.length > 0 ? 
        <button
            className={`bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded mx-2 transition-colors duration-${ANIMATION_DURATION} ${isSpinning ? 'cursor-not-allowed' : ''}`}
            onClick={handleClearAll}
            disabled={isSpinning}
          >
            Clear All
          </button>
          : <button
            className="bg-gray-400 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mx-2"
            onClick={handleRecallDefaults}
          >
            Reset
          </button>
        }
      </div>
      {segments.length > 0 && (
        <div className="overflow-x-hidden">
          <ul className="list-disc ml-2 flex flex-wrap sm:text-lg justify-center">
            {segments.slice().reverse().map((segment) => (
              <li
                key={segment.id}
                className={`flex justify-between items-center p-2 m-1 rounded-lg border border-gray-300 w-[280px] min-h-[5em] max-h-[7em] overflow-hidden transition-transform duration-${ANIMATION_DURATION} ease-in-out transform ${
                  removingIndex === segment.id ? 'scale-0' : 'scale-100'
                }`}
              >
                <span className="flex-grow max-w-[200px] overflow-ellipsis overflow-hidden">{segment.text}</span>
                <button
                  className={`bg-gray-400 hover:bg-red-400 text-white font-bold py-0 px-2 rounded mx-1 my-1 self-start transition-colors duration-${ANIMATION_DURATION} ${
                    isSpinning ? 'cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleRemoveIdea(segment.id)}
                  disabled={isSpinning}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default WheelOfSongIdeas;
