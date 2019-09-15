import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function() {
  const [companyInput, setCompanyInput] = useState("");

  const addCompany = function(e) {
    e.preventDefault();
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
