import React, {useContext} from "react";
import AppContext from "../contexts/AppContext";

const RecetasPaciente = () => {
    const {recetasPaciente} = useContext(AppContext);
    console.log(recetasPaciente)
    const convertirFecha = (fechaMilisegundos) => {
        return new Date(fechaMilisegundos * 1000).toLocaleString();
    }
    return (<div className="container my-5">

        <div className="col-md-10 offset-md-1">
            <div className="card text-dark border-0 mb-3">
                <div className="card-body ">
                    <table className="table table-responsive table-bordered border-info">
                        <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Médico</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col">Medicinas</th>
                            <th scope="col">Indicaciones Extras</th>
                        </tr>
                        </thead>
                        <tbody>

                        {recetasPaciente.map((receta, i) => (
                            <tr key={i}>

                                <td>{convertirFecha(receta.fecha)}</td>
                                <td>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item border-0"><b>Cédula
                                            Profesional: </b>{receta.medico.cedulaProfesional}</li>
                                        <li className="list-group-item border-0">
                                            <b>Nombres: </b>{receta.medico.nombres} {receta.medico.apellidos}
                                        </li>
                                        <li className="list-group-item border-0">
                                            <b>Especialidad: </b>{receta.medico.especialidad}</li>
                                    </ul>
                                </td>
                                <td>{receta.diagnostico}</td>
                                <td>
                                    <table className="table table-responsive">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Medicina</th>
                                            <th scope="col">Indicación</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {receta.medicinas.map((medicina, i) => (
                                            <tr key={i}>
                                                <td>{++i}</td>
                                                <td>{medicina[0]}</td>
                                                <td>{medicina[1]}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </td>
                                <td>{receta.indicacionesExtras}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>)
}
export default RecetasPaciente;