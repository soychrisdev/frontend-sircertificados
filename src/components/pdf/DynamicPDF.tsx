
import {
	Document,
	Image,
	Page,
	StyleSheet,
	Text,
	View
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "white",
	},
	center: {
		textAlign: "center",
	},
	textSM: {
		fontSize: 8,
	},
	textMD: {
		fontSize: 10,
		fontWeight: "bold",
	},
	textTitle: {
		fontSize: 12,
		fontWeight: "bold",
	},

	textLG: {
		fontSize: 12,
	},
	textBold: {
		fontWeight: "bold",
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
		fontWeight: "bold",
	},
});
// rome-ignore lint/suspicious/noExplicitAny: <explanation>
type DynamicPDFProps = React.PropsWithChildren<{ data: any[] }>;

export default function DynamicPDF(props: DynamicPDFProps) {
	const { data } = props;

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<View style={styles.header}>
					<View>
						<Image source={"../../../INACAP_LOGO.png"} />
					</View>
				</View>
				{data?.map((elem) => (
					<View style={styles.body}>
						<View style={styles.center}>
							<Text style={styles.textTitle}>
								CONSTANCIA DE PARTICIPACIÓN{" "}
								{elem?.PVCM_TTIPO_BENEFICIARIO === "DOCENTE" && "DOCENTES"}
								{elem?.PVCM_TTIPO_BENEFICIARIO === "ADMINISTRATIVO" &&
									"ADMINISTRATIVOS"}
								{elem?.PVCM_TTIPO_BENEFICIARIO === "ALUMNO" && "ESTUDIANTES"} EN
								VCMI
							</Text>
							{/* <Text style={styles.textTitle}>{JSON.stringify(elem)}</Text> */}

							<View style={styles.spacer} />
							<View>
								<Text style={styles.textMD}>
									Se extiende la presente constancia de participación en
									acciones de vinculación con el medio e Innovación a:
								</Text>
							</View>
							<View style={styles.spacer} />

							<View>
								<Text style={styles.textMD}>{elem?.NOMBRE_COMPLETO}</Text>
							</View>
							<View style={styles.spacer} />
							<View>
								<Text style={styles.textMD}>
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ADMINISTRATIVO" &&
										`Administrativo de la Sede ${elem?.SEDE_ACCION}.`}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "DOCENTE" &&
										`Docente del área académica Administración, de la Sede ${elem?.SEDE_ACCION}.`}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ALUMNO" &&
										`Estudiante del área académica Administración, de la Sede ${elem?.SEDE_ACCION}.`}
								</Text>
							</View>
							<View style={styles.spacer} />
							<View>
								<Text style={styles.textMD}>
									A continuación, se detalla acciones en las cuales el{" "}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "DOCENTE" && "docente"}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ADMINISTRATIVO" &&
										"administrativo"}{" "}
									{elem?.PVCM_TTIPO_BENEFICIARIO === "ALUMNO" && "estudiante"}ha
									participado:
								</Text>
							</View>
						</View>
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
							</View>
						</View>
						{/* add style to align items to bottom of page */}
						<View style={styles.center}>
							<View style={styles.spacer} />
							<View>
								<Text style={styles.textMD}>{elem?.DIRECTOR_VCM}</Text>
							</View>
							<View style={styles.spacer} />
							<View>
								<Text style={styles.textMD}>
									Director (a) Vinculación con el Medio e Innovación
								</Text>
							</View>
							<View>
								<Text style={styles.textMD}>
									Fecha de emision: {elem?.FECHA_EMISION?.substring(0, 10)}
								</Text>
							</View>
						</View>
					</View>
				))}
				<View style={styles.footer}>
					<View>
						<Image source={"../../../INACAP_FOOTER.png"} />
					</View>
				</View>
			</Page>
		</Document>
	);
}
