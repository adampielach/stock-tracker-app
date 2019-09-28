import React from "react";

export default function Company({ data, deleteCompany }) {
  return <div onClick={deleteCompany.bind(this, data.symbol)}>{data.name}</div>;
}
