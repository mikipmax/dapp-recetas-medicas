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
        //Valores iniciales, que luego solidity reasignara cuando haga la inserción en la red de blockchain
        let id = 0;
        let fecha = 0;
        let tokenMedico = cuentaDoctor;
        let isDespachado = false
        let receta = {
            id,
            medico,
            paciente,
            diagnostico,
            indicacionesExtras,
            medicinas,
            fecha,
            fechaCaducidad,
            tokenMedico,
            isDespachado
        }
        return this.contract.registrarReceta(Object.values(receta), {from: cuentaDoctor});
    }

    async getRecetas(cuenta) {
        let recetas = await this.contract.getRecetas(cuenta);
        return recetas.filter(x => x.fecha !== "0");
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

    async getFarmaceutico(cuentaFarmacia) {
        let farmaceutico = await this.contract.farmaceuticos(cuentaFarmacia);
        return farmaceutico;
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