import React, {useState, useMemo, useContext, useRef} from "react";
import Buscador from "./Buscador";
import AppContext from "../contexts/AppContext";

const Medicinas = ({handleMecinaAgregada}) => {

    const [paginaActual, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [nuevaMedicina, setNuevaMedicina] = useState("");
    const [nuevaMedicinaIndicacion, setNuevaMedicinaIndicacion] = useState("");
    const {medicinas} = useContext(AppContext);
    const indicacion = useRef("");
    const handleNuevaMedicinaChange = ({target: {value}}) => setNuevaMedicina(value);
    const handleNuevaMedicinaIndicacionChange = ({target: {value}}) => setNuevaMedicinaIndicacion(value);
    const handleIndicacionChange = ({target: {value}}) => indicacion.current = value;

    const handleFormularioSubmit = async event => {
        event.preventDefault();
        handleMecinaAgregada({medicina: nuevaMedicina}, nuevaMedicinaIndicacion);
        setNuevaMedicina("");
        setNuevaMedicinaIndicacion("");
    }

    const ITEMS_POR_PAGINA = 5;

    const datosMedicinas = useMemo(() => {

        let numeroMedicinasCalculadas = medicinas;
        if (search) {
            numeroMedicinasCalculadas = numeroMedicinasCalculadas.filter(
                medicina =>
                    medicina.medicina.toLowerCase().includes(search.toLowerCase()) ||
                    medicina.descripcion.toLowerCase().includes(search.toLowerCase())
            );
        }

        return numeroMedicinasCalculadas.slice(
            (paginaActual - 1) * ITEMS_POR_PAGINA,
            (paginaActual - 1) * ITEMS_POR_PAGINA + ITEMS_POR_PAGINA
        );
    }, [medicinas, paginaActual, search]);

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

                        {datosMedicinas.length === 0 ?
                            <div className="my-4">
                                <div className="card text-dark border-info mb-3">
                                    <div className="card-header border-info text-center">¿No encontró la medicina que
                                        buscaba?. Agréguela por favor.
                                    </div>
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
                                            <div className="form-floating mb-3">
                                                <input type="text" value={nuevaMedicinaIndicacion}
                                                       onChange={handleNuevaMedicinaIndicacionChange}
                                                       className="form-control"
                                                       id="id-nueva-medicina-idicacion" placeholder="Cada ..."
                                                       required={true}/>
                                                <label htmlFor="id-nueva-medicina">Indicación</label>
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
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">Medicinas</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">Indicaciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {datosMedicinas.map(medicina => (
                                    <tr key={medicina.id}>

                                        <td>{medicina.medicina}</td>
                                        <td>{medicina.descripcion}</td>
                                        <td><input type="text"
                                                   onChange={handleIndicacionChange} onFocus={handleIndicacionChange}
                                                   onBlur={() => {
                                                       indicacion.current !== "" && handleMecinaAgregada(medicina, indicacion.current)
                                                   }}
                                                   placeholder="Cada hora .."
                                                   className="form-control"/></td>
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