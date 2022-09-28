import React, { useEffect, useState } from "reactn";
import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllStats } from "../utils/api/stats";

const Home = () => {
  const navigate = useNavigate();
  const [listStats, setListStats] = useState();
  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    getAllStats()
      .then((response) => {
        if (response?.success) {
          setListStats(response?.stats);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id="Home">
      <Row gutter={16}>
        <Col xs={24} xl={8}>
          <Card
            title={"Frisbees"}
            bordered={false}
            onClick={() => {
              navigate("/frisbee", { replace: true });
            }}
          >
            <span>{listStats?.totalCount?.frisbees}</span>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card
            title={"Ingrédients"}
            bordered={false}
            onClick={() => {
              navigate("/ingredients", { replace: true });
            }}
          >
            <span>{listStats?.totalCount?.ingredients}</span>
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card
            title={"Procédés"}
            bordered={false}
            onClick={() => {
              navigate("/process", { replace: true });
            }}
          >
            <span>{listStats?.totalCount?.processes}</span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
