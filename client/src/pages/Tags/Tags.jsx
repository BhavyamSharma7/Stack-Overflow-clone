import React from "react";
import LeftSideBar from "../../components/LeftSideBar/LeftSideBar";
import TagList from "./TagList";
import "./Tag.css";

function Tags() {
    const tagslist = [
        {
            id: 1,
            tagName: "javascript",
            tagDesc: "For questions regarding programming in ECMAScript\n(Javascript/JS) and its various\n dialects/implementations\n(Excluding ActionScript). Please\n include all relevant tags on your\n question."
        },{
            id: 2,
            tagName: "python",
            tagDesc: "Python is a multi-paradigm, dyanamically typed, multipurpose programming language. It is designed to be quick to learn, understand and use, and enforces a clean and uniform syntax."
        },{
            id: 3,
            tagName: "c#",
            tagDesc: "C# (pronounced as 'see sharp') is a high level, statically typed, multi-paradigm programming language developed by Microsoft."
        },{
            id: 4,
            tagName: "java",
            tagDesc: "Java is a high level object-oriented programming language. Use this tag when you're having probelms using or understanding the language itself."
        },{
            id: 5,
            tagName: "php",
            tagDesc: "PHP is widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scrpting language originally designed for server-side web development."
        },{
            id: 6,
            tagName: "html",
            tagDesc: "HTML (Hypertext Markup Language) is a markup language for creating web pages and other information to be displayed in a web browser."
        },{
            id: 7,
            tagName: "android",
            tagDesc: "Android is Google's mobile operating system, used for programming or developing digital devices(Smartphones, Tablets, Automobiles, TV's, Wear, Glass, IoT)"
        },{
            id: 8,
            tagName: "css",
            tagDesc: "Css is a representation stylesheet language used for describing the look and formatting of HTML, XML documents and SVG elements including colors, layout, fonts and animations."
        },{
            id: 9,
            tagName: "reactjs",
            tagDesc: "React is a Javascript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both flexible and effcient."
        },{
            id: 10,
            tagName: "nodejs",
            tagDesc: "NodeJs is an event based, non-blocking, asynchronus I/O runtime that uses Google's V8 Javascript engine and libuv library."
        }
    ]

    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2">
                <h1 className="tags-h1">Tags</h1>
                <p className="tags-p">A tag is a keyword or label that categorizes your question with the other, similar questions.</p>
                <p className="tags-p">Using the right tags makes it easier for others to find and answer your question.</p>
                <div className="tags-list-container">
                    {
                        tagslist.map((tag) => (
                            <TagList tag={tag} key={tag.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Tags;