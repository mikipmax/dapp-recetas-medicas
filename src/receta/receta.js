import RecetaMedicaContract from '../../build/contracts/RecetaMedica.json'
import contract from '@truffle/contract';

export default async (provider) => {
    const receta = contract(RecetaMedicaContract);
    receta.setProvider(provider);
    let instancia = await receta.deployed();
    return instancia;
}
