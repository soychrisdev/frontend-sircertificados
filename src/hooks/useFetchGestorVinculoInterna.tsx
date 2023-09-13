import { useQuery } from "react-query";

export interface GestorVinculoInternaInterface {
    SEUN_CCOD: number;
    SEUN_TNOMBRE: string;
}

const fetchGestorVinculoInterna = async () => {
    //@ts-ignore
    const response = await fetch(`${config?.baseUrl}/api/GetGestoresVinculoConstanciasInternas`)
    const data = await response.json()
    return data

}
export default function useFetchGestorVinculoInterna() {
    return useQuery<GestorVinculoInternaInterface[], Error>({ queryKey: ['GestorVinculoInterna'], queryFn: fetchGestorVinculoInterna })
}

