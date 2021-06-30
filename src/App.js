import React, {Component} from "react";
import getWeb3 from "./web3/getWeb3";
import Footer from "./footer/Footer"
import Header from "./header/Header";
import RecetaMedicaContract from './receta/receta'
export default class App extends Component {
    constructor(props) {

        super(props);
        this.state = {
            cuenta: undefined
        }
    }

    async componentDidMount() {
        this.web3 = await getWeb3();
        this.receta=await RecetaMedicaContract(this.web3)
        await this.getCuentaActual();
    }

    async getCuentaActual() {
        this.web3 = await getWeb3();
        let cuentaActual = null;
        this.web3
            .request({method: 'eth_accounts'})
            .then(handleAccountsChanged.bind(this))
            .catch((err) => {
                console.error(err);
            });
        this.web3.on('accountsChanged', handleAccountsChanged.bind(this));

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

    }

    render() {
        return <React.Fragment>
            <Header/>
            <h1>Prescripciones Médicas</h1>
            <p><strong>{this.state.cuenta}</strong></p>
            <Footer autor="Michael Ponce"/>
        </React.Fragment>
    }
}
