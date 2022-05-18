import { useContext, useState } from "react";
import "rsuite/dist/rsuite.min.css";
import { Loader } from "rsuite";
import { DataContext } from "./context/DataContext";
import ChartComponent from "./components/ChartComponent";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import GridComponent from "./components/GridComponent";
import PopupForm from "./components/PopupForm";
import SelectDateRange from "./components/SelectDateRange";
import { Alert, Grid } from "@mui/material";
import { filterDataByDateRange, parseData } from "./utils/utilFunctions";

const App = () => {
  const { data, loading, setData, error } = useContext(DataContext);
  const [dateRange, setDateRange] = useState({ from: null, till: null });
  const [rowForPopup, setRowForPopup] = useState(null);

  const handleRowChange = (updatedRow) => {
    const updatedData = data.map((row) => {
      if (row.id === updatedRow.id) {
        return updatedRow;
      } else {
        return row;
      }
    });
    setData(updatedData);
  };
  const handleDateFrom = (value) => {
    setDateRange((prev) => ({ ...prev, from: value }));
  };
  const handleDateTill = (value) => {
    setDateRange((prev) => ({ ...prev, till: value }));
  };

  let toRender = (
    <>
      <Grid item xs={12} md={8}>
        <ChartComponent parseDataFn={() => parseData(data, dateRange)} />
      </Grid>
      <Grid item xs={12} md={4} display="flex" alignItems="center">
        <SelectDateRange
          handleDateFrom={handleDateFrom}
          handleDateTill={handleDateTill}
          dateRange={dateRange}
        />
      </Grid>
      <Grid item xs={12} sm={11}>
        <GridComponent
          parseDatafn={() => filterDataByDateRange(data, dateRange)}
          openPopup={setRowForPopup}
        />
      </Grid>
    </>
  );

  if (loading) {
    toRender = (
      <Grid item marginTop={10}>
        <Loader size="lg" />;
      </Grid>
    );
  } else if (error) {
    toRender = (
      <Grid item marginTop={10}>
        <Alert severity="error">{error}</Alert>
      </Grid>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container justifyContent={"center"}>
        {toRender}
      </Grid>
      {rowForPopup && (
        <PopupForm
          row={rowForPopup}
          onSubmit={handleRowChange}
          closePopup={() => {
            setRowForPopup(null);
          }}
        />
      )}
    </LocalizationProvider>
  );
};

export default App;
