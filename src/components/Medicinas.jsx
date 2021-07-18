import React, {useEffect, useState, useMemo, useContext} from "react";

import Buscador from "./Buscador";
import AppContext from "../contexts/AppContext";


const Medicinas = () => {

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");

    const {getMedicinas, medicinas} = useContext(AppContext);
    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        getMedicinas();
    }, []);

    const medicinasData = useMemo(() => {
        let computedComments = medicinas;

        if (search) {
            computedComments = computedComments.filter(
                medicina =>
                    medicina.medicina.toLowerCase().includes(search.toLowerCase()) ||
                    medicina.descripcion.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedComments.length);


        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [medicinas, currentPage, search]);
    const insertarMedicina = (medicina) => {

        console.log(medicina)
    }
    return (
        <div className="container">

            <div className="row w-100 ">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">

                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Buscador
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <table className="table table-striped">
                        <thead>
                        <tr>

                            <th scope="col">Medicinas</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Recetar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {medicinasData.map(medicina => (
                            <tr key={medicina.id}>

                                <td>{medicina.medicina}</td>
                                <td>{medicina.descripcion}</td>
                                <td>
                                    <button className="btn btn-primary"
                                            onClick={() => insertarMedicina(medicina)}>+
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default Medicinas;