import React from "react";
import "./style.scss"


export const Logo = () => {
    const content = () => {
        const array = []
        for (let i = 0; i < 50; i++) {
            array.push({id: i, name: "ONLINE CHAT"})
        }
        return array
    }
    return (
        <div id="ui" className="wrapper">
            {content().map(item => (
                <div key={item.id} className="text">{item.name}</div>
            ))}
        </div>
    )
}
