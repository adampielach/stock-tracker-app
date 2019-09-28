import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {
  searchCompany,
  processCompany,
  stripResponse
} from "../../../Helpers/Utils";

export default function() {
  const [companyInput, setCompanyInput] = useState("");

  const addCompany = async function(e) {
    e.preventDefault();
    if (companyInput !== "") {
      const response = await searchCompany(companyInput);
      processCompany(stripResponse(response));
      setCompanyInput("");
      alert("Company Added!");
    } else {
      alert("Please provide appropriate symbol.");
    }
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
      <Button
        type="submit"
        disabled={companyInput.length >= 2 ? "" : "disabled"}
      >
        Track
      </Button>
    </Form>
  );
}
