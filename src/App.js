import React, {useState, useEffect} from "react";
import './App.css';
import axios from "axios";

const User = () => {
    const [users, setUsers] = useState([])
    const fetchUser = () => {
        axios.get("http://localhost:8080/api/v1/user/all").then(res => {
            console.log(res)
            setUsers(res.data)
        })
    }
    useEffect(() => {
        fetchUser()
    }, [])

    return users.map((user, index) => {
            return (
                <div key={index}>
                    <h1>{user.username}</h1>
                    <p>{user.id}</p>
                </div>
            )
        }
    )
}

function App() {
    return (
        <div className="App">
            <User/>
        </div>
    );
}

export default App;
