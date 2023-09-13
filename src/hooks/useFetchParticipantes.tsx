import { useQuery } from "react-query";

export interface TipoParticipanteInterface {
    TIPO_PARTICIPANTE: string;
}

const fetchParticipantes = async () => {
    //@ts-ignore
    const response = await fetch(`${config?.baseUrl}/api/GetParticipantesConstanciasInternas`)
    const data = await response.json()
    return data

}
export default function useFetchParticipantes() {
    return useQuery<TipoParticipanteInterface[], Error>({ queryKey: ['TipoParticipante'], queryFn: fetchParticipantes })
}

