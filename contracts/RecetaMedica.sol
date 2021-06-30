// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract RecetaMedica{

    uint public pacienteId;
    struct Paciente{
        address doctor;
        string cedula;
        string nombres;
        string apellidos;
    }

    //Paciente[] public pacientes;
    mapping(uint=>Paciente) public pacientes;
    constructor(){
        //pacientes.push(Paciente('1312960444','Michael','Frederick'));
        //pacientes.push(Paciente('1705471223','Winka','Rea'));
    }

    // function totalPacientes() public view returns(uint){
    //  return pacientes.length;
    // }

    function registrarPaciente(
        address _doctor,
        string memory _cedula,
        string memory _nombre,
        string memory _apellido) public{

        pacienteId++;

        pacientes[pacienteId]=Paciente(_doctor,_cedula,_nombre,_apellido);
    }



}
