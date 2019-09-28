import React, { useState } from "react";
import Company from "./Company/Company";

export default function Companies() {
  // helper functions for local storage

  const getCompanies = function() {
    const companies = JSON.parse(localStorage.getItem("companies"));
    return companies ? companies : [];
  };

  const deleteCompany = function(company) {
    let newCompaniesArray = getCompanies();
    let companyIndex = newCompaniesArray.findIndex(el => el.name === company);
    if (companyIndex > -1) {
      newCompaniesArray.splice(companyIndex, 1);
      setCompany(newCompaniesArray);
      localStorage.setItem("Companies", JSON.stringify(newCompaniesArray));
    }
    return;
  };

  // set the initial state
  const [companies, setCompany] = useState(getCompanies());

  return (
    <div className="Companies">
      {companies.map(company => (
        <Company name={company.name} deleteCompany={deleteCompany} />
      ))}
    </div>
  );
}
