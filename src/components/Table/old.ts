   // useEffect(() => {
    //     let dataTableInstanceRef: DataTables.Api | null = null;
    //     const initializeDataTable = () => {
    //         if (tableRef.current) {
    //             // Initialize DataTable only once
    //             //@ts-ignore
    //             dataTableInstanceRef = $(tableRef.current).DataTable({
    //                 dom: '<"top top-grey"<"dataTables_actions"f>> <t> <"bottom mt-2 d-flex align-items-center justify-content-between flex-wrap"<"d-flex" il>p>',
    //                 scrollY: "40vh",
    //                 scrollX: true,
    //                 lengthMenu: [[20, 30, 50, -1], [20, 30, 50, "Todas"]],
    //                 columnDefs: [
    //                     { "orderable": false, "targets": 0 },
    //                     { "width": "20px", "targets": 0 }
    //                 ],
    //                 aaSorting: [],
    //                 destroy: true,

    //                 // Add more options here as needed
    //             });
    //         }
    //         initializeDataTable();
    //     };





    //     return () => {
    //         // Clean up by destroying the DataTable instance
    //         if (dataTableInstanceRef) {
    //             dataTableInstanceRef.destroy();
    //         }
    //     };
    // }, [init])
