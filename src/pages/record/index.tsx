import React from "react";

import AuthSection from "@/app/components/AuthSection";
import RecordsTable from "@/app/components/RecordsTable";

const RecordsPage = () => {
  return (
    <AuthSection>
      <RecordsTable />
    </AuthSection>
  );
};

export default RecordsPage;
