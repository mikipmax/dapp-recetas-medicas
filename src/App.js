import React, {Component} from "react";
import getWeb3 from "./web3/getWeb3";
import Footer from "./footer/Footer"
import Header from "./header/Header";
import RecetaMedicaContract from './receta/receta'
import {RecetaService} from "./receta/recetaService";
import RegistroPaciente from "./components/registroPaciente";
import Medicinas from "./components/medicinas";

//https://techclub.tajamar.es/paginacion-en-react/
export default class App extends Component {
    constructor(props) {

        super(props);
        this.state = {
            cuenta: undefined,
            pacientes: []
        }
    }

    async getPacientes() {
        let pacientes = await this.recetaServicio.getPacientes();
        this.setState({
            pacientes
        })
    }

    async componentDidMount() {
        this.web3 = await getWeb3();
        this.receta = await RecetaMedicaContract(this.web3);
        this.recetaServicio = new RecetaService(this.receta);
        await this.getCuentaActual(this.web3);
    }

    async getCuentaActual(provider) {

        let cuentaActual = null;
        provider
            .request({method: 'eth_accounts'})
            .then(handleAccountsChanged.bind(this))
            .catch((err) => {
                console.error(err);
            });
        provider.on('accountsChanged', handleAccountsChanged.bind(this));

        async function handleAccountsChanged(cuentas) {
            if (cuentas.length === 0) {
                console.log('Por favor, conéctese a Metamask.');
            } else if (cuentas[0] !== cuentaActual) {
                cuentaActual = cuentas[0];
                this.setState({
                    cuenta: cuentaActual
                }, () => this.load());
            }
        }
    }

    async load() {
        this.getPacientes();
    }

    render() {
        return <React.Fragment>
            <Header/>
            <h1>Prescripciones Médicas</h1>
            <br/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Doctor</th>
                    <th scope="col">Cédula Paciente</th>
                    <th scope="col">Nombres Paciente</th>
                </tr>
                </thead>
                <tbody>
                {this.state.pacientes.map((paciente, i) => {
                        return <tr key={i}>
                            <td>{paciente.cuentaDoctor}</td>
                            <td>{paciente.cedulaPaciente}</td>
                            <td>{paciente.nombresPaciente} {paciente.apellidosPaciente}</td>
                        </tr>

                    }
                )}
                </tbody>
            </table>

            <br/>

            <RegistroPaciente cuentaDoctor={this.state.cuenta} recetaServicio={this.recetaServicio}/>
            <Medicinas/>
            {/*<p><strong>{this.state.cuenta}</strong></p>*/}
            <Footer autor="Michael Ponce"/>
        </React.Fragment>
    }
}
