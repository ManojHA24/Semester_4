import React, { useState } from 'react';

const BasicForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [allEntry, setAllEntry] = useState([]);
    const submitForm = (e) => {
        e.preventDefault();
        const newEntry = {email:email, password:password};
            setAllEntry([...allEntry, newEntry]) ;
            console.log(newEntry);
    }

    return (
        <>
        <div id="loginbox">
            <form action="" onSubmit={submitForm}>
                <div className="rightbox">
                    <label htmlFor="email">Email</label><br></br>
                    <input type="text" name="email" id="email" autoComplete="off"
                       value={email}   
                       onChange={(e) => setEmail(e.target.value)}               
                    /><br></br>
                
                    <label htmlFor="password">Password</label><br></br>
                    <input type="password" name="password" id="password" autoComplete="off"
                       value={password} 
                       onChange={(e) => setPassword(e.target.value)}         
                    /><br></br>
                    <button type="submit">Login</button>
                    <div id="login-button"></div>
                </div> 
            </form>
        </div>    
            <div>
                {
                    allEntry.map((curElem) => {
                        return(
                            <div className="">  
                                <p>{curElem.email}</p>  
                                <p>{curElem.password}</p>                    
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default BasicForm;