export class RecetaServicio {
    constructor(contract) {
        this.contract = contract;
    }

    async registrarPaciente(cedula, nombres, apellidos, correo, edad, cuentaDoctor) {
        return this.contract.registrarPaciente(cedula, nombres, apellidos, correo, edad, {from: cuentaDoctor});
    }


    async getPacientes(cuentaDoctor) {

        let pacientesTotalesPorDoctor = await this.contract.pacientesTotalesPorDoctor(cuentaDoctor);
        let pacientes = [];
        for (let i = 0; i < pacientesTotalesPorDoctor.toNumber(); i++) {
            let paciente = await this.contract.pacientesPorDoctor(cuentaDoctor, i);
            pacientes.push(paciente);
        }
        return this.mapPacientes(pacientes);
    }

    async getMedico(cuentaDoctor) {

        let medico = await this.contract.medicos(cuentaDoctor);
        return {
            cedulaProfesional: medico[0],
            nombresMedico: medico[1],
            appellidosMedico: medico[2],
            especialidad: medico[3]
        };
    }

    mapPacientes(pacientes) {
        return pacientes.map(paciente => {
            return {
                cedulaPaciente: paciente[0],
                nombresPaciente: paciente[1],
                apellidosPaciente: paciente[2],
                correoPaciente: paciente[3],
                edadPaciente: paciente[4]
            }
        });
    }
}