import React, { useState } from "react";

const Buscador = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const onInputChange = value => {
        setSearch(value);
        onSearch(value);
    };
    return (
        <input
            type="text"
            className="form-control"
            style={{ width: "100%" }}
            placeholder="Buscar"
            value={search}
            onChange={e => onInputChange(e.target.value)}
        />
    );
};

export default Buscador;