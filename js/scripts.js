let pokemonList = [
  {
    name: "Houndoom",
    height: "1.4",
    types: ["dark", "fire"]
  },
  {
    name: "Hitmonchan",
    height: "1.4",
    type: ["fighting"]
  },
  {
    name: "Aggron",
    height: "2.1",
    types: ["steel", "rock"]
  },
];

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height >= 2) {
    document.write(" - Wow, that's big!") };
    document.write(pokemonList[i].name + "(height: "+pokemonList[i].height+")");
    document.write("<br/>");
}
