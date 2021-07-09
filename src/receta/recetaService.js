export class RecetaService {
    constructor(contract) {
        this.contract = contract;
    }

    async registrarPaciente(cedula, nombres, apellidos, cuentaDoctor) {
        return this.contract.registrarPaciente( cuentaDoctor, cedula, nombres, apellidos, {from: cuentaDoctor});
    }


    async getPacientes() {

        let pacienteIdActual = await this.contract.pacienteIdActual();
        let pacientes = [];
        for (let i = 0; i <= pacienteIdActual.toNumber(); i++) {
            let paciente = await this.contract.pacientes(i);
            pacientes.push(paciente)
        }
        return this.mapPacientes(pacientes);
    }

    mapPacientes(pacientes) {
        return pacientes.map(paciente => {
            return {
                cuentaDoctor: paciente[0],
                cedulaPaciente: paciente[1],
                nombresPaciente: paciente[2],
                apellidosPaciente: paciente[3]
            }
        });
    }
}