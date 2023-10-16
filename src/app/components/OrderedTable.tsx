import React, { ReactNode, useState } from "react";

import Box from "@mui/material/Box";

import TableContainer from "@mui/material/TableContainer";
import { Delete } from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
} from "@mui/material";

import { Record, OrderKey } from "../types";

const OrderedTable = ({
  elements,
  countElements,
  orderKeys,
  page,
  pageSize,
  handlePageChange,
  handlePageSizeChange,
  deleteFn,
}: {
  elements: Array<Record>;
  countElements: number;
  orderKeys: Array<OrderKey>;
  page: number;
  pageSize: number;
  handlePageChange: any;
  handlePageSizeChange: any;
  deleteFn: any;
}) => {
  const [orderState, setOrder] = useState({
    orderBy: "id",
    orderDirection: false,
  });
  const [filterValue, setFilterValue] = useState("");

  const deleteItem = (itemId: string) => () => {
    deleteFn(itemId);
  };

  const toggleOrder = () => {
    setOrder((state) => ({ ...state, orderDirection: !state.orderDirection }));
  };

  const handleKeyChange = (event: any) => {
    setFilterValue(event.target.value);
  };

  const handleOrder = (type: string) => () => {
    if (orderState.orderBy == type) {
      toggleOrder();
    } else {
      setOrder({ orderBy: type, orderDirection: true });
    }
  };

  const getDirection = (type: string): "asc" | "desc" => {
    return orderState.orderBy == type && orderState.orderDirection
      ? "asc"
      : "desc";
  };

  const filterValues = () => {
    if (filterValue !== "") {
      return (
        Array.isArray(elements) &&
        elements.filter((element) => {
          const keys = Object.keys(element);
          return keys.some((key) => {
            const currentValue = element[key as keyof Record];
            return currentValue.toString().indexOf(filterValue) > -1;
          });
        })
      );
    }

    return elements;
  };

  const filteredFilter = filterValues();

  const orderedRecord =
    Array.isArray(filteredFilter) &&
    filteredFilter.sort((a, b) => {
      let result = 0;
      const key = orderState.orderBy as keyof Record;

      if (a[key] > b[key]) {
        result = -1;
      } else if (a[key] < b[key]) {
        result = 1;
      }

      return orderState.orderDirection ? result : -result;
    });

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Box sx={{ maxWidth: "400px", pl: 1, mb: 1 }}>
        <TextField
          margin="normal"
          fullWidth
          id="records_search"
          label="Search in records"
          name="records_search"
          autoFocus
          onKeyUp={handleKeyChange}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {orderKeys.map((order) => (
                <TableCell key={order.id}>
                  <TableSortLabel
                    active={order.id == orderState.orderBy}
                    direction={getDirection(order.id)}
                    onClick={handleOrder(order.id)}
                  >
                    {order.value}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(orderedRecord) &&
              orderedRecord.map((element) => (
                <TableRow key={element.id}>
                  {orderKeys.map((orderKey) => (
                    <TableCell align="left" size="small" key={orderKey.id}>
                      <Box
                        sx={{
                          ...orderKey.sx,
                        }}
                      >
                        {element[orderKey.id as keyof Record] as ReactNode}
                      </Box>
                    </TableCell>
                  ))}
                  <TableCell>
                    {
                      <Delete
                        sx={{ cursor: "pointer" }}
                        onClick={deleteItem(element.id)}
                      />
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6}>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={countElements}
                  rowsPerPage={pageSize}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handlePageSizeChange}
                  sx={{ display: "flex", border: "none !important" }}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderedTable;
