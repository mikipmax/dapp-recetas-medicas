import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import AppContext from "../contexts/AppContext";
import GenerarPdf from "../components/GenerarPdf";
import QRCode from "qrcode.react"
import Buscador from "../components/Buscador";

const RecetasMedico = () => {
    const [search, setSearch] = useState("");
    const datosPdf = useRef(null);

    const {
        recetasMedico,
        getRecetasPorMedico,
        cuenta,
        convertirFecha,
        setDocumentoPdf,
        instancia,
        actualizarInstancia,
        recetaServicio,
        mostrarNotificacion
    } = useContext(AppContext);

    useEffect(() => {
            actualizarInstancia()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [datosPdf.current]
    );

    const datosRecetas = useMemo(() => {
        let recetasMedicoAux = recetasMedico;
        if (search) {
            recetasMedicoAux = recetasMedicoAux.filter(
                receta =>
                    receta.paciente.cedula.toLowerCase().includes(search.toLowerCase())
                    || receta.paciente.nombres.toLowerCase().includes(search.toLowerCase())
                    || receta.paciente.apellidos.toLowerCase().includes(search.toLowerCase())
            );
        }
        return recetasMedicoAux;
    }, [recetasMedico, search]);

    const handleMouseOver = (receta) => {
        datosPdf.current = receta;
        setDocumentoPdf(<GenerarPdf receta={datosPdf.current}/>);
    };

    const handleClick = async idReceta => {
        try {
            await recetaServicio.current.eliminarReceta(idReceta, cuenta);
            await getRecetasPorMedico(cuenta);
            mostrarNotificacion(1, "Receta eliminada satisfactoriamente");
        } catch (error) {
            mostrarNotificacion(2, "Algo salió Mal: " + error.message);
        }
    }

    return (<div className="container my-5">

        <div className="col-md-10 offset-md-1">
            <div className="card text-dark border-0 mb-3">
                <div className="card-body ">
                    <div className="d-flex flex-row-reverse">
                        <Buscador
                            onSearch={value => {
                                setSearch(value);
                            }}
                        />
                    </div>
                    <br/>
                    <QRCode value={cuenta} id="qr_cuenta" hidden/>
                    <table className="table table-responsive table-bordered border-info">
                        <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col">Medicinas</th>
                            <th scope="col">Indicaciones Extras</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Generar PDF</th>
                            <th scope="col">Opción</th>
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
                                <td>{receta.isDespachado ? "Despachado" : "Pendiente"}</td>
                                <td>
                                    {instancia.loading ? <div>Cargando ...</div> :
                                        <a className="link-info btn" href={instancia.url}
                                           onMouseOver={() => handleMouseOver(receta)}
                                           download={"Receta " + receta.paciente.nombres + " " + receta.paciente.apellidos + ".pdf"}>
                                            Descargar
                                        </a>}
                                </td>
                                <td>
                                    <button type="button" className="btn link-danger" disabled={receta.isDespachado}
                                            onClick={() => handleClick(receta.id)}>Eliminar
                                    </button>
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