import React, { useState } from "react";

const Buscador = ({ onSearch }) => {
    const [busqueda, setBusqueda] = useState("");

    const onInputChange = value => {
        setBusqueda(value);
        onSearch(value);
    };
    return (
        <input
            type="text"
            className="form-control"
            style={{ width: "100%" }}
            placeholder="Buscar"
            value={busqueda}
            onChange={e => onInputChange(e.target.value)}
        />
    );
};

export default Buscador;