import React from "react";
import { AddressType } from "../Types";

type AddressesContextObj = {
  addresses: Array<AddressType>;
  addAddress: (address: AddressType) => void;
};

export const AddressesContext = React.createContext<AddressesContextObj>({
  addresses: [],
  addAddress: (address: AddressType) => {},
});

const AddressBookContextProvider: React.FC = (props) => {
  const [addressesState, setAddressesState] = React.useState<
    Array<AddressType>
  >([]);
  const addAddressHandler = (address: AddressType) => {
    setAddressesState((prevState) => [...prevState, address]);
  };
  const ContextValue: AddressesContextObj = {
    addresses: addressesState,
    addAddress: addAddressHandler,
  };
  return (
    <AddressesContext.Provider value={ContextValue}>
      {props.children}
    </AddressesContext.Provider>
  );
};

export default AddressBookContextProvider;
