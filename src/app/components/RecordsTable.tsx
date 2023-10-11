import React, { useEffect, useState } from "react";

import { Cookies, withCookies } from "react-cookie";
import { getAuthRequest } from "@/app/requests";

import OrderedTable from "@/app/components/OrderedTable";
import { Record } from "@/app/types";

import { API_URL } from "@/app/constants";
import Alert from "@mui/material/Alert";

const RecordsTable = ({ cookies }: { cookies: Cookies }) => {
  const [records, setRecords] = useState<Array<Record>>([]);
  const [countRecords, setCountRecords] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const getRecords = async () => {
      setFetchError(false);

      try {
        const response = await getAuthRequest(
          `${API_URL}/v1/record?page=${page}&size=${pageSize}`,
          cookies.get("auth_token")
        );

        if (response.status > 299) {
          setFetchError(true);
        } else {
          const fetchedRecords = await response.json();

          setRecords(
            fetchedRecords.map(
              (fetchedRecord: { operationDTO: { type: any } }) => ({
                ...fetchedRecord,
                type: fetchedRecord.operationDTO.type,
              })
            )
          );

          setCountRecords(parseInt(response.headers.get("X-total-count")));
        }
      } catch {
        setFetchError(true);
      }
    };

    getRecords();
  }, [cookies, page, pageSize]);

  const orderKeys = [
    { id: "id", value: "ID" },
    { id: "amount", value: "Amount" },
    { id: "type", value: "Operation Type" },
    { id: "userBalance", value: "User Balance" },
    { id: "date", value: "Date" },
    {
      id: "operationResponse",
      value: "Operation Response",
      sx: { width: "250px", textOverflow: "ellipsis", overflow: "hidden" },
    },
  ];

  const handlePageSizeChange = (event: { target: { value: string } }) => {
    setPageSize(parseInt(event.target.value, 10));
  };
  const handlePageChange = (event: any, page: React.SetStateAction<number>) => {
    setPage(page);
  };

  return countRecords > 0 && !fetchError ? (
    <OrderedTable
      elements={records}
      countElements={countRecords}
      orderKeys={orderKeys}
      page={page}
      pageSize={pageSize}
      handlePageChange={handlePageChange}
      handlePageSizeChange={handlePageSizeChange}
    />
  ) : (
    <Alert severity="error">
      An error has occured whily fetching for records.
    </Alert>
  );
};

export default withCookies(RecordsTable);
