import React, { useState } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { postAuthRequest } from "../requests";
import Alert from "@mui/material/Alert";
import { Cookies, withCookies } from "react-cookie";

import { API_URL, AUTH_COOKIE } from "../constants";
import { Operation } from "../types";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import OperationItem from "./OperatorItem";
import ResultDialog from "./ResultDialog";

const OperationForm = ({
  cookies,
  operations,
}: {
  cookies: Cookies;
  operations: Array<Operation>;
}) => {
  const [error, setError] = useState({ isError: false, message: "" });
  const [selectedOperation, setSelectedOperation] = useState(operations[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState("");
  const [operationItems, setOperationItems] = useState([
    <OperationItem key="key" />,
  ]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError({ isError: false, message: "" });

    const operators: any = {};
    const data = new FormData(event.currentTarget);

    data.forEach((v, k) => (operators[k] = v));

    const response = await postAuthRequest(
      `${API_URL}/v1/operation/${selectedOperation.id}`,
      cookies.get(AUTH_COOKIE),
      operators
    );

    if (response.status === 200) {
      const responseJson = await response.json();
      setResult(responseJson.result);
      setIsModalOpen(true);
    } else {
      let errorMessage;

      try {
        const responseJson = await response.json();
        errorMessage = responseJson.error;
      } catch {
        errorMessage = "Undefined error. Try to contact an administrator.";
      }

      setError({ isError: true, message: errorMessage });
    }
  };

  const handleOperationChange = (event: SelectChangeEvent<number>) => {
    const operationId = event.target.value;
    const operation = operations.filter(
      (operation) => operation.id === operationId
    )[0];

    if (operation) {
      setSelectedOperation(operation);
    }
  };

  const addOperationItem = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOperationItems((state) => [
      ...state,
      <OperationItem key={`state-${state.length + 1}`} />,
    ]);
  };

  const removeOperationItem = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setOperationItems((state) => [...state.slice(0, -1)]);
  };

  return (
    <>
      <ResultDialog
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        result={result}
      />
      <Box
        sx={{
          width: "100dvw",
          height: "100%",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Box width="400px">
          <Typography component="h1" variant="h5">
            New Operation
          </Typography>
          <Box sx={{ mt: 1, mb: 2 }}>
            {error.isError && <Alert severity="error">{error.message}</Alert>}
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container>
              <Grid item xs={6}>
                <Select
                  labelId="demo-simple-select-label"
                  value={selectedOperation.id}
                  id="demo-simple-select"
                  label="Age"
                  onChange={handleOperationChange}
                  sx={{ width: "100%" }}
                >
                  {operations.map((operation) => (
                    <MenuItem value={operation.id} key={operation.id}>
                      {operation.type}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Chip
                  label={`Operation cost: $ ${selectedOperation.cost}`}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {operationItems.map((item) => item)}
            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="success"
                  onClick={addOperationItem}
                >
                  + Operator
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="error"
                  onClick={removeOperationItem}
                >
                  - Operator
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Operation!
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default withCookies(OperationForm);
