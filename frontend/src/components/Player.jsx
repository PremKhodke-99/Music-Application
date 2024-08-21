import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const Player = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    const { musicSrc } = useContext(AuthContext);

    const audioRef = useRef(new Audio(musicSrc.source));

    useEffect(() => {
        if (musicSrc) {
            audioRef.current.src = musicSrc.source;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [musicSrc, isPlaying]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(prevState => !prevState)
    };

    const handleEnded = () => {
        setIsPlaying(false);
    }

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('ended', handleEnded);
        return () => {
            audio.removeEventListener('ended', handleEnded);
        }
    }, []);

    return (
        <div className="sticky bottom-0 left-0 right-0 bg-gray-800 text-white p-2">
            <div className="flex items-center justify-between">
                <audio ref={audioRef} src={musicSrc.source} />
                <div className='flex '>
                    <img src={musicSrc?.image} alt={musicSrc?.title} className='h-12 w-12' />
                    <h3 className="ml-4 text-xl font-bold">{musicSrc?.title || ''}</h3>
                </div>
                <div>
                    <button onClick={togglePlayPause} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded">
                        {isPlaying ? 'Pause' : 'Play'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Player
