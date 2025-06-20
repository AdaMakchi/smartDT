import { AntDesign, Feather } from "@expo/vector-icons";

export const icons = {
    index: (props)=> <AntDesign name="home" size={26} {...props} />,
    favorit: (props)=> <Feather name="compass" size={26} {...props} />,
    chat: (props)=> <AntDesign name="pluscircleo" size={26} {...props} />,
    profil: (props)=> <AntDesign name="user" size={26} {...props} />,
}