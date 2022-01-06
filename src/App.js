import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState();
  const [text0, setText0] = useState('');
  const [text1, setText1] = useState('');
  const [retrievedImage, setRetrievedImage] = useState('');

  const get_memes_API = "https://api.imgflip.com/get_memes"

  useEffect(() => {
    const fetchData = async() => {
      fetch(get_memes_API).then(res => res.json()).then((data) => {
        setMemes(data['data']['memes']);
      })
    }

    fetchData()
  }, [])

  function handleChangeSelectedMeme(event) {
    setSelectedMeme(event.target.value)
  }

  function handleChangeText0(event) {
    setText0(event.target.value)
  }

  function handleChangeText1(event) {
    setText1(event.target.value)
  }

  async function generateMeme() {
      let formdata = new FormData();

      formdata.append("template_id", selectedMeme);
      formdata.append("username", 'JorisZwering');
      formdata.append("password", 'joris105');
      formdata.append("text0", text0);
      formdata.append("text1", text1);

      await fetch('https://api.imgflip.com/caption_image',{
          method: "POST", 
          body: formdata
      })
      .then(response => response.json())
      .then(data => {
          setRetrievedImage(data.data['url'])
      })
  }

  function downloadMeme() {
    window.open(retrievedImage);
  }




  return (
    <div className="App">
      <div className="container">
        <div className="child">
          <h1>Meme generator</h1>
          <a href={get_memes_API}>Memes: klik hier!</a>
          <div>
            <select onChange={handleChangeSelectedMeme} style={{width: "100%", marginTop: 10}}>
              {memes && memes.map((meme) => {
                return (
                    <option key={meme.id} value={meme.id}>{meme.name}</option>
                )
              })}
            </select>
            <h5 style={{marginTop: 10, marginBottom: 5}}>Welke tekst wil je hebben voor text0?</h5>
            <input onChange={handleChangeText0} placeholder="Text0"></input>
            <h5 style={{marginTop: 10, marginBottom: 5}}>Welke tekst wil je hebben voor text1?</h5>
            <input onChange={handleChangeText1} placeholder="Text1"></input>
            <img src={retrievedImage} style={{width: 300}}></img>
            <div style={{marginTop: 20}}>
              <button onClick={generateMeme}>Genereer nieuwe meme</button>
              <button onClick={downloadMeme}>Download plaatje</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
