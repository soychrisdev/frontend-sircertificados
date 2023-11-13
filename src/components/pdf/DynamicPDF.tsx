
import {
	Document,
	Font,
	Image,
	Page,
	StyleSheet,
	Text,
	View
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
		fontFamily: "Roboto",
		fontWeight: "bold",
	},
	boldText: {
		fontSize: 10,
		fontWeight: "heavy",
	},
	center: {
		textAlign: "center",
	},
	textSM: {
		fontSize: 8,
	},
	textMD: {
		fontSize: 10,

	},
	textUsuario: {
		fontSize: 10,
		fontWeight: "heavy",
	},
	textTitle: {
		fontSize: 12,
		fontWeight: "heavy",
	},

	textLG: {
		fontSize: 12,
	},
	textBold: {
		fontSize: 10,
		fontWeight: "heavy",
	},
	header: {
		// backgroundColor: 'red',
		height: 80,
		alignItems: "center",
		justifyContent: "center",
	},
	body: {
		// backgroundColor: 'yellow',
		flexGrow: 1,
		color: "black",
		//center content to center page
		justifyContent: "center",


	},
	footer: {
		// backgroundColor: 'green',
		height: 50,
		alignItems: "center",
		justifyContent: "center",
	},
	spacer: {
		height: 10,
	},

	//table
	container: {
		padding: 10,
	},
	//make table responsive
	table: {
		// display: "table",
		width: "auto",
		borderStyle: "solid",
		borderWidth: 1,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		margin: "auto",
		flexDirection: "column",
		flexWrap: "wrap",
		justifyContent: "center",
		alignItems: "center",
	},
	tableRow: {
		margin: "auto",
		flexDirection: "row",
	},
	tableCol: {
		width: "15%",
		borderStyle: "solid",
		borderWidth: 1,
		borderLeftWidth: 0,
		borderTopWidth: 0,
	},
	tableCell: {
		margin: "auto",
		marginTop: 5,
		fontSize: 10,

	},
});
//@ts-ignore
type DynamicPDFProps = React.PropsWithChildren<{
	data: [{
		PVCM_TTIPO_BENEFICIARIO: string;
		NOMBRE_COMPLETO: string;
		SEDE_ACCION: string;
		ID_PLANIFICACION: string;
		PROGRAMA: string;
		INICIATIVA: string;
		ACCION: string;
		FECHA_INICIO: string;
		FECHA_TERMINO: string;
		DIRECTOR_VCM: string;
		FECHA_EMISION: string;
		AREA_ACADEMICA: string;

	}]
}>;

// Register font
Font.register({
	family: 'Roboto',
	fonts: [
		{
			src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmSU5vAx05IsDqlA.ttf',
		},
		{
			src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9vAx05IsDqlA.ttf',
			fontWeight: 700
		},
		{
			src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmYUtvAx05IsDqlA.ttf',
			fontWeight: 900
		},
	]
});
export default function DynamicPDF(props: DynamicPDFProps) {
	const { data } = props;

	return (
		<Document>
			{/* //@ts-ignore */}
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<View>
						<Image source={'https://raw.githubusercontent.com/soychrisdev/inacap-frontend-sircertificados/b705afc5e80d14b53110d0b2acdc237fed9240e6/public/INACAP_LOGO.png'} />
					</View>
				</View>
				{data?.map((elem, indice) => (
					<>
						{indice === 0 && <View style={styles.center}>
							<View style={styles.spacer} />
							<View style={styles.spacer} />
							<Text style={styles.textTitle}>
								CONSTANCIA DE PARTICIPACIÓN{" "}
								{elem?.PVCM_TTIPO_BENEFICIARIO === "DOCENTE" && "DOCENTES"}
								{elem?.PVCM_TTIPO_BENEFICIARIO === "ADMINISTRATIVO" &&
									"ADMINISTRATIVOS"}
								{elem?.PVCM_TTIPO_BENEFICIARIO === "ALUMNO" && "ESTUDIANTES"} EN
								VCMI
							</Text>
							<View style={styles.spacer} />
							<View style={styles.spacer} />
							<View style={styles.spacer} />

							<View>
								<Text style={styles.textMD}>
									Se extiende la presente constancia de participación en
									acciones de Vinculación con el Medio e Innovación a:
								</Text>
							</View>
							<View style={styles.spacer} />
							<View style={styles.spacer} />

							<View>
								<Text style={styles.textUsuario}>{elem?.NOMBRE_COMPLETO}</Text>
							</View>
							<View style={styles.spacer} />
							<View style={styles.spacer} />
							<View>
								<Text style={styles.textMD}>
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ADMINISTRATIVO" &&
										<Text>
											Administrativo de la Sede <Text style={styles.boldText}>{elem?.SEDE_ACCION}</Text>.
										</Text>
									}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "DOCENTE" &&
										<Text>
											Docente del <Text style={styles.boldText}>Instituto Profesional INACAP</Text>, de la Sede <Text style={styles.boldText}>{elem?.SEDE_ACCION}.</Text>
										</Text>
									}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ALUMNO" &&
										<Text>
											Estudiante del área académica <Text style={styles.boldText}>{elem?.AREA_ACADEMICA}</Text>, de la Sede <Text style={styles.boldText}>{elem?.SEDE_ACCION}.</Text>
										</Text>
									}
								</Text>
							</View>
							<View style={styles.spacer} />
							<View style={styles.spacer} />
							<View>
								<Text style={styles.textMD}>
									A continuación, se detalla acciones en las cuales el{" "}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "DOCENTE" && <Text style={styles.boldText}>docente</Text>}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ADMINISTRATIVO" &&
										<Text style={styles.boldText}>administrativo</Text>}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ALUMNO" &&
										<Text style={styles.boldText}>estudiante</Text>
									}{" "}ha
									participado:
								</Text>
							</View>
						</View>}

					</>
				))}


				<View style={styles.body}>
					<View style={styles.spacer} />
					<View style={styles.container}>
						<View style={styles.table}>
							<View style={styles.tableRow}>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>ID de planificación</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>Programa</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>Iniciativa</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>Acción</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>Fecha de inicio</Text>
								</View>
								<View style={styles.tableCol}>
									<Text style={styles.tableCell}>Fecha de termino</Text>
								</View>
							</View>
							{data?.map((elem) => (
								<View style={styles.tableRow}>
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>
											{elem?.ID_PLANIFICACION}
										</Text>
									</View>
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{elem?.PROGRAMA} </Text>
									</View>
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{elem?.INICIATIVA}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{elem?.ACCION}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{elem?.FECHA_INICIO}</Text>
									</View>
									<View style={styles.tableCol}>
										<Text style={styles.tableCell}>{elem?.FECHA_TERMINO}</Text>
									</View>
								</View>
							))}
						</View>
					</View>
					{/* add style to align items to bottom of page */}
				</View>




				{data?.map((elem, indice) => (
					<>
						{indice === 0 &&
							<View style={styles.center}>
								<View style={styles.spacer} />
								<View>
									<Text style={styles.textBold}>{elem?.DIRECTOR_VCM}</Text>
								</View>
								<View style={styles.spacer} />
								<View>
									<Text style={styles.textMD}>
										Director (a) Vinculación con el Medio e Innovación
									</Text>
								</View>
								<View style={styles.spacer} />
								<View>
									<Text style={styles.textBold}>
										Fecha de emision: {elem?.FECHA_EMISION?.substring(0, 10)}
									</Text>
								</View>
							</View>
						}
					</>
				))}

				<View style={styles.footer}>
					<View>
						<Image source={"https://raw.githubusercontent.com/soychrisdev/inacap-frontend-sircertificados/b705afc5e80d14b53110d0b2acdc237fed9240e6/public/INACAP_FOOTER.png"} />
					</View>
				</View>
			</Page>
		</Document>
	);
}
