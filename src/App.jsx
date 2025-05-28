import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    image: "",
    gender: "",
  });
  const [ searchChar, setSeachChar ] = useState("");
  const [allCharacters, setAllCharacters] = useState([]);
  useEffect(() => {
    const getCharacters = async () => {
      try {
        const res = await axios.get(
          "https://68219a10259dad2655afc1c9.mockapi.io/characters"
        );
        setAllCharacters(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCharacters();
  }, []);

  const addCharacter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://68219a10259dad2655afc1c9.mockapi.io/characters",
        newCharacter
      );
      setAllCharacters((chars) => [...chars, res.data]); 
      setNewCharacter({name: "", image: "", gender: ""})
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <nav className="flex w-screen justify-between p-4 bg-white">
          <div className="text-3xl">Characters</div>
          <div className="flex gap-4 items-center">
            <form className="bg-gray-100 p-2 gap-2 flex ">
              <input
              value={searchChar}
              onChange={(e) => setSeachChar(e.target.value)}
                type="text"
                placeholder="Search for a character"
                className="bg-white p-1"
              />
              <button>Search</button>
            </form>
            <button className="bg-blue-200  p-2">Add Character</button>
          </div>
        </nav>
        <div>
          <div className="flex justify-center">
            <form onSubmit={addCharacter} className="flex flex-col gap-4 bg-white w-2/3 justify-center p-3">
              <input
                type="text"
                value={newCharacter.name}
                onChange={(e) =>
                  setNewCharacter({ ...newCharacter, name: e.target.value })
                }
                placeholder="Character's name"
              />
              <input
                type="text"
                value={newCharacter.image}
                onChange={(e) =>
                  setNewCharacter({ ...newCharacter, image: e.target.value })
                }
                placeholder="Character's image url"
              />
              <input
                type="text"
                value={newCharacter.gender}
                onChange={(e) =>
                  setNewCharacter({ ...newCharacter, gender: e.target.value })
                }
                placeholder="Character's gender"
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-blue-950 px-4 text-white py-2"
                >
                  Post
                </button>
              </div>
            </form>
          </div>
          <hr className="m-5 " />
          <div>
            <div className="grid grid-cols-2 lg:grid-cols-4 lg:p-11 gap-3">
              {allCharacters.map(char => (
                <div className="shadow-2xl flex flex-col gap-3 items-center p-2" key={char.id}>
                  <div>
                    <img className="w-full h-48 object-cover rounded"  src={char.image} alt="" />
                  </div>
                  <div>{char.name} <span>-{char.gender}</span></div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
