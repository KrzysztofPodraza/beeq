import React, { useContext } from "react";

import "./HomePage.css";

import { AddressesContext } from "../store/AddressBookContext";
import AddAddressButton from "../components/AddAddressButton";
import ListItem from "./ListItem";

const HomePage: React.FC = () => {
  const ctx = useContext(AddressesContext);
  return (
    <div className="main">
      <img
        className="bg_photo"
        src="https://news.onecountry.com/wp-content/uploads/2017/12/origin-1984.jpg"
      ></img>
      <div>
        <div className="header">
          {" "}
          <h3 className="header_text">Address Book</h3>
          <AddAddressButton />
        </div>

        <div className="spacer" />
        {ctx.addresses.length === 0 && (
          <h3 style={{ textAlign: "center" }}>Address Book is empty</h3>
        )}
        <ul className="list">
          {ctx.addresses.map((pieceOfData) => (
            <ListItem data={pieceOfData} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
