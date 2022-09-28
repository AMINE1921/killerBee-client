import React from "reactn";
import { Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HeaderTable = ({ type, onChangeSearch }) => {
  const navigate = useNavigate();
  const { Search } = Input;

  return (
    <div id="HeaderTable">
      <Button
        htmlType="submit"
        type="primary"
        shape="round"
        size="middle"
        onClick={() =>
          navigate("/add", {
            state: { type: type, add: true },
          })
        }
      >
        AJOUTER
      </Button>
      <Search
        placeholder="Recherche"
        onChange={(e) => onChangeSearch(e?.target?.value)}
        prefix={<SearchOutlined />}
        size="large"
        bordered={false}
        style={{
          width: 200,
        }}
      />
    </div>
  );
};

export default HeaderTable;
