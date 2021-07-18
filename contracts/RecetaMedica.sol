// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RecetaMedica {

    uint private pacienteId;


    struct Medico {

        string cedulaProfesional;
        string nombres;
        string apellidos;
        string especialidad;
    }

    struct Paciente {
        address doctor;
        string cedula;
        string nombres;
        string apellidos;
        string correo;
        uint edad;
    }


    mapping(uint => Paciente) public pacientes;
    mapping(address => Medico) public medicos;

    constructor(){
        //Doctores pre-existentes
        medicos[0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3]= Medico("11111111","Patricio","Estrella","General");
        medicos[0xF5B223A069ebfDc5D491b94fB50C8be0B063CB65]= Medico("22222222","Bob","Sponja","General");
        //Pacientes test
        pacienteId = 0;
        pacientes[pacienteId] = Paciente(0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3, '1312960444', 'Michael', 'Frederick');
        pacienteId++;
        pacientes[pacienteId] = Paciente(0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3, '1705471223', 'Winka', 'Rea');
    }


    function registrarPaciente(
        address _doctor,
        string memory _cedula,
        string memory _nombre,
        string memory _apellido) public {

        pacienteId++;
        pacientes[pacienteId] = Paciente(_doctor, _cedula, _nombre, _apellido);
    }

    function pacienteIdActual() public view returns (uint) {
        return pacienteId;
    }


}
