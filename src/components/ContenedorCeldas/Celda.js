import React from 'react';

export default function Celda(props) {
    return (
        <table className="table table-striped table-bordered">
            <thead onClick={() => props.seleccionVariable(props.variable, props.posArregloPadre, props.posicionvariable) }>
                <tr>
                    <th scope="col">{props.variable.nombre}</th>
                </tr>
            </thead>
        </table>
    );
}
