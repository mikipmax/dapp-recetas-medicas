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

    //****** Arreglos de tipo Map en donde se almacena la información en el proceso de preescripciones médicas *********

    mapping(address => Medico) public medicos;

    mapping(address => Paciente) public pacientes;

    Receta[] private recetas;

    mapping(address => Paciente[]) public pacientesPorDoctor;
    mapping(address => uint) public pacientesTotalesPorDoctor;

    mapping(address => Farmaceutico) public farmaceuticos;
    //************ Evento que reacciona al momento de registrar o eliminar una receta para cualesquier paciente *******************

    event AccionReceta(address cuenta);

    //************************ Constructor del contrato que establece datos predeterminados **************************

    constructor(){
        //Doctores pre-existentes
        medicos[0x0DF3c5E1e60A27f02D9d0FF8730c99A73D924Fc3] = Medico("15-0152498453", "Oscar Reynaldo", "Perez", "General");
        medicos[0xF5B223A069ebfDc5D491b94fB50C8be0B063CB65] = Medico("21-5451254484", "Silvie Alejandra", "Cevallos", unicode"Traumatólogo");
        //Farmacéuticos pre-existentes
        farmaceuticos[0x25fA2c9BE8c5653776398A0EAFcf5fC284F50c57] = Farmaceutico("123456789101112", "Cruz Azul");
    }

    //****************** Funciones que contienen la lógica del proceso de preescripciones médicas **********************

    function registrarPaciente(
        Paciente memory _paciente
    ) public {
        for (uint i = 0; i < pacientesTotalesPorDoctor[msg.sender]; i++) {
            //Se valida en caso de que el paciente tenga ya un address asociado
            //además, se emplea && ya que, puede darse el caso en que, la cédula de un _paciente
            // ya se ha registrado pero aun no tiene cuenta en la red.
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

    Receta private receta;

    function registrarReceta(
        Medico memory _medico,
        Paciente memory _paciente,
        string memory _diagnostico,
        string memory _indicacionesExtras,
        Medicina[] memory _medicinas,
        uint _fechaCaducidad) public
    {
        receta.id = recetas.length;
        receta.tokenMedico = msg.sender;
        receta.medico = _medico;
        receta.paciente = _paciente;
        receta.diagnostico = _diagnostico;
        receta.indicacionesExtras = _indicacionesExtras;
        receta.fecha = block.timestamp;
        receta.fechaCaducidad = _fechaCaducidad;
        delete receta.medicinas;
        for (uint j = 0; j < _medicinas.length; j++) {
            receta.medicinas.push(Medicina(_medicinas[j].nombreMedicina, _medicinas[j].indicacion));
        }
        recetas.push(receta);
        emit AccionReceta(msg.sender);
    }

    function getRecetas(address cuenta, bool isMedico)
    public view returns (Receta[] memory) {
        Receta[] memory recetasAux = new Receta[](recetas.length);
        uint contador = 0;
        for (uint i = 0; i < recetas.length; i++) {
            if (isMedico ? recetas[i].tokenMedico == cuenta :
                recetas[i].paciente.cuentaPaciente == cuenta) {
                recetasAux[contador] = recetas[i];
                contador++;
            }
        }
        //Eliminamos los indices que contienen recetas con valores vacios
        Receta[] memory recetas = new Receta[](contador);
        for (uint i = 0; i < contador; i++) {
            recetas[i] = recetasAux[i];
        }
        return recetas;
    }

    function getRecetasFarmaceutico(address cuentaFarmacia) public view returns (Receta[] memory){
        Receta[] memory recetasVacia;
        if (keccak256(abi.encodePacked(farmaceuticos[cuentaFarmacia].ruc))
            == keccak256(abi.encodePacked(""))) {
            return recetasVacia;
        }
        return recetas;
    }

    function eliminarReceta(uint idReceta) public {
        delete recetas[idReceta];
        emit AccionReceta(msg.sender);
    }

    function despacharReceta(uint idReceta) public {
        recetas[idReceta].isDespachado = true;
        emit AccionReceta(msg.sender);
    }

}
