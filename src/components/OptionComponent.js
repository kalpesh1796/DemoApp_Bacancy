import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const OptionComponent = (props) => {
  return (
    <Menu onSelect={(v) => alert(`You selected ${v} option`)}>
      <MenuTrigger>
        {props.children}
      </MenuTrigger>
      <MenuOptions>
        <MenuOption text="Edit" value={"edit"} />
        <MenuOption text="Delete" value={"delete"} />
      </MenuOptions>
    </Menu>
  );
};

export default OptionComponent;