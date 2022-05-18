import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

const columns = [
  { field: "first_name", headerName: "First name", flex: 1, minWidth: 150 },
  { field: "last_name", headerName: "Last name", flex: 1, minWidth: 150 },
  { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
  { field: "birthday", headerName: "Birthday", flex: 1, minWidth: 150 },
  { field: "country", headerName: "Country", flex: 1, minWidth: 150 },
];

const GridComponent = ({ parseDatafn, openPopup }) => {
  const data = parseDatafn();
  return (
    <Box style={{ height: data.length ? 350 : 150 }}>
      <Box style={{ display: "flex", height: "100%" }}>
        <DataGrid
          hideFooterSelectedRowCount={true}
          rows={data}
          columns={columns}
          sx={{
            margin: 2,
            "& .MuiDataGrid-cell:hover": {
              cursor: "pointer",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row.Mui-selected": {
              background: "transparent",
            },
          }}
          onCellClick={(e) => {
            openPopup(e.row);
          }}
        />
      </Box>
    </Box>
  );
};

export default GridComponent;
