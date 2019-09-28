import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import API from "../../../Helpers/Api";
import { searchCompany } from "../../../Helpers/Utils";

export default function() {
  const [companyInput, setCompanyInput] = useState("");

  const addCompany = async function(e) {
    e.preventDefault();
    if (companyInput !== "") {
      const response = await searchCompany(companyInput);

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
