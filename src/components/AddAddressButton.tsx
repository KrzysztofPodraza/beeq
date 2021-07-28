import React from "react";
import "../pages/HomePage.css";
import "./AddAddressButton.css";
import { AddressesContext } from "../store/AddressBookContext";
import { auto } from "@popperjs/core";

//types
import { AddressType } from "../Types";
import { EventHandler } from "react";

const AddAddressButton = () => {
  const ctx = React.useContext(AddressesContext);
  const [visible, setVisible] = React.useState<boolean>(false);
  const [step, setStep] = React.useState<number>(1);
  const [postcode, setPostcode] = React.useState<string>("");
  const [resultAddresses, setResultAddresses] = React.useState<any>();
  const [error, setError] = React.useState<string>("");
  const [fetchButton, setFetchButton] = React.useState("Find Address");
  const [errorStyle, setErrorStyle] = React.useState<Object>({});

  //manually states
  const [line, setLine] = React.useState<string>("");
  const [manualPostcode, setManualPostcode] = React.useState<string>("");
  const [town, setTown] = React.useState<string>("");
  const [country, setCountry] = React.useState<string>("");

  //types

  const addManualAddressHandler = (event: any) => {
    event.preventDefault();
    const saveObject: AddressType = {
      line: line,
      postcode: manualPostcode,
      town: town,
      country: country,
    };
    ctx.addAddress(saveObject);
    setLine("");
    setManualPostcode("");
    setTown("");
    setCountry("");
    setStep(1);
    setVisible(false);
  };
  async function findAddressHandler() {
    const res = await fetch(
      `https://api.getAddress.io/find/${postcode}?api-key=uhs26ipl9EWfL-ct2s7mOg32101&expand=true`
    );
    const data = await res.json();
    setResultAddresses(data.addresses);
    if (typeof data.addresses === "object") {
      console.log(data);
      setStep(4);
    } else {
      setErrorStyle({ border: "2px solid red" });
    }
    setFetchButton("Find Address");
  }
  const addAddressHandler = (address: AddressType) => {
    ctx.addAddress(address);
    setPostcode("");

    setStep(1);
    setVisible(false);
  };
  return (
    <React.Fragment>
      <button
        className="addButton"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Address
      </button>
      {visible && (
        <div className="popup">
          <div className="popup_header">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 x"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                setStep(1);
                setVisible(false);
                setPostcode("");
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="popup_body">
            {step === 1 && (
              <React.Fragment>
                <button
                  className="popup_button"
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Add Manualy
                </button>
                <button
                  className="popup_button"
                  onClick={() => {
                    setStep(3);
                  }}
                >
                  Find Address
                </button>
              </React.Fragment>
            )}
            {step === 2 && (
              <React.Fragment>
                <form className="popup_body" onSubmit={addManualAddressHandler}>
                  <input
                    required
                    className="input_field"
                    placeholder="line 1"
                    value={line}
                    onChange={(e) => {
                      setLine(e.target.value);
                    }}
                  ></input>
                  <input
                    required
                    className="input_field"
                    placeholder="postcode"
                    value={manualPostcode}
                    onChange={(e) => {
                      setManualPostcode(e.target.value);
                    }}
                  ></input>
                  <div className="doubled_input">
                    <input
                      required
                      className="input_field_doubled"
                      placeholder="town"
                      value={town}
                      onChange={(e) => {
                        setTown(e.target.value);
                      }}
                    ></input>
                    <input
                      required
                      style={{ marginLeft: auto, marginRight: 0 }}
                      className="input_field_doubled"
                      placeholder="country"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                      }}
                    ></input>
                  </div>
                  <button className="popup_button" type="submit">
                    Add Address
                  </button>
                </form>
              </React.Fragment>
            )}
            {step === 3 && (
              <React.Fragment>
                <input
                  className="input_field"
                  placeholder="Postcode..."
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);

                    setErrorStyle({ border: "1px solid #185adb" });
                  }}
                  style={errorStyle}
                ></input>
                <button
                  className="popup_button"
                  onClick={() => {
                    findAddressHandler();
                    setFetchButton("Fetching");
                  }}
                >
                  {fetchButton}
                </button>
              </React.Fragment>
            )}
            {step === 4 && (
              <React.Fragment>
                <div className="list_wrapper">
                  {typeof resultAddresses === "object" && (
                    <ul className="list_popup">
                      {resultAddresses.map((pieceOfData: any) => {
                        const data: AddressType = {
                          line: pieceOfData.line_1,
                          postcode: postcode,
                          town: pieceOfData.town_or_city,
                          country: pieceOfData.country,
                        };
                        return (
                          <React.Fragment>
                            <li
                              className="list_item_popup"
                              onClick={() => {
                                addAddressHandler(data);
                              }}
                            >
                              {data.line},{data.postcode},{data.town},
                              {data.country}
                            </li>
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddAddressButton;
