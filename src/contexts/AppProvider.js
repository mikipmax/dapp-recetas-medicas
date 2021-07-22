import AppContext from "./AppContext";
import {useEffect, useRef, useState} from "react";
import getWeb3 from "../web3/getWeb3";
import RecetaMedicaInstancia from "../receta/RecetaMedicaInstancia";
import {RecetaServicio} from "../receta/RecetaServicio";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';

export default function AppProvider({children}) {

    const [medicinas, setMedicinas] = useState([]);
    const [cuenta, setCuenta] = useState(undefined);
    const [pacientes, setPacientes] = useState([]);
    const [medico, setMedico] = useState(undefined);
    const recetaServicio = useRef(null);
    const web3 = useRef(null);
    useEffect(() => {

        const inicializacion = async () => {

            web3.current = await getWeb3();
            let recetaInstancia = await RecetaMedicaInstancia(web3.current);
            recetaServicio.current = new RecetaServicio(recetaInstancia);
            getCuentaActual(web3.current);
        }

        inicializacion();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mostrarNotificacion = (tipo, mensaje) => {
        toastr.options = {
            positionClass: 'toast-top-right',
            hideDuration: 300,
            timeOut: 6000
        };
        toastr.clear();
        tipo === 1 ?
            setTimeout(() =>
                toastr.success(mensaje), 300) :
            setTimeout(() => toastr.error(mensaje), 300)
        getCuentaActual(web3.current)
    }

    const insertarNuevaMecicina = () => {

    }

    const getMedicinas = () => {
        fetch("medicinas.json")
            .then(response => response.json())
            .then(json => {
                setMedicinas(json);
            });
    };

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
                let pacientes = await recetaServicio.current.getPacientes(cuentaActual);
                setPacientes(pacientes);
                await recetaServicio.current.getRecetasPorDoctor(cuentaActual)

            }
        }
    }

    return (<AppContext.Provider value={{
        getMedicinas,
        medicinas,
        pacientes,
        cuenta,
        medico,
        recetaServicio,
        mostrarNotificacion,
        insertarNuevaMecicina

    }}>{children}</AppContext.Provider>);
}