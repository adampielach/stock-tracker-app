import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import API from "../../../Helpers/Api";

export default function() {
  const [companyInput, setCompanyInput] = useState("");

  const addCompany = async function(e) {
    e.preventDefault();
    if (companyInput !== "") {
      let symbolResponse = await API.stocks.getCompanyData(
        "SYMBOL_SEARCH",
        "keywords=" + companyInput
      );

      let globalResponse = await API.stocks.getCompanyData(
        "GLOBAL_QUOTE",
        "symbol=" + companyInput
      );

      let mergedResponse = {
        ...symbolResponse.bestMatches[0],
        ...globalResponse["Global Quote"]
      };

      let globalResponseArray = {};

      for (let key of Object.entries(mergedResponse)) {
        let currentKey = key[0].substring(key[0].indexOf(" ") + 1);
        globalResponseArray[currentKey] = key[1];
      }
      console.log(globalResponseArray);

      return;
    }
    alert("Please provide appropriate symbol.");
  };

  return (
    <Form onSubmit={e => addCompany(e)}>
      <Form.Group controlId="addCompanyForm">
        <Form.Label>Company Symbol</Form.Label>
        <Form.Control
          type="text"
          placeholder="Company Symbol"
          value={companyInput}
          onChange={e => setCompanyInput(e.target.value)}
        />
        <Form.Text className="text-muted">
          Provide the stock exchange symbol of a company you want to track
        </Form.Text>
      </Form.Group>
      <Button type="submit">Track</Button>
    </Form>
  );
}
