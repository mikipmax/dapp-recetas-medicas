import {useContext, useState} from "react";

import AppContext from "../contexts/AppContext";

const RegistroPaciente = () => {

    const [cedula, setCedula] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const {cuenta, recetaServicio} = useContext(AppContext)
    const handleCedulaChange = ({target: {value}}) => setCedula(value)
    const handleNombresChange = ({target: {value}}) => setNombres(value)
    const handleApellidosChange = ({target: {value}}) => setApellidos(value)
    const handleFormularioSubmit = async event => {
        event.preventDefault();
        await recetaServicio.current.registrarPaciente(cedula, nombres, apellidos, cuenta);
        setCedula("");
        setNombres("");
        setApellidos("");
    }

    return (


        <div className="container my-5">

            <div className="col-md-4 offset-md-4">
                <div className="card text-dark border-info mb-3">
                    <div className="card-header border-info text-center">NUEVO PACIENTE</div>
                    <div className="card-body ">


                        <form onSubmit={handleFormularioSubmit}>

                            <div className="form-floating mb-3">
                                <input type="text" value={cedula} onChange={handleCedulaChange} className="form-control"
                                       id="id-cedula" placeholder="xxxxxxxxx-x"/>
                                <label htmlFor="id-cedula">Cédula</label>
                            </div>
                            <div className="form-floating mb-3">

                                <input type="text" value={nombres} onChange={handleNombresChange}
                                       className="form-control"
                                       id="id-nombres" placeholder="Michael"/>
                                <label htmlFor="id-nombres">Nombres</label>
                            </div>
                            <div className="form-floating mb-3">

                                <input type="text" value={apellidos} onChange={handleApellidosChange}
                                       className="form-control"
                                       id="id-apellidos" placeholder="Ponce"/>
                                <label htmlFor="id-apellidos" className="form-label">Apellidos</label>
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