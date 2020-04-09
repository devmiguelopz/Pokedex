
(()=>{
  class App {
    constructor(){
      this.ContainerPokeDex = {};
      this.DataApiPromise = [];
    }
  
    Initialized(){
      this.LoadApi();
      this.LoadDesigner()
    }
  
    LoadDesigner(){
      (this.ContainerPokeDex = document.getElementById('pokedex')) && 
      this.DataApiPromise.length &&
      this.DrawnPokemons();
    }
  
    LoadApi() {
      const maxPokemon = 150;
      for (let i = 1; i <= maxPokemon; i += 1) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        this.DataApiPromise.push(fetch(url).then((res) => res.json()));
      }
    }
  
    DrawnPokemons(){
      Promise.all(this.DataApiPromise).then((results) => {
        const pokemon = results.map((result) => ({
          name: result.name,
          image: result.sprites['front_default'],
          type: result.types.map((type) => type.type.name).join(', '),
          id: result.id
        }));
        this.ContainerPokeDex.innerHTML = this.GetHtmlPokemons(pokemon);
      });
    }
  
    GetHtmlPokemons(pokemon){
      return pokemon
        .map(
          (itemPokemon) => `
          <li class="card">
              <img class="card-image" src="${itemPokemon.image}"/>
              <h2 class="card-title">${itemPokemon.id}. ${itemPokemon.name}</h2>
              <p class="card-subtitle">Type: ${itemPokemon.type}</p>
          </li>
      `
        )
        .join('');
    }
  }
  const objApp = new App();
  objApp.Initialized();
})();