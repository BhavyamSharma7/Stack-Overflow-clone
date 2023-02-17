import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import {updateProfile} from "../../actions/users";

const EditProfileForm = ({ currentUser, setSwitch }) => {
    
    const [name, setName] = useState(currentUser?.result?.name);
    const [about, setAbout] = useState(currentUser?.result?.about);
    const [tags, setTags] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tags.length === 0) {
            dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags }));
        } else {
            dispatch(updateProfile(currentUser?.result?._id, { name, about, tags }));
        }
        setSwitch(false);
    }

    return (
        <div>
            <h1 className="edit-profile-title">
                Edit your Profile
            </h1>
            <h2 className="edit-profile-title-2">
                Public Information
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Name</h3>
                    <input id="name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} />
                </label>
                <label htmlFor="about">
                    <h3>About</h3>
                    <textarea id="about" value={about} cols="30" rows="10" onChange={(e)=>{setAbout(e.target.value)}}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Tags</h3>
                    <p>Add tags seperated by 1 space.</p>
                    <input type="text" id="tags" onChange={(e)=>{setTags(e.target.value.split(" "))}} />
                </label><br />
                <input type="submit" value="Save Profile" className="save-profile-btn" />
                <button onClick={()=>setSwitch(false)} className="user-cancel">
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default EditProfileForm;
