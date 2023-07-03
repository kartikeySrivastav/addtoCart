import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CardData from "./CardData";
import { ADD } from "../redux/actions/action";
import "./style.css";

const Cards = () => {
  const [data, setData] = useState(CardData);
  const dispatch = useDispatch();
  const send = (e) => {
    dispatch(ADD(e));
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center">Add to Carts projects</h1>
      <div className="row d-flex align-items-center justify-content-center">
        {data.map((element, id) => {
          return (
            <Card
              key={id}
              className="mx-2 mt-4 card_style"
              style={{ width: "22rem", border: "none" }}
            >
              <Card.Img
                variant="top"
                src={element.imgdata}
                style={{ height: "16rem" }}
                className="mt-3"
              />
              <Card.Body>
                <Card.Title>{element.rname}</Card.Title>
                <Card.Text> Price: ₹ {element.price} </Card.Text>
                <div className="button_div">
                  <Button
                    className="col-lg-12"
                    onClick={() => send(element)}
                    variant="primary"
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
