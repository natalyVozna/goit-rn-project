import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Icon } from "../App";
import { logoutUser } from "../redux/auth/authOperations";

export const LogOutBtn = ({ customStyle, color, size }) => {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => dispatch(logoutUser())}
      style={{ marginRight: 10, ...customStyle }}
    >
      <Icon
        name="icon-log-out"
        size={size ? size : 20}
        color={color ? color : "#BDBDBD"}
      />
    </TouchableOpacity>
  );
};
