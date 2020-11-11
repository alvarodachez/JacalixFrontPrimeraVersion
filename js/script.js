const signButton = document.getElementById("signButton");
const logButton = document.getElementById("logButton");
const editProfileButton = document.getElementById("editProfileButton");
const viewChooseButton = document.getElementById("viewChooseButton");
const windowStay = document.getElementsByTagName("title");

let userActive;
let views;

const imageProductRequest = (productId) =>{

    fetch(`http://localhost:8080/jacalix/products/doc/download/${productId}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => console.log(res))
    //.then(res => completeProducts(res))
}
const completeProductsRequest = () =>{

    fetch(`http://localhost:8080/jacalix/products`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => completeProducts(res))

}
const completeProducts = (res) =>{

    let productContainer = document.getElementById("productContainer");

    for (p of res){
        let singleContainer = document.createElement("div");
        singleContainer.setAttribute("class","col -sm");

        let card = document.createElement("div");
        card.setAttribute("class","card");
        card.style.width = "18rem";

        let image = document.createElement("img");
        image.setAttribute("src","img/vikingosIcono.jpg")
        image.setAttribute("class","card-img-top")
        image.setAttribute("alt","...")

        let bodyCard = document.createElement("div");
        bodyCard.setAttribute("class","card-body");

        let titleCard = document.createElement("h5");
        titleCard.setAttribute("class","card-title notranslate");
        let titleText = document.createTextNode(p.name);
        titleCard.appendChild(titleText);

        let descriptionCard = document.createElement("p");
        descriptionCard.setAttribute("class","card-text notranslate");
        let descriptionText = document.createTextNode(p.description);
        descriptionCard.appendChild(descriptionText);

        let linkCard = document.createElement("a");
        linkCard.setAttribute("class","btn btn-primary");
        linkCard.setAttribute("href","#");
        let linkText = document.createTextNode("See Product");
        linkCard.appendChild(linkText);

        bodyCard.appendChild(titleCard);
        bodyCard.appendChild(descriptionCard);
        bodyCard.appendChild(linkCard);

        card.appendChild(image);
        card.appendChild(bodyCard);

        singleContainer.appendChild(card);

        productContainer.appendChild(singleContainer);
    }
}
const completeProfileRequest = () =>{

    let nameToEnter = sessionStorage.getItem('nameActive');
    //console.log(nameToEnter);
    
    fetch(`http://localhost:8080/jacalix/customers/${nameToEnter}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => completeProfile(res))
    
}
const completeMyProductsRequest = ()=>{
    fetch(`http://localhost:8080/jacalix/customers/products/${userActive}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => completeMyProducts(res))
}
const completeMyProducts = (res) =>{
    let paren = document.getElementById("colMyProducts");
    let parenView = document.getElementById("viewModalCol");
    let oldViewSelect = document.getElementById("viewSelect");
    let newViewSelect = document.createElement("select");
    newViewSelect.setAttribute("id","viewSelect");
    newViewSelect.setAttribute("class","form-control notranslate")
    let myProductsList = document.getElementById("myProductsList");
    let newMyProductsList = document.createElement("ul");
    newMyProductsList.setAttribute("class","list-group list-group-flush");

    if(res!= []){
        for(i of res){
            let elemento = document.createElement("li");
            elemento.setAttribute("class","list-group-item notranslate");
            let texto = document.createTextNode("Name: "+i.name+" | Category: "+i.cat+" | Subscription: "+i.rent);
            elemento.appendChild(texto);
            newMyProductsList.appendChild(elemento);
            let opcion = document.createElement("option");
            opcion.setAttribute("class","notranslate");
            let textoOpcion = document.createTextNode(i.name);
            opcion.appendChild(textoOpcion);
            newViewSelect.appendChild(opcion);
        }
        paren.replaceChild(newMyProductsList,myProductsList);
        parenView.replaceChild(newViewSelect,oldViewSelect);

    }
}
const reHome = (name) =>{
    sessionStorage.setItem('nameActive',name);
    
    window.open("home.html","_self");
    
}
const completeViews = (v) =>{
    let paren = document.getElementById("colViews");
    let viewsList = document.getElementById("viewsList");
    let newViewsList = document.createElement("ul");
    newViewsList.setAttribute("class","list-group list-group-flush")

    if(v != []){
        for(i of v){
            let elemento = document.createElement("li");
            elemento.setAttribute("class","list-group-item notranslate")
            let texto = document.createTextNode("Name: "+i.productViewed.name+" | Category: "+i.productViewed.cat+" | Subscription: "+i.productViewed.rent);
            elemento.appendChild(texto);
            newViewsList.appendChild(elemento);
        }
        paren.replaceChild(newViewsList,viewsList);
    }


    
}
const completeProfile = (res) =>{
    userActive = res.id;
    views = res.views;
    //console.log(views[0].productViewed)
    let profileName = document.getElementById("profileName");
    let profileSurname = document.getElementById("profileSurname");
    let profileAge = document.getElementById("profileAge");
    let profileDni = document.getElementById("profileDni");
    let profileSubscription = document.getElementById("profileSubscription");

    profileName.innerText = "Name: "+res.name;
    profileSurname.innerText = "Surname; "+ res.surname;
    profileAge.innerText = "Age: " + res.age;
    profileDni.innerText = "Dni: " + res.dni;
    profileSubscription.innerText = "Subscription: "+ res.sub.rentType;
    completeViews(views);
    completeMyProductsRequest();
}
if(windowStay[0].innerHTML == "Jacalix | Productos"){

    completeProductsRequest();
}
if(windowStay[0].innerHTML == "Jacalix | Mi Cuenta"){
    completeProfileRequest();
    

    editProfileButton.addEventListener("click", () => {
        let editName = document.getElementById("editName").value;
        let editSurname = document.getElementById("editSurname").value;
        let editAge = document.getElementById("editAge").value;
        let editDni = document.getElementById("editDni").value;
        let editSubscription = document.getElementById("editSubscription").value;

        const user = {
            name : editName,
            surname : editSurname,
            age : editAge,
            dni : editDni
        }

        const sub = {
            rentType : editSubscription,
            startSuscription : "2020-10-06",
            endSuscription : "2020-10-06",
            price : 10
        }

        fetch('http://localhost:8080/jacalix/customers/subs/'+userActive,{
            method: 'PUT',
            body: JSON.stringify(sub),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())

        fetch('http://localhost:8080/jacalix/customers/'+parseInt(userActive,10),{
            method: 'PUT',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())

        
        

        location.reload();
    })
    viewChooseButton.addEventListener("click", ()=>{
        let select = document.getElementById("viewSelect").value;

        fetch(`http://localhost:8080/jacalix/customers/viewName/${userActive}&&${select}`,{
            method:'PUT',
           // body: JSON.stringify(),
            headers: {
                "Content-Type":"application/json"
            }
        })
        .then(response => response.json())

        location.reload();
    })


}

if(windowStay[0].innerHTML == "Jacalix"){

    let eventoLog =   logButton.addEventListener("click", () =>{
        let logName = document.getElementById("logName").value;
        reHome(logName);
    })

    signButton.addEventListener("click",() =>{

        let signName = document.getElementById("signName").value;
        let signSurname = document.getElementById("signSurname").value;
        let signAge = document.getElementById("signAge").value;
        let signDni = document.getElementById("signDni").value;
    
        const user = {
            name : signName,
            surname : signSurname,
            age : parseInt(signAge,10),
            dni : signDni
        }
    
        
        fetch('http://localhost:8080/jacalix/customers',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        //.then(json => console.log(json))
    
        
        alert("Congrats! You have been sign up in our system. Please Long In.")
    })


}
