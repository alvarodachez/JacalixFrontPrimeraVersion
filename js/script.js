const signButton = document.getElementById("signButton");
const logButton = document.getElementById("logButton");
const editProfileButton = document.getElementById("editProfileButton");
let userActive;
let views;


const completeProfileRequest = () =>{

    let nameToEnter = sessionStorage.getItem('nameActive');
    console.log(nameToEnter);
    
    fetch(`http://localhost:8080/jacalix/customers/${nameToEnter}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => completeProfile(res))
    
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
}
if(document.location == 'file:///home/alvaro/Escritorio/JacalixFrontPrimeraVersion/home.html'){
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
}
if(document.location == 'file:///home/alvaro/Escritorio/JacalixFrontPrimeraVersion/index.html'){

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
