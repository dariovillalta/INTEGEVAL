import React from 'react';

import Accordion from '../Accordion/Accordion.js';
import Celda from './Celda.js';

export default function FilasCeldas(props) {
    return (
        <div >
            {props.categoriasVariables.map((categoriaVariables, i) => (
                <div key={categoriaVariables.nombre}>
                    <Accordion showTrash={false} showEdit={false}>
                        {categoriaVariables.variables.map((variable, j) => (
                            <div label={variable.nombre}>
                                {categoriaVariables.variables.map((variable, j) =>
                                    <Celda seleccionVariable={props.seleccionVariable} variable={variable} key={i+j}>{variable.nombre}</Celda>
                                )}
                            </div>
                        ))}
                    </Accordion>
                    <br/>
                </div>
            ))}
        </div>
    );
}
