import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";

const AddEdit = ({ edit, type }) => {
  const { state } = useLocation();
  const [idEl, setIdEl] = useState();

  useEffect(() => {
    if (!isEmpty(state)) {
      const { id } = state;
      setIdEl(id);
    }
  }, [state]);

  return (
    <div>
      <h1>Add and Edit</h1>
    </div>
  );
};

export default AddEdit;
