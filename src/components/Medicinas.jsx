import React, {useEffect, useState, useMemo, useContext, useRef} from "react";
import Buscador from "./Buscador";
import AppContext from "../contexts/AppContext";

const Medicinas = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [nuevaMedicina, setNuevaMedicina] = useState("");
    const {getMedicinas, medicinas} = useContext(AppContext);
    const indicacion = useRef("");
    const handleNuevaMedicinaChange = ({target: {value}}) => setNuevaMedicina(value);
    const handleIndicacionChange = ({target: {value}}) => indicacion.current = value;
    const handleFormularioSubmit = async event => {
        event.preventDefault();
        insertarMedicina(nuevaMedicina)
        setNuevaMedicina("");
    }

    const ITEMS_PER_PAGE = 5;

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

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [medicinas, currentPage, search]);
    const insertarMedicina = (medicina) => {

        console.log(medicina.medicina + " " + indicacion.current)
    }
    return (

        <div className="modal fade" id="exampleModal" tabIndex="-1"
             aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">

                    <div className="modal-body">
                        <div className="d-flex flex-row-reverse">
                            <Buscador
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>


                        {medicinasData.length === 0 ?
                            <div className="my-4">
                                <div className="card text-dark border-info mb-3">

                                    <div className="card-header border-info text-center">Agregue la Medicina deseada</div>
                                    <div className="card-body ">

                                        <form onSubmit={handleFormularioSubmit}>
                                            <div className="form-floating mb-3">
                                                <input type="text" value={nuevaMedicina}
                                                       onChange={handleNuevaMedicinaChange}
                                                       className="form-control"
                                                       id="id-nueva-medicina" placeholder="Paracetamol"
                                                       required={true}/>
                                                <label htmlFor="id-nueva-medicina">Medicina</label>
                                            </div>
                                            <div className="card-footer bg-transparent text-center border-0">
                                                <button type="submit" className="btn btn-lg btn-outline-info">Agregar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            :
                            <table className="table table-striped">
                                <thead>
                                <tr>

                                    <th scope="col">Medicinas</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Indicaciones</th>
                                    <th scope="col">Recetar</th>
                                </tr>
                                </thead>
                                <tbody>
                                {medicinasData.map(medicina => (
                                    <tr key={medicina.id}>

                                        <td>{medicina.medicina}</td>
                                        <td>{medicina.descripcion}</td>
                                        <td><input type="text"
                                                   onChange={handleIndicacionChange} placeholder="Cada hora .."
                                                   className="form-control"/></td>
                                        <td>
                                            <button className="btn btn-primary"
                                                    onClick={() => insertarMedicina(medicina)}>+
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        }
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Medicinas;