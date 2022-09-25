import React from "react";
import { useLocation } from "react-router-dom";

const AddEdit = ({ edit, type }) => {
  const { state } = useLocation();
  const { id } = state;

  return (
    <div>
      <h1>Add and Edit</h1>
    </div>
  );
};

export default AddEdit;
