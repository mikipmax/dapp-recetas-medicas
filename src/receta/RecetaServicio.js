export class RecetaServicio {
    constructor(contract) {
        this.contract = contract;
    }

    async registrarPaciente(cuentaPaciente, cedula, nombres, apellidos, correo, edad, cuentaDoctor) {
        return this.contract.registrarPaciente(
            cuentaPaciente === "" ? "0x0000000000000000000000000000000000000000" : cuentaPaciente,
            cedula, nombres, apellidos, correo, edad, {from: cuentaDoctor});
    }

    async registrarReceta(diagnostico, indicacionesExtras, medicinas, cuentaDoctor) {
        console.log(indicacionesExtras+"+++")
        return this.contract.registrarReceta(diagnostico, indicacionesExtras, medicinas,
            {from: cuentaDoctor});
    }

    async getRecetasPorDoctor(cuentaDoctor) {
        let recTotalesPorDoctor = await this.contract.recTotalesPorDoctor(cuentaDoctor);
        let recetas = [];
        for (let i = 0; i < recTotalesPorDoctor.toNumber(); i++) {
            let receta = await this.contract.getRecetasPorDoctor(cuentaDoctor, i);
            recetas.push(receta);
        }
        console.log(recetas)
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
                cuentaPaciente: paciente [0],
                cedulaPaciente: paciente[1],
                nombresPaciente: paciente[2],
                apellidosPaciente: paciente[3],
                correoPaciente: paciente[4],
                edadPaciente: paciente[5]
            }
        });
    }
}