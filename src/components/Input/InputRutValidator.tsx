import { ChangeEvent } from "react";
import { useAppStore } from "../../store/store";
import { formatRut, validateRut } from "../../utils/RutValidator";

export default function InputRutValidator() {
    const { rut, setRut } = useAppStore((state) => state);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setRut(
            formatRut(event.target.value, false)

        ); // provide a default value for rut
    };
    return (
        <>
            <input
                type="text"
                name="rut"
                id="rut"
                className="form-control mb-0 editar-focus"
                placeholder="Ingrese RUT empleado"
                onChange={handleChange}
                value={
                    rut || "" // provide a default value for rut
                }
            />
            <label htmlFor="rut" className="active">
                RUT (*)
            </label>
            {!validateRut(rut || "") && (
                <div className="c-requerido">*Este campo es requerido</div>
            )}
        </>
    );
}
