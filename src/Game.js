import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import './App.css';
import Selector from './components/Selector';
import Data from './pages/Data/Data';
import Stats from './pages/Stats/Stats';

const Game = () => {
    const location = useLocation(); 

    return (
        <div>
            <div className='overlay'>
                <div className="app-container">
                    <Routes>
                        <Route path="/" element={<Selector />} />
                        <Route path="/data" element={<Data />} />
                        <Route path="/stats" element={<Stats />} />
                    </Routes>
                </div>
            </div>
            <div className="pb">
                <NavLink
                    to="/stats"
                    className={({ isActive }) =>
                        `pb_button_container ${isActive ? 'pb_button_active' : ''}`
                    }
                    onClick={(e) => {
                        if (location.pathname === '/stats') {
                            e.preventDefault(); 
                        }
                    }}
                >
                    STATS
                    <div className="pb_button"></div>
                </NavLink>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `pb_button_container ${isActive ? 'pb_button_active' : ''}`
                    }
                    onClick={(e) => {
                        if (location.pathname === '/') {
                            e.preventDefault(); 
                        }
                    }}
                >
                    ITEMS
                    <div className="pb_button pb_button_active"></div>
                </NavLink>

                <NavLink
                    to="/data"
                    className={({ isActive }) =>
                        `pb_button_container ${isActive ? 'pb_button_active' : ''}`
                    }
                    onClick={(e) => {
                        if (location.pathname === '/data') {
                            e.preventDefault();
                        }
                    }}
                >
                    DATA
                    <div className="pb_button"></div>
                </NavLink>
            </div>
        </div>
    );
};

export default Game;
