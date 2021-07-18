import RecetaMedicaContract from '../artifacts/RecetaMedica.json'

import contract from '@truffle/contract';

const RecetaMedicaInstancia = async (provider) => {
    const receta = contract(RecetaMedicaContract);
    receta.setProvider(provider);
    let instancia = await receta.deployed();
    return instancia;
}
export default RecetaMedicaInstancia;
