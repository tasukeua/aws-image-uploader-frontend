import React, {useState, useEffect, useCallback} from "react";
import './App.css';
import axios from "axios";
import {useDropzone} from 'react-dropzone'

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
                    {user.id ? (
                        <img
                            src={`http://localhost:8080/api/v1/user/${user.id}/image/download`}
                            alt={'User'}/>
                    ) : null}
                    <br/>
                    <br/>
                    <h1>{user.username}</h1>
                    <p>{user.id}</p>
                    <Dropzone userId={user.id}/>
                    <br/>
                </div>
            )
        }
    )
}

function Dropzone({userId}) {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]
        console.log(file)
        const formData = new FormData()
        formData.append('file', file)
        axios.post(`http://localhost:8080/api/v1/user/${userId}/image/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        ).then(() => {
            console.log('File uploaded successfully')
        }).catch(err => {
            console.log('File was not uploaded, error: ' + err)
        })
    }, [userId])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the image here ...</p> :
                    <p>Drag 'n' drop user image, or click to select image</p>
            }
        </div>
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
