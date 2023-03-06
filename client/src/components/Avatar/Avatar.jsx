import React from "react";

function Avatar({children, backgroundColor, px, py, color, fontSize, cursor}) {
    
    const style = {
        backgroundColor,
        padding: `${py} ${px}`,
        color: color || "black",
        borderRadius: "6px",
        textDecoration: "none",
        fontSize,
        textAlign: "center",
        cursor: cursor || null
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
}

export default Avatar;