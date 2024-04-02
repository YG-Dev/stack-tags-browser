import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { TagItems } from "./HomePage";

function TagsSortableTable(tagItems: TagItems) {

    const tableColumns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'count', headerName: 'Count', width: 90 },
        { field: 'name', headerName: 'Name', width: 160 },
        {
            field: 'hasSynonyms',
            headerName: 'Has Synonyms',
            type: 'boolean',
            width: 150,
        },
        {
            field: 'isModeratorOnly',
            headerName: 'Is moderator only',
            type: 'boolean',
            width: 160,
        },
        {
            field: 'isRequired',
            headerName: 'Is required',
            type: 'boolean',
            width: 120,
        },
    ];
    
    const tableRows = tagItems.items.map((item, index) => {
        return {
            id: index,
            count: item.count,
            name: item.name,
            hasSynonyms: item.has_synonyms,
            isModeratorOnly: item.is_moderator_only,
            isRequired: item.is_required
        };
    })

    return (
        <div style={{ width: '100%' }}>
          <DataGrid
            rows={tableRows}
            columns={tableColumns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            disableColumnMenu
            autoHeight
          />
        </div>
      );
}

export default TagsSortableTable;