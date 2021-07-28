import { Address } from "cluster";
import React from "react";
import "./HomePage.css";

import { AddressType } from "../Types";

const ListItem: React.FC<{ data: AddressType }> = (props) => {
  const [visible, setVisible] = React.useState<Boolean>(false);
  return (
    <li
      className="list_item"
      onClick={() => {
        setVisible(!visible);
      }}
    >
      <div>
        {props.data.line},{props.data.postcode},{props.data.town},
        {props.data.country}
      </div>
      {visible && (
        <React.Fragment>
          <div className="desc">
            <span className="desc_item">line1:{props.data.line}</span>
            <span className="desc_item"> postcode:{props.data.postcode}</span>
            <span className="desc_item">town:{props.data.town}</span>
            <span className="desc_item">country:{props.data.country}</span>
          </div>
        </React.Fragment>
      )}
    </li>
  );
};

export default ListItem;
