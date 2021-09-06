import React, {useContext, useMemo, useState} from "react";
import AppContext from "../contexts/AppContext";
import Buscador from "../components/Buscador";

const DespachoRecetas = () => {
    const [search, setSearch] = useState("");

    const {
        convertirFecha,
        recetaServicio,
        cuenta,
        mostrarNotificacion,
        recetasFarmaceutico
    } = useContext(AppContext);

    const handleClick = async idReceta => {
        try {
            await recetaServicio.current.despacharReceta(idReceta, cuenta);
            mostrarNotificacion(1, "Receta despachada satisfactoriamente");
        } catch (error) {
            mostrarNotificacion(2, "Algo salió Mal: " + error.message);
        }
    }

    const datosRecetas = useMemo(() => {

        let recetasAux = recetasFarmaceutico;
        if (search) {
            recetasAux = recetasAux.filter(
                receta =>
                    receta.medico.cedulaProfesional.toLowerCase().includes(search.toLowerCase())
                    || receta.medico.nombres.toLowerCase().includes(search.toLowerCase())
                    || receta.medico.apellidos.toLowerCase().includes(search.toLowerCase())
                    || receta.paciente.cedula.toLowerCase().includes(search.toLowerCase())
                    || receta.paciente.nombres.toLowerCase().includes(search.toLowerCase())
                    || receta.paciente.apellidos.toLowerCase().includes(search.toLowerCase())
            );
        }
        return recetasAux;
    }, [recetasFarmaceutico, search]);

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
                    <table className="table table-responsive table-bordered border-info">
                        <thead>
                        <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Médico</th>
                            <th scope="col">Paciente</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col">Medicinas</th>
                            <th scope="col">Indicaciones Extras</th>
                            <th scope="col">Estado</th>
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
                                        <li className="list-group-item border-0"><b>Cédula
                                            Profesional: </b>{receta.medico.cedulaProfesional}</li>
                                        <li className="list-group-item border-0">
                                            <b>Nombres: </b>{receta.medico.nombres} {receta.medico.apellidos}
                                        </li>
                                        <li className="list-group-item border-0">
                                            <b>Especialidad: </b>{receta.medico.especialidad}</li>
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
                                    <button type="button" className="btn link-danger" disabled={receta.isDespachado}
                                            onClick={() => handleClick(receta.id)}>Despachar
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

export default DespachoRecetas;