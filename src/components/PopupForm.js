import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, CardContent, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Box } from "@mui/system";
import { parseDateObjtoBirthdayFormat } from "../utils/utilFunctions";

const CustomTextField = (props) => (
  <TextField
    variant="standard"
    sx={{ marginY: "10px", width: "100%" }}
    {...props}
  />
);

const CustomErrorMsg = (msg) => (
  <Box sx={{ color: "red", marginBottom: "5px" }}>{msg}</Box>
);

const PopupForm = ({ row, closePopup, onSubmit }) => {
  const { id, ...rest } = row;
  return (
    <Modal
      open={true}
      onClose={closePopup}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        elevation={3}
        sx={{
          maxWidth: "500px",
          margin: 2,
          padding: 3,
          boxSizing: "border-box",
        }}
      >
        <CloseIcon
          sx={{
            cursor: "pointer",
            float: "right",
            "&:hover": { opacity: 0.5 },
          }}
          onClick={closePopup}
        />
        <CardContent sx={{ display: "flex", flexDriection: "column" }}>
          <Formik
            enableReinitialize={true}
            initialValues={rest}
            validate={(values) => {
              const errors = {};
              Object.keys(values).forEach((val) => {
                if (!values[val]) {
                  errors[val] = "Required!";
                }
              });
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address!";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const updatedRow = { ...values, id };
              onSubmit(updatedRow);
              setSubmitting(false);
              closePopup();
            }}
          >
            {({ isSubmitting, errors, values, setFieldValue }) => (
              <Form>
                <Field
                  type="text"
                  name="first_name"
                  label="First name"
                  as={CustomTextField}
                />
                <ErrorMessage
                  name="first_name"
                  component="div"
                  render={CustomErrorMsg}
                />

                <Field
                  type="text"
                  name="last_name"
                  label="Last name"
                  as={CustomTextField}
                />
                <ErrorMessage
                  name="last_name"
                  component="div"
                  render={CustomErrorMsg}
                />

                <Field
                  type="email"
                  name="email"
                  label="Email"
                  as={CustomTextField}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  render={CustomErrorMsg}
                />

                <Field
                  type="text"
                  name="country"
                  label="Country"
                  as={CustomTextField}
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  render={CustomErrorMsg}
                />

                <Field
                  type="text"
                  name="birthday"
                  label="Birthday"
                  as={(props) => (
                    <DesktopDatePicker
                      label="Birthday"
                      inputFormat="MM/dd/yyyy"
                      value={values.birthday}
                      onChange={(value) => {
                        setFieldValue(
                          "birthday",
                          parseDateObjtoBirthdayFormat(value)
                        );
                      }}
                      renderInput={(params) => (
                        <CustomTextField {...params} {...props} />
                      )}
                    />
                  )}
                />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  render={CustomErrorMsg}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  variant="outlined"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default PopupForm;
