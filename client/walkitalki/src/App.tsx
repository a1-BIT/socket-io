import { io } from "socket.io-client"
function App() {

  const server = io('http://localhost:4545/')
  console.log(server?.id);
  
  return (
    <div>App</div>
  )
}
export default App