import React from "react";

import "./Company.css";

export default function Company({ data, deleteCompany }) {
  let change = Number(data.change);
  return (
    <div className="Company">
      <div className="Company--image">
        <img
          src="https://dummyimage.com/64x64/000/fff.png&text=company+logo"
          alt={data.name}
        />
      </div>
      <div className="Company--content">
        <div className="Company--content-row">
          <h5>{data.name}</h5>
          <span>{data.symbol}</span>
          <span>URL HERE</span>
        </div>
        <div className="Company--content-row">
          <span>{data.region}</span>
          <span>
            {data.marketOpen} - {data.marketClose}
          </span>
          <span>{data.timezone}</span>
        </div>
        <div className="Company--content-row">
          <span>{Number(data.price).toFixed(2)}</span>
          <span>{data.currency}</span>
          <span className={change >= 0 ? "text-success" : "text-danger"}>
            {change} ({data["change percent"]}) {change >= 0 ? "↑" : "↓"}
          </span>
          <span>Closed: {data["latest trading day"]}</span>
        </div>
      </div>
      <div
        className="Company--remove"
        onClick={deleteCompany.bind(this, data.symbol)}
      >
        X
      </div>
    </div>
  );
}
