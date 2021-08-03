import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import AppContext from "../contexts/AppContext";
import GenerarPdf from "../components/GenerarPdf";
import QRCode from "qrcode.react";
import Buscador from "../components/Buscador";

const RecetasPaciente = () => {
    const [search, setSearch] = useState("");
    const {
        recetasPaciente,
        convertirFecha,
        setDocumentoPdf,
        instancia,
        actualizarInstancia
    } = useContext(AppContext);
    const datosPdf = useRef(null);
    const [tokenMedico, setTokenMedico] = useState("");

    useEffect(() => {
            actualizarInstancia()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [datosPdf.current]
    );

    const datosRecetas = useMemo(() => {

        let recetasPacienteAux = recetasPaciente;
        if (search) {
            recetasPacienteAux = recetasPacienteAux.filter(
                receta =>
                    receta.medico.cedulaProfesional.toLowerCase().includes(search.toLowerCase())
                    || receta.medico.nombres.toLowerCase().includes(search.toLowerCase())
                    || receta.medico.apellidos.toLowerCase().includes(search.toLowerCase())
            );
        }
        return recetasPacienteAux;
    }, [recetasPaciente, search]);


    const handleMouseOver = (receta) => {
        datosPdf.current = receta;
        setTokenMedico(receta.tokenMedico)
        setDocumentoPdf(<GenerarPdf receta={datosPdf.current}/>);
    };

    return (<div className="container my-5">

        <div className="col-md-10 offset-md-1">
            <div className="card text-dark border-0 mb-3">
                <div className="card-body ">
                    <QRCode value={tokenMedico} id="qr_cuenta" hidden/>
                    <div className="d-flex flex-row-reverse">
                        <Buscador
                            onSearch={value => {
                                setSearch(value);
                            }}
                        />
                    </div>
                    <br/>
                    <table className="table table-responsive table-bordered border-info">
                        <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Médico</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col">Medicinas</th>
                            <th scope="col">Indicaciones Extras</th>
                            <th scope="col">Generar PDF</th>
                        </tr>
                        </thead>
                        <tbody>
                        {datosRecetas.map((receta, i) => (
                            <tr key={i}>
                                <td>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item border-0">
                                            <b>Emisión: </b><br/>{convertirFecha(receta.fecha)}
                                        </li>
                                        <li className="list-group-item border-0">
                                            <b>Vencimiento: </b>{convertirFecha(receta.fechaCaducidad)} </li>
                                    </ul>
                                </td>
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
                                <td>
                                    {instancia.loading ? <div>Cargando ...</div> :
                                        <a className="link-danger btn" href={instancia.url}
                                           onMouseOver={() => handleMouseOver(receta)}
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

export default RecetasPaciente;