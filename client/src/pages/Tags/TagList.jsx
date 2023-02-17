function TagList({tag}) {
    return (
        <div className="tag">
            <h5>{tag.tagName}</h5>
            <p>{tag.tagDesc}</p>
        </div>
    );
}

export default TagList;