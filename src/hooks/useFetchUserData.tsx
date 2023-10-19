import { useQuery } from "react-query";

export interface fetchUserDataInterface {
	name: string;
	rut: string;
	guion: string;
	otro: string;
	preferencias: string;
	sesion: string;
	cod_firmante: string;
}

const fetchUserData = async () => {
	//@ts-ignorets-ignore
	const response = await fetch(`${config?.baseUrl}/api/userdata`);
	const data = await response.json();
	return data;
};
export default function useFetchUserData() {
	return useQuery<fetchUserDataInterface, Error>({
		queryKey: ["fetchUserDataInterface"],
		queryFn: fetchUserData,
	});
}
