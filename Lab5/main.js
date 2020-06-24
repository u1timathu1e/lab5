// let myPromise = new Promise((resolve, reject) => {
//     if (!1 === 1) resolve('resolved');
//     else reject('rejected');
// });

// myPromise.then(message => console.log(message))
//          .catch(message => console.log(message));  

// https://randomuser.me/api/?results=50

// let items = Array.from(document.getElementsByClassName('box'));
let loadMore = true;

document.getElementById('load-btn').addEventListener('click', firstLoad);
let loader = document.getElementById('loader')

window.onscroll = function(ev) {
    if (((window.innerHeight + window.pageYOffset) === document.body.offsetHeight)) {
        let gridCont = document.getElementById('grid-wrapper');
        // let clone = gridCont.children[0];
        // clone.children[0].setAttribute('src', '');
        for(let i = 0; i < 25; i++){
            // gridCont.appendChild(clone);
            // console.log(clone);
            gridCont.innerHTML += '<div class=\"box\"><img src=\"\" alt=\"\"></div>';
        }

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let updatedItems = Array.from(document.getElementsByClassName('box'));
                let result = JSON.parse(xhr.responseText);
                let jsonCounter = 0;
                for(let i = 50; i < 75; i++){
                    updatedItems[i].children[0].setAttribute('src', `${result.results[jsonCounter].picture.large}`);
                    jsonCounter++;
                }
            }
        };
        xhr.open("GET", "https://randomuser.me/api/?results=50", true);
        xhr.send();
        loadMore = false;
    }
};

function firstLoad(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let items = Array.from(document.getElementsByClassName('box'));
            let result = JSON.parse(xhr.responseText);
            for(let i = 0; i < 50; i++){
                items[i].children[0].setAttribute('src', `${result.results[i].picture.large}`);
            }
            loader.style.opacity = 0
        }
        else {
            loader.style.opacity = 1
        }
    };
    xhr.open("GET", "https://randomuser.me/api/?results=50", true);
    xhr.send();
}