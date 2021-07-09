import {useEffect, useState} from "react"

const Medicinas = () => {
    const [recetas, setRecetas] = useState([])
    useEffect(() => {
        fetch("medicinas.json")
            .then(response => response.json())
            .then(datos => {
                setRecetas(datos)
            })
    }, [])
return  (		<div className="container mt-5" align="center">

    <h4>Lista de Postres</h4>

    <div className="row">

        <div className="col-md-12">

            <table className="table table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Medicina</th>
                    <th scope="col">Descripcion</th>
                </tr>
                </thead>
                <tbody>

                {recetas.map(item => (

                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.medicina}</td>
                        <td>{item.descripcion}</td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    </div>


</div>);

}
export default Medicinas;