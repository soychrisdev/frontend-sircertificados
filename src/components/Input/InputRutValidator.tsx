import React, { useEffect, useState, ChangeEvent } from 'react'
import { formatRut, validateRut } from '../../utils/RutValidator';
import { useAppStore } from '../../store/store';

import { useDebounce } from 'usehooks-ts'


export default function InputRutValidator() {
    const setRut = useAppStore(state => state.setRut);
    const rut = useAppStore(state => state.rut);

    const debouncedValue = useDebounce<string>(rut || "", 500)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setRut(event.target.value)
    }
    useEffect(() => {
        setRut(formatRut(rut || "", false));
    }, [debouncedValue]);
    return (
        <>
            <input type="text" name="buscar_campo_01" id="buscar_campo_01" className="form-control mb-0 editar-focus" placeholder="Ingrese RUT empleado"
                onChange={handleChange}
                value={
                    rut
                }
            />
            <label htmlFor="buscar_campo_01" className="active">RUT (*)</label>
            {!validateRut(rut) && <div className="c-requerido">
                *Este campo es requerido
            </div>}

        </>
    )
}
