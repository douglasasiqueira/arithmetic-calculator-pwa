import React, { useEffect, useState } from "react";

import AuthSection from "@/app/components/AuthSection";
import { API_URL, AUTH_COOKIE } from "@/app/constants";
import { getAuthRequest } from "@/app/requests";
import { Cookies, withCookies } from "react-cookie";
import { Operation } from "@/app/types";
import OperationForm from "@/app/components/OperationForm";

const OperationPage = ({ cookies }: { cookies: Cookies }) => {
  const [operations, setOperations] = useState<Array<Operation>>([]);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const getOperations = async () => {
      setFetchError(false);

      try {
        const response = await getAuthRequest(
          `${API_URL}/v1/operation`,
          cookies.get(AUTH_COOKIE)
        );

        if (response.status > 299) {
          setFetchError(true);
        } else {
          setOperations(await response.json());
        }
      } catch {
        setFetchError(true);
      }
    };

    getOperations();
  }, [cookies]);

  console.log(operations);

  return (
    <AuthSection>
      {operations.length > 0 && <OperationForm operations={operations} />}
    </AuthSection>
  );
};

export default withCookies(OperationPage);
