import {useState} from "react";

const RegistroPaciente = ({cuentaDoctor, recetaServicio}) => {

    // const [paciente, setPaciente] = useState({
    //     cuentaDoctor: undefined,
    //     cedula: undefined,
    //     nombres: undefined,
    //     apellidos: undefined
    // });
    const [cedula, setCedula] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");

    const handleCedulaChange = ({target: {value}}) => setCedula(value)
    const handleNombresChange = ({target: {value}}) => setNombres(value)
    const handleApellidosChange = ({target: {value}}) => setApellidos(value)
    const handleFormularioSubmit = async event => {
        event.preventDefault();
        await recetaServicio.registrarPaciente(cedula, nombres, apellidos, cuentaDoctor);
    }

    return (
        <form onSubmit={handleFormularioSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Cédula</label>
                <input type="text" value={cedula} onChange={handleCedulaChange} className="form-control" id="id-email"
                       aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Nombres</label>
                <input type="text" value={nombres} onChange={handleNombresChange} className="form-control"
                       id="id-nombres"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Apellidos</label>
                <input type="text" value={apellidos} onChange={handleApellidosChange} className="form-control"
                       id="id-apellidos"/>
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
    );
}
export default RegistroPaciente;
