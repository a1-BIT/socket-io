  import { Button, Container, TextField, Typography } from "@mui/material";
  import React, { useEffect, useState,useMemo } from "react";
  import { io } from "socket.io-client"
  function App() {


    const server = useMemo(() => io('http://localhost:4545'), [])
    
    

    useEffect(()=>{
      server.on('connect',()=>{
        console.log(`User ${server.id} connected`);
        
      })
      server.on('welcome',(data)=>{
        console.log(data);
        
      })
      return ()=>{
        server.disconnect()
      }
    })

    const [message, setMessage] = useState("")

    const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        server.emit('message',message)
    }
    
    return (
      <Container maxWidth="md">
        <Typography variant="h1" component='div' gutterBottom>
          Welcome You
        </Typography>
        <form onSubmit={hanldeSubmit}>
          <TextField 
          value={message}
          onChange={e=> setMessage(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
      </Container>
    )
  }
  export default App