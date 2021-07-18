import AppContext from "./AppContext";
import {useEffect, useRef, useState} from "react";
import getWeb3 from "../web3/getWeb3";
import RecetaMedicaInstancia from "../receta/RecetaMedicaInstancia";
import {RecetaServicio} from "../receta/RecetaServicio";

export default function AppProvider({children}) {

    const [medicinas, setMedicinas] = useState([]);
    const [cuenta, setCuenta] = useState(undefined);
    const [pacientes, setPacientes] = useState([]);
    const [medico, setMedico] = useState(undefined);
    const recetaServicio = useRef(null);

    useEffect(() => {

        const inicializacion = async () => {

            let web3 = await getWeb3();
            let recetaInstancia = await RecetaMedicaInstancia(web3);
            recetaServicio.current = new RecetaServicio(recetaInstancia);
            getCuentaActual(web3);
        }

        inicializacion();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getMedicinas = () => {
        fetch("medicinas.json")
            .then(response => response.json())
            .then(json => {
                setMedicinas(json);
            });
    };

    const getPacientes = async () => {
        let pacientes = await recetaServicio.current.getPacientes();
        console.log(pacientes)
        setPacientes(pacientes);
    }
    const getCuentaActual = (provider) => {

        let cuentaActual = null;
        provider
            .request({method: 'eth_accounts'})
            .then(handleAccountsChanged)
            .catch((err) => {
                console.error(err);
            });
        provider.on('accountsChanged', handleAccountsChanged);

        async function handleAccountsChanged(cuentas) {
            if (cuentas.length === 0) {
                console.log('Por favor, conéctese a Metamask.');
            } else if (cuentas[0] !== cuentaActual) {
                cuentaActual = cuentas[0];
                let medicoActual = await recetaServicio.current.getMedico(cuentaActual);
                setCuenta(cuentaActual);
                setMedico(medicoActual.nombresMedico + " " + medicoActual.appellidosMedico);
                await load();

            }
        }
    }

    const load = async () => {
        getPacientes();
    }


    return (<AppContext.Provider value={{getMedicinas, medicinas,cuenta, medico, recetaServicio}}>{children}</AppContext.Provider>);
}