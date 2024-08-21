import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Playlists = () => {
    const [playlists, setPlaylists] = useState([]);
    const { user } = useContext(AuthContext);
    const [newPlaylist, setNewPlaylist] = useState('');

    const fetchPlaylists = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/playlist/${user.id}`);
            const data = await response.data;
            setPlaylists(data);
        } catch (error) {
            console.error('Error in fetching playlist', error);
        }
    }

    const handleCreatePlaylist = async (e) => {
        e.preventDefault();
        try {
            console.log('start');
            
            const response = await axios.post('http://localhost:5000/api/playlist', {
                name: newPlaylist,
                userId: user.id,
                songs: []
            });
            console.log(1);
            
            setPlaylists([...playlists, response.data]);
            console.log(2);
            setNewPlaylist('');
        } catch (error) {
            console.error('Error in creating playlist', error);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, [user.id]);


    console.log(playlists, newPlaylist);
    

    return (
        <div className="p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Your Playlists</h1>
            <form onSubmit={handleCreatePlaylist} className="mb-6">
                <input
                    type="text"
                    placeholder="New Playlist Name"
                    value={newPlaylist}
                    onChange={(e) => setNewPlaylist(e.target.value)}
                    className="p-2 w-full border rounded mb-4"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Create Playlist
                </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {playlists.map((playlist) => (
                    <div key={playlist._id} className="bg-white rounded-lg shadow-md p-4">
                        <h2 className="text-xl font-bold">{playlist.name}</h2>
                        <p className="text-gray-700">Songs: {playlist.songs.length}</p>
                        <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Playlists