import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import LoadingOverlayComponent from '../LoadingOverlay/LoadingOverlay';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel
} from '@tanstack/react-table'

import './table.css'
type TablaColums = {
    estado: string
    tipoConstancia: string
    rutPersona: string
    nombreCompleto: string
    telefono: string
    mail: string

}



export default function Table({ data, isLoading }) {
    const tableRef = useRef();
    const columnHelper = createColumnHelper<TablaColums>()
    const defaultdata: TablaColums[] = [
        {
            estado: 'Emitido',
            tipoConstancia: 'Participación Interna',
            rutPersona: '20141369-9',
            nombreCompleto: 'Juan Perez',
            telefono: '+569 9 12324567',
            mail: 'test1@gmail.com'
        },
        {
            estado: 'Emitido',
            tipoConstancia: 'Participación Externa',
            rutPersona: '12345678-9',
            nombreCompleto: 'David Figueroa',
            telefono: '+569 9 1234567',
            mail: 'test@gmail.com'
        },
    ]
    const [init, setInit] = useState(false)
    const [data, setData] = useState(() => [...defaultdata])
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])

    //sorting and show columns 


    const columns = [
        columnHelper.accessor('estado', {
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('tipoConstancia', {
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('rutPersona', {
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('nombreCompleto', {
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('telefono', {
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('mail', {
            cell: info => info.getValue(),
        }),
        //add select column to check row selected




    ]

    useEffect(() => {
        setTimeout(() => {

            setInit(true)
        }, 3000);
    }, [init])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    })

    if (!init) return <LoadingOverlayComponent />

    return (
        <table id="TablaResultados" className="table table-hover table-striped table-bordered m-0">
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[header.column.getIsSorted() as string] ?? null}
                                        </div>
                                    )}
                                </th>
                            )
                        })}
                    </tr>
                ))}

            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}


            </tbody>
        </table>
    )
}
