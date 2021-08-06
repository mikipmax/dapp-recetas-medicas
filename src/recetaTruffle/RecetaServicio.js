export class RecetaServicio {
    constructor(contract) {
        this.contract = contract;
    }

    async registrarPaciente(paciente, cuentaDoctor) {
        if (paciente[0] === "") {
            paciente[0] = "0x0000000000000000000000000000000000000000"
        }
        return this.contract.registrarPaciente(paciente, {from: cuentaDoctor});
    }

    async registrarReceta(medico, paciente, diagnostico, indicacionesExtras, medicinas, fechaCaducidad, cuentaDoctor) {
        return this.contract.registrarReceta(medico, paciente, diagnostico, indicacionesExtras, medicinas,
            fechaCaducidad, {from: cuentaDoctor});
    }

    async getRecetasPorDoctor(cuentaDoctor) {

        let recetas = await this.contract.getRecetas(cuentaDoctor, true);
        return recetas;
    }

    async getRecetasPorPaciente(cuentaPaciente) {
        let recetas = await this.contract.getRecetas(cuentaPaciente, false);
        return recetas;
    }

    async eliminarReceta(id, cuentaMedico) {
        return this.contract.eliminarReceta(id, {from: cuentaMedico});
    }

    async despacharReceta(id, cuentaFarmaceutico) {
        return this.contract.despacharReceta(id, {from: cuentaFarmaceutico});
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
            apellidosMedico: medico[2],
            especialidad: medico[3]
        };
    }

    async getPaciente(cuentaPaciente) {

        let paciente = await this.contract.pacientes(cuentaPaciente);
        return {
            cuentaPaciente: paciente[0],
            cedulaPaciente: paciente[1],
            nombresPaciente: paciente[2],
            apellidosPaciente: paciente[3],
            correoPaciente: paciente[4],
            celularPaciente: paciente[5],
            edadPaciente: paciente[6].toNumber()
        };
    }

    mapPacientes(pacientes) {
        return pacientes.map(paciente => {
            return {
                cuentaPaciente: paciente[0],
                cedulaPaciente: paciente[1],
                nombresPaciente: paciente[2],
                apellidosPaciente: paciente[3],
                correoPaciente: paciente[4],
                celularPaciente: paciente[5],
                edadPaciente: paciente[6].toNumber()
            }
        });
    }

}