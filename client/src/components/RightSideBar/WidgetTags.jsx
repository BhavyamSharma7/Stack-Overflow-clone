import React from "react";

const WidgetTags = () => {
    
    const tags = ["c", "css", "express", "firebase", "html", "java", "javascript", "mern", "mongodb", "mysql", "next.js", "node.js", "php", "python", "react js" ];

    return (
        <div className="widget-tags">
            <h3>Watched Tags</h3>
            <div className="widget-tags-div">
                {
                    tags.map((tag) => {
                        return <p key={tag}>{tag}</p>
                    })
                }
            </div>
        </div>
    );
}

export default WidgetTags;