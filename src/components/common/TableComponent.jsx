import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const TableComponent = ({
  rows,
  columns,
  paginationModel = { pageSize: 5, page: 0 },
  checkboxSelection = false,
}) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "green", // Header background color (blue)
            color: "black", // Header text color (white)
            fontWeight: "bold", // Optional: bold text
            fontSize: 14, // Optional: text size
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none", // Optional: hide vertical separators
          },
        }}
        disableColumnFilter
        disableColumnMenu
      />
    </Paper>
  );
};

export default TableComponent;
