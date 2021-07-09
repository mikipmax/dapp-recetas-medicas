import React from "react";

const Header = () => {

    return (<nav className="navbar navbar-expand-lg navbar-light header">
        <div className="container-fluid">


            <img src="./img/ethereum-gold.png" alt="Dapp" height="40"/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                    aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        {/*<a className="nav-link active" aria-current="page" href="#">Recetas</a>*/}
                    </li>
                    <li className="nav-item">
                        {/*<a className="nav-link" href="#">Pacientes</a>*/}
                    </li>
                </ul>
                <span className="navbar-text">
                 Usuario </span>
            </div>
        </div>
    </nav>);
}
export default Header;



