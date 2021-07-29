// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma abicoder v2;

contract RecetaMedica {

    struct Medicina {
        string nombreMedicina;
        string indicacion;
    }

    struct Medico {
        string cedulaProfesional;
        string nombres;
        string apellidos;
        string especialidad;
    }

    struct Paciente {
        address cuentaPaciente;
        string cedula;
        string nombres;
        string apellidos;
        string correo;
        uint8 edad;
    }

    struct Receta {
        Medico medico;
        Paciente paciente;
        string diagnostico;
        string indicacionesExtras;
        Medicina[] medicinas;
        uint fecha;
    }

    mapping(address => Medico) public medicos;

    mapping(address => Paciente) public pacientes;

    mapping(address => Receta)  private recetaTemporal;

    mapping(address => Receta[]) public recetasPorDoctor;
    mapping(address => uint) public recetasTotalesPorDoctor;

    mapping(address => Receta[]) public recetasPorPaciente;
    mapping(address => uint) public recetasTotalesPorPaciente;

    mapping(address => Paciente[]) public pacientesPorDoctor;
    mapping(address => uint) public pacientesTotalesPorDoctor;

    constructor(){
        //Doctores pre-existentes
        medicos[0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3] = Medico("11111111", "Patricio", "Estrella", "General");
        medicos[0xF5B223A069ebfDc5D491b94fB50C8be0B063CB65] = Medico("22222222", "Bob", "Sponja", "General");
    }

    function registrarPaciente(
        Paciente memory _paciente
    ) public {
        if (_paciente.cuentaPaciente != address(0)) {
            pacientes[_paciente.cuentaPaciente] = _paciente;
        }

        pacientesPorDoctor[msg.sender].push(_paciente);
        pacientesTotalesPorDoctor[msg.sender] ++;
    }

    function registrarReceta(
        Medico memory _medico,
        Paciente memory _paciente,
        string memory _diagnostico,
        string memory _indicacionesExtras,
        Medicina[] memory _medicinas
    ) public {
        //Dado que, recetaTemporal es variable global se va acumulando por eso se la vacía por cada registro ya que son indep
        for (uint j = 0; j < _medicinas.length; j++) {
            delete recetaTemporal[msg.sender];
        }
        recetaTemporal[msg.sender].medico = _medico;
        recetaTemporal[msg.sender].paciente = _paciente;
        recetaTemporal[msg.sender].diagnostico = _diagnostico;
        recetaTemporal[msg.sender].indicacionesExtras = _indicacionesExtras;
        recetaTemporal[msg.sender].fecha = block.timestamp;
        for (uint j = 0; j < _medicinas.length; j++) {
            recetaTemporal[msg.sender].medicinas.push(Medicina(_medicinas[j].nombreMedicina, _medicinas[j].indicacion));
        }
        recetasPorDoctor[msg.sender].push(recetaTemporal[msg.sender]);
        recetasTotalesPorDoctor[msg.sender]++;

        if (_paciente.cuentaPaciente != address(0)) {
            recetasPorPaciente[_paciente.cuentaPaciente].push(recetaTemporal[msg.sender]);
            recetasTotalesPorPaciente[_paciente.cuentaPaciente]++;
        }
    }

    function getRecetasPorDoctor(address cuentaDoctor, uint i) public view returns (Medico memory, Paciente memory, string memory, string memory, Medicina[] memory, uint) {
        return (recetasPorDoctor[cuentaDoctor][i].medico,
        recetasPorDoctor[cuentaDoctor][i].paciente,
        recetasPorDoctor[cuentaDoctor][i].diagnostico,
        recetasPorDoctor[cuentaDoctor][i].indicacionesExtras,
        recetasPorDoctor[cuentaDoctor][i].medicinas,
        recetasPorDoctor[cuentaDoctor][i].fecha);
    }

    function getRecetasPorPaciente(address cuentaPaciente, uint i) public view returns (Medico memory, Paciente memory, string memory, string memory, Medicina[] memory, uint) {
        return (recetasPorPaciente[cuentaPaciente][i].medico,
        recetasPorPaciente[cuentaPaciente][i].paciente,
        recetasPorPaciente[cuentaPaciente][i].diagnostico,
        recetasPorPaciente[cuentaPaciente][i].indicacionesExtras,
        recetasPorPaciente[cuentaPaciente][i].medicinas,
        recetasPorPaciente[cuentaPaciente][i].fecha);
    }
}
