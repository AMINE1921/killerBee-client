import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { isEmpty } from "lodash";
import { isMobile } from "react-device-detect";
import { Button, message, Steps } from "antd";

const AddEdit = ({ edit }) => {
  const { state } = useLocation();
  const { Step } = Steps;
  const [idEl, setIdEl] = useState();
  const [type, setType] = useState();
  const [current, setCurrent] = useState(0);
  const [stepsToShow, setStepsToShow] = useState();

  const stepsFrisbee = [
    {
      title: "Première étape",
      contents: ["name", "description"],
    },
    {
      title: "Deuxième étape",
      contents: ["price", "range"],
    },
    {
      title: "Troisième étape",
      contents: ["ingredients"],
    },
  ];
  const stepsIngredients = [
    {
      title: "Première étape",
      contents: ["name", "description"],
    },
  ];
  const stepsProcess = [
    {
      title: "Première étape",
      contents: ["name", "description"],
    },
    {
      title: "Deuxième étape",
      contents: ["model"],
    },
    {
      title: "Troisième étape",
      contents: ["steps"],
    },
  ];

  useEffect(() => {
    if (!isEmpty(state)) {
      const { id, type } = state;
      setIdEl(id);
      setType(type);
    }
  }, [state]);

  useEffect(() => {
    if (!isEmpty(type)) {
      type === "frisbee"
        ? setStepsToShow(stepsFrisbee)
        : type === "ingredients"
        ? setStepsToShow(stepsIngredients)
        : setStepsToShow(stepsProcess);
    } else {
      setStepsToShow(stepsFrisbee);
    }
  }, [type]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  return (
    <div id="AddEdit">
      {!isEmpty(stepsToShow) && (
        <>
          <Steps
            className="site-navigation-steps"
            type={isMobile ? "default" : "navigation"}
            onChange={onChange}
            current={current}
            direction="horizontal"
          >
            {stepsToShow?.map((item) => (
              <Step key={item?.title} />
            ))}
          </Steps>
          <div className="steps-content">{stepsToShow[current]?.contents}</div>
          <div className="steps-action">
            {current > 0 && (
              <Button
                className="previousButton"
                shape="round"
                size="large"
                onClick={() => prev()}
              >
                Précédent
              </Button>
            )}
            {current < stepsToShow?.length - 1 && (
              <Button
                className="sendNextButton"
                shape="round"
                size="large"
                onClick={() => next()}
              >
                Suivant
              </Button>
            )}
            {current === stepsToShow?.length - 1 && (
              <Button
                className="sendNextButton"
                shape="round"
                size="large"
                onClick={() => message.success("Processing complete!")}
              >
                Envoyer
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AddEdit;
