import React, {useContext} from "react";
import {NavLink} from "react-router-dom";
import AppContext from "../contexts/AppContext";

const Header = () => {
    const {medico, paciente} = useContext(AppContext);

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
                    {(medico !== null && medico.cedulaProfesional !== "") &&
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/registroPacientes">Registrar
                                Pacientes</NavLink>

                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/recetasMedico">
                                Historial Recetas
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/registroRecetas">
                                Registrar Recetas
                            </NavLink>
                        </li>
                    </>
                    }
                    {(paciente !== null && paciente.cedulaPaciente !== "") &&
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/recetasPaciente">
                            Historial Recetas
                        </NavLink>
                    </li>
                    }
                </ul>
                <span className="navbar-text">
                    Bienvenido:
                    {(medico !== null && medico.cedulaProfesional !== "") &&
                    <strong>{" " + medico.nombresMedico + " " + medico.apellidosMedico}</strong>
                    }
                    {(paciente !== null && paciente.cedulaPaciente !== "") &&
                    <strong>{" " + paciente.nombresPaciente + " " + paciente.apellidosPaciente}</strong>
                    }
                </span>
            </div>
        </div>
    </nav>);
}

export default Header;



