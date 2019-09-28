import React, { useState } from "react";
import Company from "./Company/Company";

import { getCompanies } from "../../Helpers/Utils";

export default function Companies() {
  const deleteCompany = function(symbol) {
    const trackedCompanies = getCompanies();
    let filteredCompanies = trackedCompanies.filter(el => el.symbol !== symbol);
    console.log(symbol);
    setCompany(filteredCompanies);
    localStorage.setItem("companies", JSON.stringify(filteredCompanies));
  };

  // set the initial state
  const [companies, setCompany] = useState(getCompanies());

  return (
    <div className="Companies">
      {companies.map(company => (
        <Company
          key={company.name}
          data={company}
          deleteCompany={deleteCompany}
        />
      ))}
    </div>
  );
}
