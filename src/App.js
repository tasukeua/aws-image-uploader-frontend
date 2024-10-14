import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

const User = () => {
    const fetchUser = () => {
        axios.get("http://localhost:8080/api/v1/user/all").then(res => {
            console.log(res)
        })
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return <h1>Hello</h1>
}

function App() {
    return (
        <div className="App">
            <User/>
        </div>
    );
}

export default App;
