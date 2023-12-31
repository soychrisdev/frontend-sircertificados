import { StateCreator } from "zustand";
export interface DataSlice {
	rut: string | undefined;
	tipoParticipante: string | undefined;
	gestor: string | undefined;
	anio: string | undefined;
	dataResultadoConstancia: [] | undefined;
	rowSelection: {} | any;
	setRowSelection: (value: {}) => void;
	setDataResultadoConstancia: (value: []) => void;
	setRut: (value: string) => void;
	setTipoParticipante: (value: string) => void;
	setGestor: (value: string) => void;
	setAnio: (value: string) => void;
}
export const createDataSlice: StateCreator<DataSlice> = (set) => ({
	rut: undefined,
	tipoParticipante: undefined,
	gestor: undefined,
	anio: undefined,
	dataResultadoConstancia: undefined,
	rowSelection: {},
	//set rowSelection with spread value prev value
	setRowSelection: (...value) => set({ rowSelection: value }),
	// setRowSelection: (value) => set({ rowSelection: value }),
	setDataResultadoConstancia: (value) =>
		set({ dataResultadoConstancia: value }),
	setRut: (value) => set({ rut: value }),
	setTipoParticipante: (value) => set({ tipoParticipante: value }),
	setGestor: (value) => set({ gestor: value }),
	setAnio: (value) => set({ anio: value }),
});
