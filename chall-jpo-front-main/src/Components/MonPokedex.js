import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/MonPokedex.css";
import Card from "react-bootstrap/Card";
import TypePokemon from "./TypePokemon";

function MonPokedex() {
  const serv = "http://localhost:8080";
  const nameUrl = "http://localhost:8080/api/pokemon/";
  const idUrl = "http://localhost:8080/api/infoPokemon/";
  const [pokeRecherche, setPokeRecherche] = useState();
  const [affichePokemon, setAffichePokemon] = useState(null);
  const [storagePokemon, setStoragePokemon] = useState();

  const recherche = async (e) => {
    setAffichePokemon(null);
    e.preventDefault();
    console.log(isNaN(pokeRecherche));
    if (isNaN(pokeRecherche)) {
      const res = await axios.get(nameUrl + pokeRecherche);
      return setAffichePokemon(res.data);
    } else {
      const res = await axios.get(idUrl + pokeRecherche);
      return setAffichePokemon(res.data);
    }
  };

  const ajout = async (e) => {
    e.preventDefault();
    if (localStorage.getItem("MonPokedex") == null) {
      localStorage.setItem("MonPokedex", JSON.stringify([]));
    }
    let test = JSON.parse(localStorage.getItem("MonPokedex"));
    test.push(affichePokemon);
    localStorage.setItem("MonPokedex", JSON.stringify(test));
    setAffichePokemon(null);
    setStoragePokemon(JSON.parse(localStorage.getItem("MonPokedex")));
  };

  const deletePokedex = async (e) => {
    e.preventDefault();
    // const res = await axios.get(
    //   serv +
    //     "/api/pokeDelete?caretaking=&information=&autorize=&ipssi=&warning="
    // );
    // if (res.data.info === true) {
    //   alert("info=" + res.data.result);
    // } else {
    //   alert("info=" + res.data.result);
    // }
    localStorage.removeItem("MonPokedex");
    localStorage.removeItem("warning");
    setStoragePokemon(JSON.parse(localStorage.getItem("MonPokedex")));
  };

  useEffect(() => {
    localStorage.setItem('warning', 'e5K');
    setStoragePokemon(JSON.parse(localStorage.getItem("MonPokedex")));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-4">
          <Form className="espacement" onSubmit={recherche}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Entrez le pokemon a rechercher</Form.Label>
              <Form.Control
                type="text"
                placeholder="nom ou n°pokédex"
                onChange={(e) => setPokeRecherche(e.target.value)}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Rechercher
            </Button>
          </Form>
          {affichePokemon === null || affichePokemon === "" ? (
            <>
              <h5>Aucun Pokemon Sélectionné</h5>
            </>
          ) : (
            <>
              <Card>
                <Card.Img
                  variant="top"
                  src={affichePokemon.sprites.front_default}
                />
                <Card.Body>
                  <Card.Title>{affichePokemon.name}</Card.Title>
                  <Card.Text>
                    <p>n°{affichePokemon.id}</p>
                    {/* {affichePokemon.types.map((element) => (
                       <TypePokemon types={element.type} />
                    ))} */}
                    <TypePokemon types={affichePokemon.types} />
                  </Card.Text>
                  <Form className="espacement" onSubmit={ajout}>
                    <Button variant="outline-primary" type="submit">
                      Ajouter au pokédex
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </>
          )}
        </div>
        <div className="col-8 auto">
          {storagePokemon != null ? (
            <>
              <div className="row">
                {storagePokemon.map((pokemon) => (
                  <div className="col-3">
                    <Card>
                      <Card.Img
                        variant="top"
                        src={pokemon.sprites.front_default}
                      />
                      <Card.Body>
                        <Card.Title>{pokemon.name}</Card.Title>
                        <Card.Text>
                          <p>n°{pokemon.id}</p>
                          <TypePokemon types={pokemon.types} />
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="row mt-3">
                <Form className="espacement" onSubmit={deletePokedex}>
                  <Button variant="outline-danger" type="submit">
                    vider le pokedex
                  </Button>
                </Form>
              </div>
            </>
          ) : (
            <h4>Rien dans votre pokédex</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default MonPokedex;
