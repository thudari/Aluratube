import React from "react";

export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => {alert("Você precisa me configurar primeiro!") }
});

export default function ColorMadeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    return (
        // Entender pq esta sendo ignorado?
        <ColorModeContext.Provider value={{ mode: mode, setMode: setMode }}>
            {props.children}
        </ColorModeContext.Provider>
    )
}