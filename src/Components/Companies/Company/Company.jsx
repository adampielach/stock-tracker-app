import React from "react";

export default function Company(props) {
  return (
    <div onClick={props.deleteCompany.bind(this, props.symbol)}>
      {props.name}
    </div>
  );
}
