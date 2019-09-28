import React, { useState, useEffect } from "react";
import Company from "./Company/Company";
import "./Companies.css";

import { getCompanies, refreshCompanies } from "../../Helpers/Utils";

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
  // const [isUpdated, updateCompanies] = useState(false);

  useEffect(() => {
    setCompany(refreshCompanies());
  }, []);

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
