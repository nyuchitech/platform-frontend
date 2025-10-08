/**
 * 🇿🇼 Nyuchi Platform - Data Table Component
 * "I am because we are" - MUI DataGrid wrapper
 */

import React from 'react';
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

interface DataTableProps extends Omit<DataGridProps, 'columns'> {
  /** Table columns */
  columns: GridColDef[];
  /** Show paper wrapper (default: true) */
  showPaper?: boolean;
}

/**
 * Data table component using MUI X DataGrid
 * Styled with Zimbabwe theme
 */
export function DataTable({
  columns,
  rows,
  showPaper = true,
  ...props
}: DataTableProps) {
  const table = (
    <DataGrid
      columns={columns}
      rows={rows}
      autoHeight
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 50, 100]}
      initialState={{
        pagination: {
          paginationModel: { pageSize: 25, page: 0 },
        },
      }}
      sx={{
        border: 'none',
        '& .MuiDataGrid-cell:focus': {
          outline: 'none',
        },
        '& .MuiDataGrid-row:hover': {
          cursor: 'pointer',
        },
        ...props.sx,
      }}
      {...props}
    />
  );

  if (showPaper) {
    return (
      <Paper
        sx={{
          width: '100%',
          padding: 2,
        }}
      >
        {table}
      </Paper>
    );
  }

  return <Box sx={{ width: '100%' }}>{table}</Box>;
}
