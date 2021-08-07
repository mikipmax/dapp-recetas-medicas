import Header from "../components/Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import RegistroRecetas from "../pages/RegistroRecetas";
import RecetasMedico from "../pages/RecetasMedico";
import RegistroPacientes from "../pages/RegistroPacientes";
import Inicio from "../pages/Inicio";
import React, {useContext} from "react";
import AppContext from "../contexts/AppContext";
import RecetasPaciente from "../pages/RecetasPaciente";
import DespachoRecetas from "../pages/DespachoRecetas";

const AppRouter = () => {

    const {paciente, medico, farmaceutico} = useContext(AppContext);
    return (<Router>
        <Header/>
        <Switch>
            <Route exact path="/" component={Inicio}/>
            {(medico !== null && medico.cedulaProfesional !== "") &&
            <>
                <Route exact path="/registroRecetas" component={RegistroRecetas}/>
                <Route exact path="/recetasMedico" component={RecetasMedico}/>
                <Route exact path="/registroPacientes" component={RegistroPacientes}/>
            </>
            }
            {(paciente !== null && paciente.cedulaPaciente !== "") &&
            <>
                <Route exact path="/recetasPaciente" component={RecetasPaciente}/>
            </>
            }
            {(farmaceutico !== null && farmaceutico.ruc !== "") &&
            <>
                <Route exact path="/despachoRecetas" component={DespachoRecetas}/>
            </>
            }
        </Switch>
    </Router>)
}

export default AppRouter;