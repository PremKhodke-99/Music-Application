import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {

    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);


    return (
        <nav className='sticky top-0 h-14 bg-emerald-600 text-white flex justify-between items-center px-8'>
            <h1 className="text-3xl font-semibold cursor-pointer" onClick={() => navigate("/library")}>
                Musicify
            </h1>
            {
                user ? <div className='flex items-center'>
                    <Link to={'/playlists'} className="text-lg rounded-lg px-3 py-2 font-medium cursor-pointer hover:underline">Playlist</Link>
                    <h1 className="text-lg rounded-lg px-3 py-2 font-medium">{user.name}</h1>
                    <button type='button' className='rounded-lg px-3 py-2 font-medium bg-slate-100 text-slate-900' onClick={logout}>Logout</button>
                </div> : <div>
                    {[
                        ['Sign up', '/signup'],
                    ].map(([title, url]) => (
                        <Link to={url} key={title} className="rounded-lg px-3 py-2 font-medium hover:bg-slate-100 hover:text-slate-900">{title}</Link>
                    ))}
                </div>
            }
        </nav>
    )
}

export default Header