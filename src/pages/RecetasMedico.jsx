import React, {useContext, useEffect, useRef, useState} from "react";
import AppContext from "../contexts/AppContext";
import MyDocument from "./MyApp";
import {PDFDownloadLink, usePDF, Document, Page, View, Text} from "@react-pdf/renderer";

const RecetasMedico = () => {
    const [datos, setDatos] = useState();

    const {recetasMedico} = useContext(AppContext);
    const [instance, updateInstance] = usePDF({document: datos});
    const convertirFecha = (fechaMilisegundos) => {
        return new Date(fechaMilisegundos * 1000).toLocaleString();
    }
    const datosPdf = useRef("");
    useEffect(updateInstance, [datosPdf.current]);
    const handleClick = (diagnostico) => {
        console.log(diagnostico)
        datosPdf.current = (diagnostico);
        setDatos(<MyDocument data={datosPdf.current}/>);
    };
    return (<div className="container my-5">

        <div className="col-md-10 offset-md-1">
            <div className="card text-dark border-0 mb-3">
                <div className="card-body ">
                    <table className="table table-responsive table-bordered border-info">
                        <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col">Medicinas</th>
                            <th scope="col">Indicaciones Extras</th>
                            <th scope="col">Generar PDF</th>
                        </tr>
                        </thead>
                        <tbody>

                        {recetasMedico.map((receta, i) => (
                            <tr key={i}>

                                <td>{convertirFecha(receta.fecha)}</td>
                                <td>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item border-0"><b>Cédula: </b>{receta.paciente.cedula}
                                        </li>
                                        <li className="list-group-item border-0">
                                            <b>Nombres: </b>{receta.paciente.nombres} {receta.paciente.apellidos}</li>
                                        <li className="list-group-item border-0">
                                            <b>Edad: </b>{receta.paciente.edad} años
                                        </li>
                                        <li className="list-group-item border-0"><b>Correo: </b>{receta.paciente.correo}
                                        </li>
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
                                <td>
                                    {instance.loading ? <div>Cargando ...</div> :
                                        <a className="link-danger btn" href={instance.url}
                                           onMouseOver={() => handleClick(receta.diagnostico)}
                                           download={"Receta " + receta.paciente.nombres + " " + receta.paciente.apellidos + ".pdf"}>
                                            Descargar
                                        </a>}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>)
}
export default RecetasMedico;