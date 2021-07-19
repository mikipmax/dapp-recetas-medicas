// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RecetaMedica {

    struct Medico {
        string cedulaProfesional;
        string nombres;
        string apellidos;
        string especialidad;
    }

    struct Paciente {
        string cedula;
        string nombres;
        string apellidos;
        string correo;
        uint edad;
    }

    Paciente[] public pacientes;
    mapping(address => Paciente[]) public pacientesPorDoctor;
    mapping(address => uint) public pacientesTotalesPorDoctor;
    mapping(address => Medico) public medicos;

    constructor(){
        //Doctores pre-existentes
        medicos[0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3] = Medico("11111111", "Patricio", "Estrella", "General");
        medicos[0xF5B223A069ebfDc5D491b94fB50C8be0B063CB65] = Medico("22222222", "Bob", "Sponja", "General");
    }

    function registrarPaciente(
        string memory _cedula,
        string memory _nombre,
        string memory _apellido,
        string memory _correo,
        uint _edad) public {
        pacientesPorDoctor[msg.sender].push(Paciente(_cedula, _nombre, _apellido, _correo, _edad));
        pacientesTotalesPorDoctor[msg.sender] ++;
    }

}
