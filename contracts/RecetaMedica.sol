// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RecetaMedica {

    uint private pacienteId;

    struct Paciente {
        address doctor;
        string cedula;
        string nombres;
        string apellidos;
    }

    mapping(uint => Paciente) public pacientes;
    constructor(){
        pacienteId = 0;
        pacientes[pacienteId] = (Paciente(0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3, '1312960444', 'Michael', 'Frederick'));
        pacienteId++;
        pacientes[pacienteId] = (Paciente(0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3, '1705471223', 'Winka', 'Rea'));
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
