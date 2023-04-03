import React from "react";

const App = () => {
    return (
        <h1>Hello World</h1>
    )
};

const Container = document.getElementById("root");

const root = createRoot(Container);
root.render(<App />)