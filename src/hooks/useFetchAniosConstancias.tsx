import { useQuery } from "react-query";

export interface AniosConstanciasInterface {
    ANIO: string;
}

const fetchAniosConstancias = async () => {
    //@ts-ignorets-ignore
    const response = await fetch(`${config?.baseUrl}/api/GetAnosConstanciasInternas`)
    const data = await response.json()
    return data

}
export default function useFetchAniosConstancias() {
    return useQuery<AniosConstanciasInterface[], Error>({ queryKey: ['AniosConstancias'], queryFn: fetchAniosConstancias })
}

