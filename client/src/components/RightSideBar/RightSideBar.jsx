import React from "react";
import Widget from './Widget';
import WidgetTags from './WidgetTags';

import './RightSideBar.css';

const RightSideBar = () => {
    
    return (
        <aside className="right-sidebar">
            <Widget />
            <WidgetTags />
        </aside>
    );
}

export default RightSideBar;