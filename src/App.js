import { useEffect, useState } from "react";
import "./style.css"

function App() {
  const [input, setInput] = useState("")
  const [musica, setMusica] = useState([])

  async function loadMusica(e) {
    e.preventDefault()
    const url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${input}`;

    const response = await fetch(url)
    const data = await response.json()

    setMusica(data.data.slice(0, 15))
  }


  useEffect(()=>{
    console.log(musica)
  }, [musica])

  return (
    <form onSubmit={loadMusica} className="App">

      <header>
        <input
          type="text"
          placeholder="Digite uma musica"
          value={input}
          onChange={(e)=> setInput(e.target.value)}/>

        <button type="submit">Procurar</button>
      </header>

      <div className="container">
        {musica.map((item=>(
          <div className="posts" key={item.id}>
            <div className="cima-post">
              <img src={item.album.cover}/>
              <span>{item.title}</span>
            </div>
            <audio controls src={item.preview} />
          </div>
        )))}
      </div>
    </form>
    

  );
}

export default App;
