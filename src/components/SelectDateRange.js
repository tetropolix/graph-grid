import { Alert, Box } from "@mui/material";
import React from "react";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const style = { margin: "7px" };
const SelectDateRange = ({ handleDateTill, handleDateFrom, dateRange }) => {
  const { from, till } = dateRange;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 300,
        maxWidth: 350,
      }}
    >
      <DesktopDatePicker
        label="Birthday from"
        inputFormat="MM/dd/yyyy"
        value={from}
        onChange={handleDateFrom}
        renderInput={(params) => <TextField sx={style} {...params} />}
      />
      <DesktopDatePicker
        label="Birthday till"
        inputFormat="MM/dd/yyyy"
        value={till}
        onChange={handleDateTill}
        renderInput={(params) => <TextField sx={style} {...params} />}
      />
      {from && till && from.getTime() > till.getTime() && (
        <Alert sx={style} severity="warning">
          {`Chart won't show any data, range from > range till !`}
        </Alert>
      )}
    </Box>
  );
};

export default SelectDateRange;
