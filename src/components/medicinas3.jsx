import React, {useEffect, useState, useMemo} from "react";

import Search from "./dataTablePaginado/buscador";
import useFullPageLoader from "./hooks/useHooksPageLoader";


const DataTable = () => {
    const [medicinas, setMedicinas] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");


    const ITEMS_PER_PAGE = 10;

    useEffect(() => {
        const getData = () => {
            showLoader();
            fetch("medicinas.json")
                .then(response => response.json())
                .then(json => {
                    hideLoader();
                    setMedicinas(json);

                });
        };

        getData();
        // eslint-disable-next-line
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
        <>


            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">

                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
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
            {loader}
        </>
    );
};

export default DataTable;