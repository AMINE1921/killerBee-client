import React from "reactn";
import { Space, Table, Tag, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faFaceSadTear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const TableFlex = ({ page, data, deleteItem }) => {
  const { Column } = Table;
  const navigate = useNavigate();

  return (
    <div id="Table">
      <Table
        dataSource={data}
        locale={{
          emptyText: (
            <>
              Aucune donnée disponible <FontAwesomeIcon icon={faFaceSadTear} />
            </>
          ),
        }}
        pagination={{
          position: ["bottomCenter"],
        }}
      >
        <Column title="Nom" dataIndex="name" key="name" />
        <Column
          title="Description"
          dataIndex="description"
          key="description"
          responsive={["sm"]}
        />
        {page === "frisbee" && (
          <>
            <Column
              title="Prix"
              dataIndex="price"
              key="price"
              render={(price) => <> {price} €</>}
              responsive={["sm"]}
            />
            <Column
              title="Gamme"
              dataIndex="range"
              key="range"
              responsive={["sm"]}
            />
            <Column
              title="Ingrédients"
              dataIndex="ingredients"
              key="ingredients"
              responsive={["sm"]}
              render={(tags) => (
                <>
                  {tags.map((ingredient) => (
                    <Tag color="volcano" key={ingredient?.ingredientId?.name}>
                      {ingredient?.ingredientId?.name}
                    </Tag>
                  ))}
                </>
              )}
            />
          </>
        )}
        {page === "process" && (
          <>
            <Column
              title="Modèle"
              dataIndex="model"
              key="model"
              render={(model) => <Tag color="geekblue">{model?.name}</Tag>}
              responsive={["sm"]}
            />
            <Column
              title="Nombre d'étapes"
              dataIndex="steps"
              key="steps"
              render={(steps) => steps?.length}
              responsive={["sm"]}
            />
          </>
        )}
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <Button
                className="editButton"
                type="primary"
                shape="round"
                size="middle"
                onClick={() =>
                  navigate(`/${page}/${record?._id}`, {
                    state: { id: record?._id },
                  })
                }
              >
                Modifier
              </Button>
              <Button
                type="primary"
                shape="circle"
                icon={<FontAwesomeIcon icon={faTrashCan} />}
                size="middle"
                danger
                onClick={() => deleteItem(record?._id)}
              />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default TableFlex;
