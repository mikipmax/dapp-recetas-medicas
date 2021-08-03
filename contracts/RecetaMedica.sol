// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract RecetaMedica {

    //************************** Estructuras que simulan los actores de las prescripciones médicas *********************

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

    struct Receta {
        Medico medico;
        Paciente paciente;
        string diagnostico;
        string indicacionesExtras;
        Medicina[] medicinas;
        uint fecha;
        uint fechaCaducidad;
        address tokenMedico;
    }

    //****** Arreglos de tipo Map en donde se almacena la información en el proceso de preescripciones médicas *********

    mapping(address => Medico) public medicos;

    mapping(address => Paciente) public pacientes;

    mapping(address => Receta)  private recetaTemporal;

    mapping(address => Receta[]) public recetasPorDoctor;
    mapping(address => uint) public recetasTotalesPorDoctor;

    mapping(address => Receta[]) public recetasPorPaciente;
    mapping(address => uint) public recetasTotalesPorPaciente;

    mapping(address => Paciente[]) public pacientesPorDoctor;
    mapping(address => uint) public pacientesTotalesPorDoctor;

    //************ Evento que reacciona al momento de registrar una receta para cualesquier paciente *******************

    event RecetaRegistrada(string nombresMedico, string apellidosMedico, address cuentaPaciente);

    //************************ Constructor del contrato que establece médicos predeterminados **************************

    constructor(){
        //Doctores pre-existentes
        medicos[0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3] = Medico("11111111", "Patricio", "Estrella", "General");
        medicos[0xF5B223A069ebfDc5D491b94fB50C8be0B063CB65] = Medico("22222222", "Bob", "Sponja", "General");
    }

    //****************** Funciones que contienen la lógica del proceso de preescripciones médicas **********************

    function registrarPaciente(
        Paciente memory _paciente
    ) public {
        bool existe = false;
        for (uint i = 0; i < pacientesTotalesPorDoctor[msg.sender]; i++) {
            //Se valida en caso de que el paciente tenga ya un address asociado
            //además, se emplea && ya que, puede darse el caso en que, la cédula de un _paciente
            // ya se ha registrado pero aun no tiene cuenta en la red.
            if (pacientesPorDoctor[msg.sender][i].cuentaPaciente == _paciente.cuentaPaciente
                && keccak256(abi.encodePacked(pacientesPorDoctor[msg.sender][i].cedula)) ==
                keccak256(abi.encodePacked(_paciente.cedula))) {
                existe = true;
                break;
            }

        }
        require(!existe, 'El paciente ya ha sido registrado en su cuenta');
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
        Medicina[] memory _medicinas,
        uint _fechaCaducidad
    ) public {
        //Dado que, recetaTemporal es variable global se va acumulando por eso se la vacía por cada registro ya que son indep
        for (uint j = 0; j < _medicinas.length; j++) {
            delete recetaTemporal[msg.sender];
        }
        recetaTemporal[msg.sender].tokenMedico = msg.sender;
        recetaTemporal[msg.sender].medico = _medico;
        recetaTemporal[msg.sender].paciente = _paciente;
        recetaTemporal[msg.sender].diagnostico = _diagnostico;
        recetaTemporal[msg.sender].indicacionesExtras = _indicacionesExtras;
        recetaTemporal[msg.sender].fecha = block.timestamp;
        recetaTemporal[msg.sender].fechaCaducidad = _fechaCaducidad;
        for (uint j = 0; j < _medicinas.length; j++) {
            recetaTemporal[msg.sender].medicinas.push(Medicina(_medicinas[j].nombreMedicina, _medicinas[j].indicacion));
        }
        recetasPorDoctor[msg.sender].push(recetaTemporal[msg.sender]);
        recetasTotalesPorDoctor[msg.sender]++;

        if (_paciente.cuentaPaciente != address(0)) {
            recetasPorPaciente[_paciente.cuentaPaciente].push(recetaTemporal[msg.sender]);
            recetasTotalesPorPaciente[_paciente.cuentaPaciente]++;
            emit RecetaRegistrada(_medico.nombres, _medico.apellidos, _paciente.cuentaPaciente);
        }

    }

    function getRecetasPorDoctor(address cuentaDoctor, uint i)
    public view returns (Receta memory) {
        return (recetasPorDoctor[cuentaDoctor][i]);
    }

    function getRecetasPorPaciente(address cuentaPaciente, uint i)
    public view returns (Receta memory) {
        return (recetasPorPaciente[cuentaPaciente][i]);
    }

}
