import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useRef } from "react";
import { useAppStore } from "../../store/store";
import { MESSAGES } from "../../utils/types";
import CheckBox from "../checkbox/CheckBox";

import { Link } from "react-router-dom";
import { useDebounce } from "usehooks-ts";
import useEmitirCertificado from "../../hooks/useEmitirCertificado";
import useFetchUserData from "../../hooks/useFetchUserData";
import LoadingOverlayComponent from "../LoadingOverlay/LoadingOverlay";

interface TanStackTableProps {
    data: [];
    isLoading: boolean;
    isSuccess: boolean;
}

export default function TanStackTable({ data, isSuccess }: TanStackTableProps) {
    const tableRef = useRef();
    const [rowSelection, setRowSelection] = React.useState({});
    const columnHelper = createColumnHelper();
    const { data: userData } = useFetchUserData();
    const { mutate: emitir, isLoading: isLoadingEmitir } = useEmitirCertificado();

    const columnDefWithCheckBox = React.useMemo(
        () => [
            {
                id: "select",
                header: ({ table }) => (
                    <CheckBox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                            rest: null,
                        }}
                    />
                ),
                cell: ({ row }) => (
                    <>
                        <CheckBox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                                rest: null,
                            }}
                        />
                    </>
                ),
            },
            // rome-ignore lint/suspicious/noExplicitAny: <explanation>
            columnHelper.accessor((row: any) => row.PLAN_NCORR, {
                id: "PLAN_NCORR",
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                cell: (row: any) => row.getValue(),
                header: "Número Prog.",
            }),
            {
                // accessorFn: (row) => `${row.PVCM_NRUT_PERSONA}`,
                accessorKey: "PROG_TNOMBRE",
                header: "Programa ",
            },
            {
                // accessorFn: (row) => `${row.PVCM_NRUT_PERSONA}`,
                accessorKey: "INICIATIVA",
                header: "Iniciativa",
            },
            {
                // accessorFn: (row) => `${row.PVCM_NRUT_PERSONA}`,
                accessorKey: "PVCM_TROL_DOCENTE",
                header: "Rol docente",
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                cell: ({ row }: any) => (
                    <>
                        {row.original.PVCM_TROL_DOCENTE !== null ? (
                            <span>{row.original.PVCM_TROL_DOCENTE}</span>
                        ) : (
                            <span>No tiene rol docente</span>
                        )}
                    </>
                ),
            },
            {
                accessorKey: "ACCION",
                header: "Acción / Nombre",
            },
            {
                accessorKey: "PVCM_NRUT_PERSONA",
                header: "Rut Persona",
            },
            {
                accessorKey: "PVCM_TNOMBRE_PERSONA",
                header: "Nombre persona",
            },
            {
                accessorKey: "PLAN_FINICIO",
                header: "Fecha de inicio",
            },
            {
                accessorKey: "PLAN_FTERMINO",
                header: "Fecha de termino",
            },
            {
                accessorKey: "EMCE_NCORR",
                header: "CERTIFICADO?",
                // rome-ignore lint/suspicious/noExplicitAny: <explanation>
                cell: ({ row }: any) => (
                    <>
                        {row.original.EMCE_NCORR !== null ? (
                            // <button  onClick={() => handleVerPDF({
                            //     i_rut: row.original.PVCM_NRUT_PERSONA,
                            //     i_tpart: row.original.PVCM_TTIPO_BENEFICIARIO,
                            //     i_seun_ccod: row.original.SEUN_NCORR_GESTOR,
                            // })} >Ver {JSON.stringify(row.original.EMCE_NCORR)}
                            // </button>
                            <Link
                                to={`/GESTION/${row.original.PVCM_NRUT_PERSONA}/${row.original.PVCM_TTIPO_BENEFICIARIO}/${row.original.SEUN_NCORR_GESTOR}`}
                                state={row.original}
                                className="btn btn-default waves-effect waves-light"
                            >
                                Ver PDF {JSON.stringify(row.original.EMCE_NCORR)}
                            </Link>
                        ) : (
                            <span>No emitido</span>
                        )}
                    </>
                ),
            },
        ],
        [],
    );

    const { setRowSelection: setRowSelectionStored, rowSelection: rowSelected } =
        useAppStore((state) => state);

    const debouncedValue = useDebounce<{}>(data, 500);

    const tableInstance = useReactTable({
        columns: columnDefWithCheckBox,
        data: data,
        getCoreRowModel: getCoreRowModel(),
        state: {
            rowSelection: rowSelection,
        },
        onRowSelectionChange: setRowSelection,
        getFilteredRowModel: getFilteredRowModel(),
        enableRowSelection: true,
    });

    useEffect(() => {
        if (data) {
            setRowSelectionStored(
                tableInstance.getSelectedRowModel().flatRows.map((el) => el.original),
            );
        }
    }, [rowSelection]);

    useEffect(() => {
        //@ts-ignore
        let dataTableInstanceRef: DataTables.Api | null = null;

        if (data) {
            const initializeDataTable = () => {
                if (tableRef.current) {
                    //@ts-ignore
                    dataTableInstanceRef = $(tableRef.current).DataTable({
                        dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
                        scrollY: "60vh",
                        scrollX: true,
                        lengthMenu: [
                            [20, 30, 40, -1],
                            [20, 30, 40, "Todas"],
                        ],
                        aaSorting: [],
                        destroy: true,
                    });
                }
            };
            initializeDataTable();
        }

        return () => {
            // Clean up by destroying the DataTable instance
            if (dataTableInstanceRef) {
                dataTableInstanceRef.destroy();
            }
        };
    }, [debouncedValue, emitir]);

    type FormattedValue = {
        i_plan_ncorr: number;
        i_tipo_cert: number;
        i_pvcm_ncorr: number;
        i_audi_tusuario: number;
        i_cod_firmante: number | undefined;
    };

    const handleSubmit = (value: FormattedValue[]) => {
        const formatedValues = value.map((value) => {
            return {
                i_plan_ncorr: value.i_plan_ncorr,
                i_tipo_cert: value.i_tipo_cert,
                i_pvcm_ncorr: value.i_pvcm_ncorr,
                i_audi_tusuario: value.i_audi_tusuario,
                i_cod_firmante: userData?.cod_firmante,
            };
        });
        //@ts-ignore
        emitir(formatedValues);
    };

    if (!isSuccess || !data || !Array.isArray(data))
        return <span>{MESSAGES.ERROR_RESULTADOS_CONSTANCIA}</span>;

    return (
        <div>
            {isLoadingEmitir && <LoadingOverlayComponent />}
            <div>
                <table
                    //@ts-ignore
                    ref={isSuccess ? tableRef : ""}
                    className="datatables table table-hover table-striped table-bordered m-0"
                >
                    <thead>
                        {tableInstance.getHeaderGroups().map((headerEl) => {
                            return (
                                <tr key={headerEl.id}>
                                    {headerEl.headers.map((columnEl) => {
                                        return (
                                            <th key={columnEl.id} colSpan={columnEl.colSpan}>
                                                {columnEl.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        columnEl.column.columnDef.header,
                                                        columnEl.getContext(),
                                                    )}
                                            </th>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </thead>
                    <tbody>
                        {tableInstance.getRowModel().rows.map((rowEl) => {
                            return (
                                <tr key={rowEl.id}>
                                    {rowEl.getVisibleCells().map((cellEl) => {
                                        return (
                                            <td className="text-nowrap" key={cellEl.id}>
                                                {flexRender(
                                                    cellEl.column.columnDef.cell,
                                                    cellEl.getContext(),
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="card-footer">
                <div className="row mt-4">
                    <div className="col d-flex justify-content-end">
                        {data?.length > 0 && (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-default waves-effect waves-light"
                                    onClick={() => handleSubmit(rowSelected)}
                                >
                                    Emitir Constancia
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
