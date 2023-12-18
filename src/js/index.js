const list = document.querySelector("#list")
async function deleteGame(item){
    try{
        await axios.delete(`http://localhost:8081/game/${item.id}`)
        alert("Game deletado")
    }catch(err){
        console.error(err)
    }
}
async function editGame(item){
    try{
        await axios.put(`http://localhost:8081/game/${item.id}`, {
            title: item.title, 
            year: item.year,
            price: item.price
        })
        alert("Game Editado")
    }catch(err){
        console.error(err)
    }
}
function editFormGame(game){
    const {title, year, price} = game
    const titleEdit = document.getElementById("titleEdit")
    const yearEdit = document.getElementById("yearEdit")
    const priceEdit = document.getElementById("priceEdit")

    titleEdit.value = title
    yearEdit.value = year
    priceEdit.value = price

    const buttonSave = document.getElementById("buttonSave")
    buttonSave.addEventListener("click", ()=>{editGame({
        title: titleEdit.value,
        year: yearEdit.value,
        price: priceEdit.value,
        id: game.id
    })})
}
async function ListGames(){
    try{
        const games = await axios.get("http://localhost:8081/games")
        const dados = games.data
        dados.forEach(game => {
            const item = document.createElement("li")

            item.innerHTML =  game.title + " - " + game.year + " - " + game.price

            list.appendChild(item)
            const deleteButton = document.createElement("button")
            deleteButton.innerHTML = "DELETAR"
            list.appendChild(deleteButton)
            deleteButton.addEventListener("click", ()=>{deleteGame(game)} )

            const editButton = document.createElement("button")
            editButton.innerHTML = "EDITAR"
            list.appendChild(editButton)
            editButton.addEventListener("click", ()=>{editFormGame(game)} )
        });
    }catch(err){
        console.error(err)
    }

}
ListGames()
async function CreateGames(){
    const game = {
        title: document.getElementById("title").value,
        year: document.getElementById("year").value,
        price: document.getElementById("price").value
    }
    try{
        const res = await axios.post("http://localhost:8081/game", game)
        if(res.status == "200")alert("Game cadastrado")
    }catch(err){
        console.error(err)
    }
}