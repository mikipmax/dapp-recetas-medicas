// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RecetaMedica {

    //************************** Sección de Estructuras requeridas para el proceso de las prescripciones médicas *********************
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
        string celular;
        uint8 edad;
    }

    struct Farmaceutico {
        string ruc;
        string nombreComercial;
    }

    struct Receta {
        uint id;
        Medico medico;
        Paciente paciente;
        string diagnostico;
        string indicacionesExtras;
        Medicina[] medicinas;
        uint fecha;
        uint fechaCaducidad;
        address tokenMedico;
        bool isDespachado;
    }

    //****** Variables de estado que almacenan la información en el proceso de preescripciones médicas ******************
    Receta private receta;
    Receta[] private recetas;
    mapping(address => Medico) public medicos;
    mapping(address => Paciente) public pacientes;
    mapping(address => bool) private cuentaMedicoAsociada;
    mapping(address => bool) private cuentaFarmaciaAsociada;
    mapping(address => Paciente[]) public pacientesPorDoctor;
    mapping(address => uint) public pacientesTotalesPorDoctor;
    mapping(address => Farmaceutico) public farmaceuticos;

    //************ Evento que reacciona al momento de registrar o eliminar una receta para cualesquier paciente *******************
    event AccionReceta(address cuenta);

    //************************ Constructor del contrato que establece datos predeterminados **************************
    constructor(){
        //Doctores pre-existentes
        medicos[0x23174599ea38783d0752bD3d8D6CD79F6602aa3F] = Medico("15-0152498453", "Oscar Reynaldo", "Perez", "General");
        cuentaMedicoAsociada[0x23174599ea38783d0752bD3d8D6CD79F6602aa3F] = true;
        medicos[0x4CFF6aa4900bbD5f1E44CbA20bCf64DFaCd7cb3D] = Medico("21-5451254484", "Silvie Alejandra", "Cevallos", unicode"Traumatólogo");
        cuentaMedicoAsociada[0x4CFF6aa4900bbD5f1E44CbA20bCf64DFaCd7cb3D] = true;
        //Farmacéuticos pre-existentes
        farmaceuticos[0x8a7FE52D88ce383cd99b83BE0b9cCa8E9D788Cc4] = Farmaceutico("123456789101112", "Cruz Azul");
        cuentaFarmaciaAsociada[0x8a7FE52D88ce383cd99b83BE0b9cCa8E9D788Cc4] = true;
    }

    // ********************************** Modificadores de acceso personalizados ****************************************
    modifier isMedico (){
        require(cuentaMedicoAsociada[msg.sender]);
        _;
    }
    modifier isFarmaceutico (){
        require(cuentaFarmaciaAsociada[msg.sender]);
        _;
    }

    //****************** Funciones que contienen la lógica del proceso de preescripciones médicas **********************
    function registrarPaciente(
        Paciente memory _paciente
    ) public isMedico {
        for (uint i = 0; i < pacientesTotalesPorDoctor[msg.sender]; i++) {
            require(!(pacientesPorDoctor[msg.sender][i].cuentaPaciente == _paciente.cuentaPaciente
            && keccak256(abi.encodePacked(pacientesPorDoctor[msg.sender][i].cedula)) ==
            keccak256(abi.encodePacked(_paciente.cedula))), 'El paciente ya ha sido registrado en su cuenta');
        }

        if (_paciente.cuentaPaciente != address(0)) {
            pacientes[_paciente.cuentaPaciente] = _paciente;
        }

        pacientesPorDoctor[msg.sender].push(_paciente);
        pacientesTotalesPorDoctor[msg.sender] ++;
    }

    function registrarReceta(
        Receta memory _receta) public isMedico
    {
        receta.id = recetas.length;
        receta.tokenMedico = msg.sender;
        receta.medico = _receta.medico;
        receta.paciente = _receta.paciente;
        receta.diagnostico = _receta.diagnostico;
        receta.indicacionesExtras = _receta.indicacionesExtras;
        receta.fecha = block.timestamp;
        receta.fechaCaducidad = _receta.fechaCaducidad;
        delete receta.medicinas;
        for (uint j = 0; j < _receta.medicinas.length; j++) {
            receta.medicinas.push(_receta.medicinas[j]);
        }
        recetas.push(receta);

        emit AccionReceta(msg.sender);
    }

    function getRecetas(address cuenta)
    public view returns (Receta[] memory) {

        if (cuentaFarmaciaAsociada[cuenta]) {
            return recetas;
        }

        Receta[] memory recetasAux = new Receta[](recetas.length);
        uint contador = 0;
        for (uint i = 0; i < recetas.length; i++) {
            if (cuentaMedicoAsociada[cuenta] ? recetas[i].tokenMedico == cuenta :
                recetas[i].paciente.cuentaPaciente == cuenta) {
                recetasAux[contador] = recetas[i];
                contador++;
            }
        }
        return recetasAux;
    }

    function eliminarReceta(uint idReceta) public isMedico {
        delete recetas[idReceta];
        emit AccionReceta(msg.sender);
    }

    function despacharReceta(uint idReceta) public isFarmaceutico {
        if (recetas[idReceta].fechaCaducidad - block.timestamp > 0) {
            recetas[idReceta].isDespachado = true;
            emit AccionReceta(msg.sender);
        }
    }

}
