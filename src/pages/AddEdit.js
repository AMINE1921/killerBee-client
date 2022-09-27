import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { isMobile } from "react-device-detect";
import { Button, Steps, Form, Input, InputNumber, Select, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import toastNotif from "../utils/toastNotif";
import {
  createIngredient,
  getIngredientById,
  getListIngredient,
  updateIngredient,
} from "../utils/api/ingredient";
import {
  createFrisbee,
  getFrisbeeById,
  updateFrisbee,
} from "../utils/api/frisbee";

const AddEdit = ({ edit }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { Step } = Steps;
  const { Option } = Select;
  const [form] = Form.useForm();
  const [idEl, setIdEl] = useState();
  const [type, setType] = useState();
  const [current, setCurrent] = useState(0);
  const [stepsToShow, setStepsToShow] = useState();
  const [listIngredients, setListIngredients] = useState([]);
  const [formValues, setFormValues] = useState();

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

      if (type === "frisbee") {
        getAllIngredients();
      }
    } else {
      setStepsToShow(stepsFrisbee);
    }
  }, [type]);

  useEffect(() => {
    if (edit && !isEmpty(type)) {
      switch (type) {
        case "frisbee":
          getFrisbeeById(idEl).then((response) => {
            if (response?.success) {
              Object.entries(response?.frisbee).forEach(([key, value]) =>
                form.setFields([
                  {
                    name: [key],
                    value: value,
                  },
                ])
              );
            }
          });
          break;
        case "ingredients":
          getIngredientById(idEl).then((response) => {
            if (response?.success) {
              Object.entries(response?.ingredient).forEach(([key, value]) =>
                form.setFields([
                  {
                    name: [key],
                    value: value,
                  },
                ])
              );
            }
          });
          break;
        case "process":
          getIngredientById(idEl).then((response) => {
            console.log(response);
          });
          break;
        default:
          break;
      }
    }
  }, [edit, type]);

  const getAllIngredients = () => {
    getListIngredient()
      .then((response) => {
        if (response?.success) {
          setListIngredients(response?.ingredients);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const next = () => {
    setFormValues((prevState) => ({ ...prevState, ...form?.getFieldsValue() }));
    setCurrent(current + 1);
  };

  const prev = () => {
    setFormValues((prevState) => ({ ...prevState, ...form?.getFieldsValue() }));
    setCurrent(current - 1);
  };

  const onChange = (value) => {
    setFormValues((prevState) => ({ ...prevState, ...form?.getFieldsValue() }));
    setCurrent(value);
  };

  const onFinish = (values) => {
    const newValues = {
      ...formValues,
      ...form?.getFieldsValue(),
    };
    console.log(newValues);
    setFormValues(newValues);
    if (edit && !isEmpty(type)) {
      switch (type) {
        case "frisbee":
          updateFrisbee(newValues, idEl)
            .then((response) => {
              if (response?.success) {
                navigate(!isEmpty(type) ? `/${type}` : "/");
                toastNotif("Frisbee mis à jour !", "success");
              }
            })
            .catch((error) => {
              toastNotif(error?.data?.error, "error");
            });
          break;
        case "ingredients":
          updateIngredient(newValues, idEl)
            .then((response) => {
              if (response?.success) {
                navigate(!isEmpty(type) ? `/${type}` : "/");
                toastNotif("Ingrédient mis à jour !", "success");
              }
            })
            .catch((error) => {
              toastNotif(error?.data?.error, "error");
            });
          break;
        case "process":
          // getIngredientById(idEl).then((response) => {
          //   console.log(response);
          // });
          break;
        default:
          break;
      }
    } else if (!edit && !isEmpty(type)) {
      switch (type) {
        case "frisbee":
          createFrisbee(newValues)
            .then((response) => {
              if (response?.success) {
                navigate(!isEmpty(type) ? `/${type}` : "/");
                toastNotif("Frisbee crée !", "success");
              }
            })
            .catch((error) => {
              toastNotif(error?.data?.error, "error");
            });
          break;
        case "ingredients":
          createIngredient(newValues)
            .then((response) => {
              if (response?.success) {
                navigate(!isEmpty(type) ? `/${type}` : "/");
                toastNotif("Ingrédient crée !", "success");
              }
            })
            .catch((error) => {
              toastNotif(error?.data?.error, "error");
            });
          break;
        case "process":
          // getIngredientById(idEl).then((response) => {
          //   console.log(response);
          // });
          break;
        default:
          break;
      }
    }
  };

  return (
    <div id="AddEdit">
      {!isEmpty(stepsToShow) && (
        <>
          <Form
            name="formAddEdit"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 12,
            }}
            form={form}
            layout="vertical"
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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
            <div className="steps-content">
              {stepsToShow[current]?.contents?.map((item) => {
                switch (item) {
                  case "name":
                    return (
                      <Form.Item
                        label="Nom"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Veillez mettre le nom de l'élement !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    );
                  case "description":
                    return (
                      <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                          {
                            required: true,
                            message:
                              "Veillez mettre la description de l'élement !",
                          },
                        ]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    );
                  case "price":
                    return (
                      <Form.Item
                        label="Prix unitaire hors taxes"
                        name="price"
                        rules={[
                          {
                            required: true,
                            message:
                              "Veillez mettre un prix pour cet élement !",
                          },
                        ]}
                      >
                        <InputNumber
                          defaultValue={10}
                          formatter={(value) =>
                            `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                          }
                        />
                      </Form.Item>
                    );
                  case "range":
                    return (
                      <Form.Item
                        label="Gamme"
                        name="range"
                        rules={[
                          {
                            required: true,
                            message: "Veillez indiquer la gamme de l'élement !",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    );

                  case "ingredients":
                    return (
                      <Form.List name="ingredients">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map((field) => (
                              <Space key={field.key} align="baseline">
                                <Form.Item
                                  noStyle
                                  shouldUpdate={(prevValues, curValues) =>
                                    prevValues.area !== curValues.area ||
                                    prevValues.sights !== curValues.sights
                                  }
                                >
                                  {() => (
                                    <Form.Item
                                      {...field}
                                      label="Ingredient"
                                      name={[field.name, "ingredientId"]}
                                      rules={[
                                        {
                                          required: true,
                                          message:
                                            "Veillez choisir un ingrédient !",
                                        },
                                      ]}
                                    >
                                      <Select>
                                        {listIngredients.map((ingr) => {
                                          return (
                                            <Select.Option
                                              key={ingr?._id}
                                              value={ingr?._id}
                                            >
                                              {ingr?.name}
                                            </Select.Option>
                                          );
                                        })}
                                      </Select>
                                    </Form.Item>
                                  )}
                                </Form.Item>
                                <Form.Item
                                  {...field}
                                  label="Grammage"
                                  name={[field.name, "weight"]}
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Veillez indiquer le grammage de l'ingrédient !",
                                    },
                                  ]}
                                >
                                  <InputNumber />
                                </Form.Item>

                                <MinusCircleOutlined
                                  onClick={() => remove(field.name)}
                                />
                              </Space>
                            ))}

                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Ajouter un ingrédient
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    );
                  default:
                    null;
                }
              })}
            </div>
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
                  onClick={() => {
                    next();
                    // onChange();
                  }}
                >
                  Suivant
                </Button>
              )}
              {current === stepsToShow?.length - 1 && (
                <Form.Item>
                  <Button
                    className="sendNextButton"
                    shape="round"
                    size="large"
                    htmlType="submit"
                  >
                    Envoyer
                  </Button>
                </Form.Item>
              )}
            </div>
          </Form>
        </>
      )}
    </div>
  );
};

export default AddEdit;
