import './styles.css'
import Card from '../Card'
import React, {useState, useEffect} from "react"

function Home() {
  const [studentName, setStudentName] = useState("")
  const [students, setStudents] = useState([])
  const[user, setUser] = useState({name : '', avatar: ''})

  function handleAddStudent(){
    const newStundet = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents(prevState => [...prevState, newStundet])
  }

  useEffect(()=>{
    fetch("https://api.github.com/users/BR-Jv")
    .then(res => res.json())
    .then(data => setUser({
      name: data.name,
      avatar: data.avatar_url,
    }))
    .catch((error)=> console.error(error))    
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto do perfil"/>
        </div>
      </header>
      <input 
      type="text" 
      placeholder='Digite o nome...'
      onChange={e=> setStudentName(e.target.value)}
      />
      <button type='button' onClick={handleAddStudent}>Adicionar</button>
      
      {students.map((student)=> <Card  key={student.time} name={student.name} time={student.time}/>)}
      
    </div>
  )
}

export default Home
