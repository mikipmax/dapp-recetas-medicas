import AppContext from "./AppContext";
import {useEffect, useRef, useState} from "react";
import getWeb3 from "../web3/getWeb3";
import RecetaMedicaInstancia from "../recetaTruffle/RecetaMedicaInstancia";
import {RecetaServicio} from "../recetaTruffle/RecetaServicio";
import toastr from "toastr";
import 'toastr/build/toastr.min.css';
import {usePDF} from "@react-pdf/renderer";

export default function AppProvider({children}) {
    const [documentoPdf, setDocumentoPdf] = useState();
    const [instancia, actualizarInstancia] = usePDF({document: documentoPdf});
    const [medicinas, setMedicinas] = useState([]);
    const [recetasMedico, setRecetasMedico] = useState([])
    const [recetasPaciente, setRecetasPaciente] = useState([])
    const [cuenta, setCuenta] = useState(undefined);
    const [pacientes, setPacientes] = useState([]);
    const [medico, setMedico] = useState(null);
    const [paciente, setPaciente] = useState(null);
    const [farmaceutico, setFarmaceutico] = useState(null);
    const recetaServicio = useRef(null);
    const web3 = useRef(null);
    useEffect(() => {

        const inicializacion = async () => {
            web3.current = await getWeb3();
            let recetaInstancia = await RecetaMedicaInstancia(web3.current);
            recetaServicio.current = new RecetaServicio(recetaInstancia);
            getCuentaActual(web3.current);
            getMedicinas();

            recetaInstancia.RecetaRegistrada(
                (error, event) => {
                    if (error) {
                        console.log("Algo salió mal " + error)
                    } else {
                        getCuentaActual(web3.current);

                    }
                })
        }
        inicializacion();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mostrarNotificacion = (tipo, mensaje) => {
        toastr.options = {
            positionClass: 'toast-top-right',
            hideDuration: 300,
            timeOut: 8000
        };
        toastr.clear();
        tipo === 1 ?
            setTimeout(() =>
                toastr.success(mensaje), 300) :
            setTimeout(() => toastr.error(mensaje), 300)
        getCuentaActual(web3.current)
    }

    const convertirFecha = (fechaMilisegundos) => {
        let fechaCompleta = new Date(fechaMilisegundos * 1000);
        let dia = fechaCompleta.getDate();
        let mes = fechaCompleta.getMonth() + 1;
        let anio = fechaCompleta.getFullYear();
        return (dia + "-" + mes + "-" + anio)
    }

    const getMedicinas = () => {
        fetch("medicinas.json")
            .then(response => response.json())
            .then(json => {
                setMedicinas(json);
            });
    };

    const getRecetasPorMedico = async cuentaActual => {
        let recetasPorDoctor = await recetaServicio.current.getRecetasPorDoctor(cuentaActual);
        setRecetasMedico(recetasPorDoctor);
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
                setCuenta(cuentaActual);
                let medicoActual = await recetaServicio.current.getMedico(cuentaActual);
                setMedico(medicoActual);
                let pacientes = await recetaServicio.current.getPacientes(cuentaActual);
                setPacientes(pacientes);
                await getRecetasPorMedico(cuentaActual);

                let pacienteActual = await recetaServicio.current.getPaciente(cuentaActual);
                setPaciente(pacienteActual);
                let recetasPorPaciente = await recetaServicio.current.getRecetasPorPaciente(cuentaActual);
                setRecetasPaciente(recetasPorPaciente)

                let farmaceuticoActual = await recetaServicio.current.getFarmaceutico(cuentaActual);
                setFarmaceutico(farmaceuticoActual);
            }
        }
    }

    return (<AppContext.Provider value={{
        medicinas,
        pacientes,
        farmaceutico,
        recetasMedico,
        getRecetasPorMedico,
        recetasPaciente,
        cuenta,
        medico,
        paciente,
        recetaServicio,
        mostrarNotificacion,
        convertirFecha,
        setDocumentoPdf,
        instancia,
        actualizarInstancia
    }}>{children}</AppContext.Provider>);
}