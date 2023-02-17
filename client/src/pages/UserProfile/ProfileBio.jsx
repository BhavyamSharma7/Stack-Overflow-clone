import React from 'react';

const ProfileBio = ({currentProfile}) => {
    return (
        <div>
            <div>
                {
                    currentProfile?.tags.length !== 0 ? (
                        <>
                            <h4>{currentProfile?.tags.length} Tags Watched </h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p style={{fontWeight: "400"}} key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ) :
                    ( <p style={{fontSize: "14px", fontWeight: "500"}}> 0 Tags Watched </p> )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>About</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ) : (
                            <p>No Bio Found :( </p>
                    )
                }
            </div>
        </div>
    );
}

export default ProfileBio;
