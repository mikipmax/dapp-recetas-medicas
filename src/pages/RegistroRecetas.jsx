import Medicinas from "../components/Medicinas";
import AppContext from "../contexts/AppContext";
import React, {useContext, useRef, useState} from "react";
import Select from 'react-select'
import DatePicker from 'react-date-picker';

const RegistroRecetas = () => {

    const {pacientes, recetaServicio, mostrarNotificacion, cuenta, medico} = useContext(AppContext);
    const [diagnostico, setDiagnostico] = useState("");
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [indicacionesExtras, setIndicacionesExtras] = useState("");
    const [fechaCaducidad, onChangeFechaCaducidad] = useState()
    const medicinasEnLista = useRef(new Map());
    const [medicinasRecetadas, setMedicinasRecetadas] = useState([]);

    const handleDiagnosticoChange = ({target: {value}}) => {
        setDiagnostico(value);
    };
    const handleIndicacionesExtrasChange = ({target: {value}}) => {
        setIndicacionesExtras(value);
    };
    const handleMecinaAgregada = (medicina, indicacion) => {
        medicinasEnLista.current.set(medicina.medicina, indicacion)
        setMedicinasRecetadas(Array.from(medicinasEnLista.current))
    }
    const handleFormularioSubmit = async event => {
        event.preventDefault();
        try {
            if (pacienteSeleccionado === null) {
                mostrarNotificacion(2, "Seleccione un Paciente");
                return;
            }
            if (medicinasRecetadas.length === 0) {
                mostrarNotificacion(2, "Debe existir al menos un medicamento recetado");
                return;
            }

            await recetaServicio.current.registrarReceta(Object.values(medico), Object.values(pacienteSeleccionado.value),
                diagnostico, indicacionesExtras, medicinasRecetadas, Math.round(fechaCaducidad.getTime() / 1000), cuenta
            );
            mostrarNotificacion(1, "Receta generada satisfactoriamente");
            setDiagnostico("");
            setIndicacionesExtras("");
            setMedicinasRecetadas([]);
            onChangeFechaCaducidad(null);
        } catch (error) {
            mostrarNotificacion(2, "Algo salió Mal: " + error.message);
        }
    }
    const handleQuitarMedicina = (medicinaAEliminar) => {
        medicinasEnLista.current.delete(medicinaAEliminar)
        setMedicinasRecetadas(Array.from(medicinasEnLista.current))
    }

    return (<>
            <div className="container my-5">
                <div className="col-md-4 offset-md-4">
                    <div className="card text-dark border-info mb-3">
                        <div className="card-header border-info text-center">NUEVA RECETA</div>
                        <div className="card-body">
                            <form onSubmit={handleFormularioSubmit}>
                                <Select
                                    isClearable={true}
                                    placeholder="Seleccione un Paciente"
                                    defaultValue={null}
                                    onChange={setPacienteSeleccionado}
                                    options={pacientes.map(paciente => ({
                                        value: paciente,
                                        label: paciente.cedulaPaciente + " - " + paciente.nombresPaciente +
                                            " " + paciente.apellidosPaciente + " - " + paciente.edadPaciente + " años - " +
                                            paciente.correoPaciente + " - " + paciente.celularPaciente
                                    }))}/>
                                <div className="form-floating mb-3 my-3">
                                    <textarea value={diagnostico} onChange={handleDiagnosticoChange}
                                              className="form-control h-50"
                                              id="id-diagnostico" placeholder="-------" required={true}/>
                                    <label htmlFor="id-diagnostico">Diagnóstico</label>
                                </div>
                                <div className="my-3 text-center">
                                    <hr/>
                                    <button type="button" className="btn link-primary" data-bs-toggle="modal"
                                            data-bs-target="#modalMedicinas">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-link" viewBox="0 0 16 16">
                                            <path
                                                d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                            <path
                                                d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
                                        </svg>
                                        &nbsp;Seleccionar Medicamentos
                                    </button>

                                    <hr/>
                                </div>
                                <div className="my-3 text-center">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Medicina Recetada</th>
                                            <th scope="col">Indicación</th>
                                            <th scope="col">Acción</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {medicinasRecetadas.map((value, i) => (
                                            <tr key={i}>
                                                <th scope="row">{++i}</th>
                                                <td>{value[0]}</td>
                                                <td>{value[1]}</td>
                                                <td>
                                                    <button type="button" className="btn link-primary"
                                                            onClick={() => handleQuitarMedicina(value[0])}
                                                    >Quitar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="form-floating mb-3 my-3">
                                    <input type="text" value={indicacionesExtras}
                                           onChange={handleIndicacionesExtrasChange}
                                           className="form-control"
                                           id="id-indicaciones" placeholder="-------"/>
                                    <label htmlFor="id-indicaciones">Indicaciones Extras</label>
                                </div>
                                <hr/>
                                <div className="text-center mb-3 my-3">
                                    <label className="form-label" htmlFor="id-indicaciones">Fecha de Caducidad:</label>
                                    &nbsp;&nbsp;
                                    <DatePicker required={true}
                                                onChange={onChangeFechaCaducidad}
                                                value={fechaCaducidad}/>
                                </div>
                                <hr/>
                                <div className="card-footer bg-transparent text-center border-0">
                                    <button type="submit" className="btn btn-lg btn-outline-info">Generar Receta
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Medicinas handleMecinaAgregada={handleMecinaAgregada}/>
        </>
    )
}

export default RegistroRecetas;