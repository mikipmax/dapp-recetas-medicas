import {useContext, useState} from "react";

import AppContext from "../contexts/AppContext";


const RegistroPaciente = () => {

    const [cedula, setCedula] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [edad, setEdad] = useState("");
    const [cuentaPaciente, setCuentaPaciente] = useState("");

    const {cuenta, recetaServicio, mostrarNotificacion} = useContext(AppContext);
    const handleCedulaChange = ({target: {value}}) => setCedula(value);
    const handleNombresChange = ({target: {value}}) => setNombres(value);
    const handleApellidosChange = ({target: {value}}) => setApellidos(value);
    const handleCorreoChange = ({target: {value}}) => setCorreo(value);
    const handleEdadChange = ({target: {value}}) => setEdad(value);
    const handleCuentaPacienteChange = ({target: {value}}) => setCuentaPaciente(value);

    const handleFormularioSubmit = async event => {
        event.preventDefault();
        try {
            let paciente = {
                cuentaPaciente,
                cedula,
                nombres,
                apellidos,
                correo,
                edad
            }

            await recetaServicio.current.registrarPaciente(Object.values(paciente), cuenta)
            mostrarNotificacion(1, "Paciente creado satisfactoriamente");
            setCuentaPaciente("");
            setCedula("");
            setNombres("");
            setApellidos("");
            setCorreo("");
            setEdad("");
        } catch (error) {
            mostrarNotificacion(2, "Algo salió Mal: " + error.message);
        }
    }

    return (
        <div className="container my-5">

            <div className="col-md-4 offset-md-4">
                <div className="card text-dark border-info mb-3">
                    <div className="card-header border-info text-center">NUEVO PACIENTE</div>
                    <div className="card-body ">

                        <form onSubmit={handleFormularioSubmit}>
                            <div className="form-floating mb-3">
                                <input type="text" value={cuentaPaciente} onChange={handleCuentaPacienteChange}
                                       className="form-control"
                                       id="id-cuenta-paciente" placeholder="0x4874846421asdfasdasdfasdf"/>
                                <label htmlFor="id-cuenta-paciente">Token Público Paciente</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" value={cedula} onChange={handleCedulaChange}
                                       className="form-control"
                                       id="id-cedula" placeholder="xxxxxxxxx-x" required={true}/>
                                <label htmlFor="id-cedula">Cédula</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" value={nombres} onChange={handleNombresChange}
                                       className="form-control"
                                       id="id-nombres" placeholder="Michael" required={true}/>
                                <label htmlFor="id-nombres">Nombres</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="text" value={apellidos} onChange={handleApellidosChange}
                                       className="form-control"
                                       id="id-apellidos" placeholder="Ponce" required={true}/>
                                <label htmlFor="id-apellidos" className="form-label">Apellidos</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email" value={correo} onChange={handleCorreoChange}
                                       className="form-control"
                                       id="id-correo" placeholder="a@mail.com" required={true}/>
                                <label htmlFor="id-correo" className="form-label">Correo</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="number" value={edad} onChange={handleEdadChange}
                                       className="form-control" min="0"
                                       id="id-edad" placeholder="25" required={true}/>
                                <label htmlFor="id-edad" className="form-label">Edad</label>
                            </div>
                            <div className="card-footer bg-transparent text-center border-0">
                                <button type="submit" className="btn btn-lg btn-outline-info">Guardar</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default RegistroPaciente;