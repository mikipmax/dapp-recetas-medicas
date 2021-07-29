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

    async registrarReceta(medico, paciente, diagnostico, indicacionesExtras, medicinas, cuentaDoctor) {

        return this.contract.registrarReceta(medico, paciente, diagnostico, indicacionesExtras, medicinas,
            {from: cuentaDoctor});
    }

    async getRecetasPorDoctor(cuentaDoctor) {
        let recetasTotalesPorDoctor = await this.contract.recetasTotalesPorDoctor(cuentaDoctor);
        let recetas = [];
        for (let i = 0; i < recetasTotalesPorDoctor.toNumber(); i++) {
            let receta = await this.contract.getRecetasPorDoctor(cuentaDoctor, i);
            recetas.push(receta);
        }

        return this.mapRecetas(recetas);
    }

    async getRecetasPorPaciente(cuentaPaciente) {
        let recetasTotalesPorPaciente = await this.contract.recetasTotalesPorPaciente(cuentaPaciente);
        let recetas = [];
        for (let i = 0; i < recetasTotalesPorPaciente.toNumber(); i++) {
            let receta = await this.contract.getRecetasPorPaciente(cuentaPaciente, i);
            recetas.push(receta);
        }

        return this.mapRecetas(recetas);
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
            cuentaPaciente: paciente [0],
            cedulaPaciente: paciente[1],
            nombresPaciente: paciente[2],
            apellidosPaciente: paciente[3],
            correoPaciente: paciente[4],
            edadPaciente: paciente[5].toNumber()
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
                edadPaciente: paciente[5].toNumber()
            }
        });
    }

    mapRecetas(recetas) {
        return recetas.map(receta => {
            let medicinasFormatoSolidity = receta [4];
            let listaMedicinaPorReceta = []
            medicinasFormatoSolidity.forEach(x => listaMedicinaPorReceta.push({
                nombreMedicina: x.nombreMedicina,
                indicacionMedicina: x.indicacionMedicina
            }))
            return {
                medico: receta [0],
                paciente: receta[1],
                diagnostico: receta [2],
                indicacionesExtras: receta [3],
                medicinas: receta[4],
                fecha: receta[5].toNumber()
            }
        });
    }
}