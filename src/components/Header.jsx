import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import AppContext from "../contexts/AppContext";

const Header = () => {
    const {medico} = useContext(AppContext);
    return (<nav className="navbar sticky-top navbar-expand-lg navbar-light header">
        <div className="container">

            <img src="./img/Ethereum.ico" alt="Dapp" height="40"/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <NavLink className="navbar-brand" aria-current="page" to="/">
                &nbsp;Dapp Recetas Médicas
            </NavLink>

            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/registroPacientes">Registrar Pacientes</NavLink>

                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/recetas">
                            Recetas
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/registroRecetas">
                            Registrar Recetas
                        </NavLink>
                    </li>
                </ul>
                <span className="navbar-text">
                    Bienvenido <strong>{medico}</strong></span>
            </div>
        </div>
    </nav>);
}
export default Header;



