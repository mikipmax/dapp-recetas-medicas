// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RecetaMedica {

    struct Receta {
        Paciente paciente;
        string diagnostico;
        string indicacionesExtras;
        Medicina[] medicinas;
    }

    struct Rec1 {
        string diagnostico;
        Medicina[] medicinas;
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
        uint edad;
    }

    struct Medicina {
        string nombreMedicina;
        string indicacion;
    }

    mapping(address => Rec1) public tes;
    mapping(address => Rec1[]) public recPorDoctor;
    mapping(address => uint) public recTotalesPorDoctor;

    mapping(address => Receta[]) public recetaPorDoctor;
    mapping(address => Receta[]) public recetaPorPaciente;
    mapping(address => Paciente[]) public pacientesPorDoctor;
    mapping(address => uint) public pacientesTotalesPorDoctor;
    mapping(address => uint) public recetasTotalesPorDoctor;
    mapping(address => uint) public recetasTotalesPorPaciente;
    mapping(address => Medico) public medicos;

    constructor(){
        //Doctores pre-existentes
        medicos[0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3] = Medico("11111111", "Patricio", "Estrella", "General");
        medicos[0xF5B223A069ebfDc5D491b94fB50C8be0B063CB65] = Medico("22222222", "Bob", "Sponja", "General");
    }

    function registrarPaciente(
        address _cuentaPaciente,
        string memory _cedula,
        string memory _nombre,
        string memory _apellido,
        string memory _correo,
        uint _edad
    ) public {
        pacientesPorDoctor[msg.sender].push(Paciente(_cuentaPaciente, _cedula, _nombre, _apellido, _correo, _edad));
        pacientesTotalesPorDoctor[msg.sender] ++;
    }

    Medicina[]  medicinaAux;

    function registrarReceta(string memory _diagnostico,
        Medicina[] memory _medicinas
    ) public {
        tes[msg.sender].diagnostico = _diagnostico;
        for (uint j = 0; j < _medicinas.length; j++) {
            tes[msg.sender].medicinas.push(Medicina(_medicinas[j].nombreMedicina, _medicinas[j].indicacion));
        }
        recPorDoctor[msg.sender].push(tes[msg.sender]);
        recTotalesPorDoctor[msg.sender]++;
    }
}
