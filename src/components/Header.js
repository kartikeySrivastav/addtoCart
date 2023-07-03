import { React, useEffect, useState } from "react";
import { Container, Nav, Navbar, Table } from "react-bootstrap";
import { Badge, Menu } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DLT } from "../redux/actions/action";

const Header = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dlt = (id) => {
    dispatch(DLT(id));
  };

  const total = () => {
    let price = 0;
    getdata.map((elem, key) => {
      price = elem.price * elem.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: 60 }}>
        <Container>
          <NavLink to="/" className=" text-decoration-none text-light mx-3 ">
            Add to Cart
          </NavLink>
          <Badge
            badgeContent={getdata.length}
            color="primary"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <i
              className="fa-solid fa-cart-shopping text-light"
              style={{ fontSize: 25, cursor: "pointer" }}
            ></i>
          </Badge>
        </Container>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {getdata.length ? (
            <Table
              className="card_details"
              style={{ width: "24rem", padding: 10 }}
            >
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Restaurant Name</th>
                </tr>
              </thead>
              <tbody>
                {getdata.map((e) => {
                  return (
                    <tr key={e.id}>
                      <td>
                        <NavLink to={`/cart/${e.id}`}>
                          <img
                            src={e.imgdata}
                            style={{ width: "5rem", height: "5rem" }}
                            alt=""
                          />
                        </NavLink>
                      </td>
                      <td>
                        <p>{e.rname}</p>
                        <p>Price : ₹{e.price}</p>
                        <p>Quantity : {e.qnty}</p>
                        <p
                          style={{
                            color: "red",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                          onClick={() => dlt(e.id)}
                        >
                          <i className="fas fa-trash smalltrash"></i>
                        </p>
                      </td>
                      <td
                        className="mt-5"
                        style={{
                          color: "red",
                          fontSize: 20,
                          cursor: "pointer",
                        }}
                        onClick={() => dlt(e.id)}
                      >
                        <i className="fas fa-trash largetrash"></i>
                      </td>
                    </tr>
                  );
                })}
                <div className="text-center">Total: ₹ {price}</div>
              </tbody>
            </Table>
          ) : (
            <div
              className="card_details d-flex align-items-center justify-content-center"
              style={{ position: "relative", padding: 10, Width: "24rem" }}
            >
              <i
                className="fas fa-close"
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 20,
                  fontSize: 20,
                  cursor: "pointer",
                }}
              ></i>
              <p style={{ fontSize: 22 }}>Your card is empty</p>
              <img src="./cart.gif" style={{ width: "5rem", padding: 10 }} />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
};

export default Header;
