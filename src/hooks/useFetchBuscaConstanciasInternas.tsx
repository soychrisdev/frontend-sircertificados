import { useMutation, useQuery, useQueryClient } from "react-query";

export interface ConstanciasBuscarInterface {
    i_rut: string | undefined;
    i_tpart: string | undefined;
    i_seun_ccod: string | undefined;
    i_anio: string | undefined;
}

const fetchBuscaConstanciasInternas = async (value) => {

    const searchParams = new URLSearchParams({
        i_rut: value.i_rut,
        i_tpart: value.i_tpart,
        i_seun_ccod: value.i_seun_ccod,
        i_anio: value.i_anio,

    })


    const response = await fetch(
        //@ts-ignore
        `${config?.baseUrl}api/BuscaConstanciasInternas`,
        {
            method: "POST",
            body: searchParams,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
        },
    );
    const data = await response.json()

    if (!response.ok) {
        throw new Error(JSON.stringify(data.Message))
    }

    console.log(data)

    return data

}
export default function useFetchBuscaConstanciasInternas() {
    const queryClient = useQueryClient();
    const { mutate: enviarForm, error, data, isLoading, isSuccess, isIdle } = useMutation(fetchBuscaConstanciasInternas, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(["BuscaConstanciasInternas"]);
            //@ts-ignore

            toastr.success("Constancia enviada correctamente.");

        },
        onError: (error) => {
            // If there was an error, revert the optimistic update
            //@ts-ignore
            toastr.error(error);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["BuscaConstanciasInternas"]);
        },
    });

    return {
        enviarForm,
        isLoading,
        data,
        error,
        isSuccess,
        isIdle
    };
}

