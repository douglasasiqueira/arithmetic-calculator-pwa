import React, { useState } from "react";

import {
  Grid,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

const OperationItem = () => {
  const availableOperators = [
    { operator: "numbers", schema: "1, 2, 3, 4", id: 1 },
    { operator: "num", schema: "10", id: 2 },
    { operator: "len", schema: "10", id: 3 },
    { operator: "digits", schema: "on", id: 4 },
    { operator: "upperalpha", schema: "off", id: 5 },
    { operator: "loweralpha", schema: "off", id: 6 },
    { operator: "unique", schema: "on", id: 7 },
  ];

  const [selectedOperator, setSelectedOperator] = useState(
    availableOperators[0]
  );

  const handleOperationChange = (event: SelectChangeEvent<number>) => {
    const operatorValue = event.target.value;
    const operator = availableOperators.filter(
      (operator) => operator.operator === operatorValue
    )[0];

    if (operator) {
      setSelectedOperator(operator);
    }
  };

  return (
    <Grid container sx={{ marginTop: 2 }} spacing={1}>
      <Grid item xs={6}>
        <Select
          value={selectedOperator.id}
          id="demo-simple-select"
          onChange={handleOperationChange}
          sx={{ width: "100%" }}
        >
          {availableOperators.map((operator) => (
            <MenuItem value={operator.id} key={operator.operator}>
              {operator.operator}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={6}>
        <TextField
          margin="normal"
          fullWidth
          id={selectedOperator.operator}
          name={selectedOperator.operator}
          placeholder={selectedOperator.schema}
          autoFocus
          sx={{ margin: 0 }}
        />
      </Grid>
    </Grid>
  );
};

export default OperationItem;
