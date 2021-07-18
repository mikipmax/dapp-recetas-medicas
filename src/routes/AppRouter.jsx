import Header from "../components/Header";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import RegistroRecetas from "../pages/RegistroRecetas";
import Recetas from "../pages/Recetas";
import RegistroPacientes from "../pages/RegistroPacientes";


const AppRouter = () => {
    return (
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/registroRecetas" component={RegistroRecetas}/>
                <Route exact path="/recetas" component={Recetas}/>
                <Route exact path="/registroPacientes" component={RegistroPacientes}/>
            </Switch>
        </Router>
    )
}
export default AppRouter;