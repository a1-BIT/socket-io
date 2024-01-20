  import { Button, Container, TextField, Typography } from "@mui/material";
  import React, { useEffect, useState,useMemo } from "react";
  import { io } from "socket.io-client"

  function App() {


    const server = useMemo(() => io('http://localhost:4545'), [])
    const [message, setMessage] = useState("")
    const [magList,setMagList] = useState([])
    
    

    useEffect(()=>{
      server.on('connect',()=>{
        console.log(`User ${server.id} connected`);
        
      })
      server.on('welcome',(data)=>{
        console.log(data);
      })
      server.on('recive',(dd)=>{
        setMagList(dd)
        
      })
      return ()=>{
        server.disconnect()
      }
    },[])

    

    const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        server.emit('message',message)
    }
    
    return (
      <Container maxWidth="md">
        <Typography variant="h6" component='div' gutterBottom>
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
        {
          magList.length> 0 ? magList.map((m,i)=>{
            return (
              <p key={i}>{m}</p>
            )
          }) : null
        }
      </Container>
    )
  }
  export default App