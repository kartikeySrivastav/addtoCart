import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DLT, ADD , REMOVE} from '../redux/actions/action';
import "./style.css";

const CardDetails = () => {
  const { id } = useParams();
  const histroy = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getdata = useSelector((state) => state.cartreducer.carts);
  const compare = () => {
    let compareData = getdata.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
  };

  useEffect(() => {
    compare();
  }, []);

  // add data 
  const send = (e) => {
    dispatch(ADD(e));
  };

  // remove item
  const dlt = (id)=> {
    dispatch(DLT(id));
    histroy("/")
 }

 // remove decreament item
 const remove = (item)=>{
    dispatch(REMOVE(item));
 }



  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">         
            {data.map((elem) => {
              return (
                <div key={id}  className="itemsdetails">
                  <div className="items_img">
                    <img
                      src={elem.imgdata}
                      alt=""
                    />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong> : {elem.rname}
                          </p>
                          <p>
                            <strong>Price</strong> : ₹ {elem.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> : {elem.address}
                          </p>
                          <p>
                            <strong>Total</strong> : ₹ {elem.price * elem.qnty}
                          </p>
                          <div className=" mt-5 d-flex align-items-center justify-content-between" 
                          style={{width:100, cursor:'pointer', background: '#ddd', color: '#111'}}>
                                <span style={{fontSize:24}} onClick={elem.qnty <=1 ? ()=> dlt(elem.id) : ()=> remove(elem)}>-</span>
                                <span style={{fontSize:24}}>{elem.qnty}</span>
                                <span style={{fontSize:24}} onClick={()=> send(elem)}>+</span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating</strong> :{" "}
                            <span
                              style={{ background: "green", color: "#fff" }}
                            >
                             {elem.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review</strong> :{" "}
                            <span>{elem.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove</strong> :{" "}
                            <span>
                              <i
                                className="fas fa-trash"
                                style={{ color: "red", fontSize: 20, cursor: 'pointer' }}
                                onClick={()=>dlt(elem.id)}
                              ></i>
                            </span>
                          </p>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </div>
              );
            })}       
        </section>
      </div>
    </>
  );
};

export default CardDetails;
