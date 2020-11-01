const signButton = document.getElementById("signButton");
const logButton = document.getElementById("logButton");
let userActive;


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
const completeProfile = (res) =>{
    console.log(res);
    let profileName = document.getElementById("profileName");
    let profileSurname = document.getElementById("profileSurname");
    let profileAge = document.getElementById("profileAge");
    let profileDni = document.getElementById("profileDni");
    let profileSubscription = document.getElementById("profileSubscription");

    profileName.innerText = "Name: "+res.name;
    profileSurname.innerText = "Surname; "+ res.surname;
    profileAge.innerText = "Age: " + res.age;
    profileDni.innerText = "Dni: " + res.dni;
    profileSubscription.innerText = "Subscription: "+ res.sub;
}
if(document.location == 'file:///home/alvaro/Escritorio/JacalixFrontPrimeraVersion/home.html'){
    completeProfileRequest();
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
