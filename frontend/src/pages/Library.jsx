import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';

const Library = () => {
    const [songs, setSongs] = useState([]);
    const {setMusicSrc} = useContext(AuthContext);

    const fetchSongs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/songs')
            const data = await response.data;
            setSongs(data);
        } catch (error) {
            console.error('Error', error);
        }
    }

    console.log(songs);
    
    useEffect(() => {
        fetchSongs();
    }, [])

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Music Library</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {songs.map((song) => (
                    <div key={song._id} className="bg-white rounded-lg shadow-md p-4">
                        <img src={song.image} alt={song.title} className="w-full h-32 object-cover rounded-md mb-4" />
                        <h2 className="text-xl font-bold">{song.title}</h2>
                        <button className="mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded" onClick={() => setMusicSrc(song)}>
                            Play
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Library