let addedToSquadArr = [];
let notAddTosquad = [];
let createdPlayer = [];
let obj = {};
let bench = document.getElementById('bench')
let playersdata = new XMLHttpRequest();
playersdata.open("GET", "https://achraf.brofortech.com/pl.json", true);
playersdata.send();


playersdata.onreadystatechange = function () {
  if (playersdata.readyState === 4 && playersdata.status === 200) {
    let ourdata = JSON.parse(playersdata.response);
    let data = ourdata.players;
    document.getElementById("create").addEventListener("click", function (e) {
      e.preventDefault();
      let name = document.getElementById("name");
      let position = document.getElementById("position");
      let pac = document.getElementById("pac");
      let shoot = document.getElementById("shoot");
      let pass = document.getElementById("pass");
      let dribble = document.getElementById("dribble");
      let defence = document.getElementById("defence");
      let physique = document.getElementById("physique");
      let photo = document.getElementById('profile');
      let flag = document.getElementById('flag');
      let rate = document.getElementById('rate');
      let nameRegex = /^[A-Za-z\s]+$/;
      let statRegex = /^[1-9][0-9]?$|^100$/;
       obj = {
        id: createdPlayer.length,
        name: name.value,
        position: position.value,
        pace: pac.value,
        shooting: shoot.value,
        passing: pass.value,
        dribbling: dribble.value,
        defending: defence.value,
        physical: physique.value,
        photo: photo.value,
        flag : flag.value,
        logo : logo.value,
        club : club.value,
        rating : rate.value,
        status : "bench"
      };
      if (!name.value || !nameRegex.test(name.value)) {
        document.getElementById("warningmodal").style.display = "flex";
        document.getElementById("errormsg").innerText = "Add Only letters";
        return;
      }
      if (!position.value) {
        document.getElementById("warningmodal").style.display = "flex";
        document.getElementById("errormsg").innerText =
          "Please select a player position";
        return;
      }
      if (
        !statRegex.test(pac.value) ||
        !statRegex.test(shoot.value) ||
        !statRegex.test(pass.value) ||
        !statRegex.test(dribble.value) ||
        !statRegex.test(defence.value) ||
        !statRegex.test(physique.value)
      ) {
        document.getElementById("warningmodal").style.display = "flex";
        document.getElementById("errormsg").innerText =
          "Please enter valid stats (numbers between 1 and 100).";
        return;
      }
      data.push(obj)
      console.log(data)
    });
    push(data)

function push(data) {
  data.forEach(player => {
    let temp_div = document.createElement("div");
    temp_div.setAttribute(
      "class",
      "cursor-pointer bg-[url('img/badge_gold.webp')] bg-no-repeat bg-center bg-cover w-32 h-44 flex flex-col pt-8 items-center"
    );
  
    if (player.status == "bench") {

      bench.appendChild(temp_div);
      temp_div.innerHTML = generatePlayerCardHTML(player);
    } else if (player.position !== "GK") {

      temp_div.innerHTML = generatePlayerCardHTML(player);

    } else {

      temp_div.innerHTML = generatePlayerCardHTML(player);
    }
    addDeleteIcon(temp_div, player);
  
  });
}
function generatePlayerCardHTML(player) {
  if (player.position !== "GK") {
    return `
      <div class="flex">
        <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
          <span class="mb-[-5px] font-bold">${player.rating}</span>
          <span class="text-[10px] font-medium">${player.position}</span>
        </div>
        <img class="w-20" src="${player.photo}" alt="${player.name}">
      </div>
      <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
      <div class="text-[#362f16] gap-1 flex">
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">PAC</span>
          <span class="font-bold text-[10px]">${player.pace}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">SHO</span>
          <span class="font-bold text-[10px]">${player.shooting}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">PAS</span>
          <span class="font-bold text-[10px]">${player.passing}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">DRI</span>
          <span class="font-bold text-[10px]">${player.dribbling}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">DEF</span>
          <span class="font-bold text-[10px]">${player.defending}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">PHY</span>
          <span class="font-bold text-[10px]">${player.physical}</span>
        </div>
      </div>
      <div class="flex justify-center items-center w-3 gap-2">
        <img src="${player.flag}" alt="${player.name}">
        <img src="${player.logo}" alt="${player.club}">
      </div>
    `;
  } else {
    return `
      <div class="flex">
        <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
          <span class="mb-[-5px] font-bold">${player.rating}</span>
          <span class="text-[10px] font-medium">${player.position}</span>
        </div>
        <img class="w-20" src="${player.photo}" alt="${player.name}">
      </div>
      <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
      <div class="text-[#362f16] gap-1 flex">
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">DIV</span>
          <span class="font-bold text-[10px]">${player.diving}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">HAN</span>
          <span class="font-bold text-[10px]">${player.handling}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">KIC</span>
          <span class="font-bold text-[10px]">${player.kicking}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">REF</span>
          <span class="font-bold text-[10px]">${player.reflexes}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">SPE</span>
          <span class="font-bold text-[10px]">${player.speed}</span>
        </div>
        <div class="flex flex-col gap-0 justify-center items-center">
          <span class=" text-[7px] font-medium mb-[-4px]">POS</span>
          <span class="font-bold text-[10px]">${player.positioning}</span>
        </div>
      </div>
      <div class="flex justify-center items-center w-3 gap-2">
        <img src="${player.flag}" alt="${player.name}">
        <img src="${player.logo}" alt="${player.club}">
      </div>
    `;
  }
}

function addDeleteIcon(div, player) {
  let deleteIcon = document.createElement("img");
  deleteIcon.setAttribute("src", "/img/delete.svg");
  deleteIcon.setAttribute("alt", "Delete Icon");
  deleteIcon.setAttribute("class", "w-5 bg-red-500 rounded-full  hover:scale-110 relative bottom-[140px] left-[45px] hidden");
  div.appendChild(deleteIcon);
  div.addEventListener("mouseover", () => {
    deleteIcon.classList.remove("hidden");
  });

  div.addEventListener("mouseleave", () => {
    deleteIcon.classList.add("hidden");
  });
}


    function addFiltreplayerToPosition(positionFilter) {
      const filteredPlayers = data.filter(
        (player) => player.position === positionFilter
      );
      const playerstoadd = document.getElementById("playerstoadd");
      playerstoadd.innerHTML = "";

      filteredPlayers.forEach((player) => {
        let div = document.createElement("div");
        div.setAttribute(
          "class",
          "cursor-pointer bg-[url('img/badge_gold.webp')] bg-no-repeat bg-center bg-cover w-32 h-44 flex flex-col pt-8 items-center"
        );
        if (positionFilter !== "GK") {
          div.innerHTML = `
          <div class="flex">
            <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
              <span class="mb-[-5px] font-bold">${player.rating}</span>
              <span class="text-[10px] font-medium">${player.position}</span>
            </div>
            <img class="w-20" src="${player.photo}" alt="${player.name}">
          </div>
          <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
          <div class="text-[#362f16] gap-1 flex">
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">PAC</span>
              <span class="font-bold text-[10px]">${player.pace}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">SHO</span>
              <span class="font-bold text-[10px]">${player.shooting}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">PAS</span>
              <span class="font-bold text-[10px]">${player.passing}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">DRI</span>
              <span class="font-bold text-[10px]">${player.dribbling}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">DEF</span>
              <span class="font-bold text-[10px]">${player.defending}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">PHY</span>
              <span class="font-bold text-[10px]">${player.physical}</span>
            </div>
          </div>
          <div class="flex justify-center items-center w-3 gap-2">
            <img src="${player.flag}" alt="${player.name}">
            <img src="${player.logo}" alt="${player.club}">
          </div>
        `;
        } else {
          div.innerHTML = `
          <div class="flex">
            <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
              <span class="mb-[-5px] font-bold">${player.rating}</span>
              <span class="text-[10px] font-medium">${player.position}</span>
            </div>
            <img class="w-20" src="${player.photo}" alt="${player.name}">
          </div>
          <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
          <div class="text-[#362f16] gap-1 flex">
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">DIV</span>
              <span class="font-bold text-[10px]">${player.diving}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">HAN</span>
              <span class="font-bold text-[10px]">${player.handling}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">KIC</span>
              <span class="font-bold text-[10px]">${player.kicking}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">REF</span>
              <span class="font-bold text-[10px]">${player.reflexes}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">SPE</span>
              <span class="font-bold text-[10px]">${player.speed}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">POS</span>
              <span class="font-bold text-[10px]">${player.positioning}</span>
            </div>
          </div>
          <div class="flex justify-center items-center w-3 gap-2">
            <img src="${player.flag}" alt="${player.name}">
            <img src="${player.logo}" alt="${player.club}">
          </div>
        `;
        }
        
        div.addEventListener("click", function () {
          let index = data.findIndex((p) => p.name === player.name);
          console.log(index)
          let positionElement = document.querySelector(
            `[player-position="${player.position}"]`
          );

          positionElement.classList.remove("bg-[url('img/bg.png')]");
          positionElement.classList.add("bg-[url('img/badge_gold.webp')]");

          if (positionFilter !== "GK") {
            positionElement.innerHTML = `
            <div class="flex">
              <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
                <span class="mb-[-5px] font-bold">${player.rating}</span>
                <span class="text-[10px] font-medium">${player.position}</span>
              </div>
              <img class="w-20" src="${player.photo}" alt="${player.name}">
            </div>
            <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
            <div class="text-[#362f16] gap-1 flex">
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">PAC</span>
                <span class="font-bold text-[10px]">${player.pace}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">SHO</span>
                <span class="font-bold text-[10px]">${player.shooting}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">PAS</span>
                <span class="font-bold text-[10px]">${player.passing}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">DRI</span>
                <span class="font-bold text-[10px]">${player.dribbling}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">DEF</span>
                <span class="font-bold text-[10px]">${player.defending}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">PHY</span>
                <span class="font-bold text-[10px]">${player.physical}</span>
              </div>
            </div>
            <div class="flex justify-center items-center w-3 gap-2">
              <img src="${player.flag}" alt="${player.name}">
              <img src="${player.logo}" alt="${player.club}">
            </div>
          `;
          
          console.log(data[index].status)
          data[index].status = "field"
          console.log(data[index].status)
          data.push(obj)
          generatePlayerCardHTML(player)
          } else {
            positionElement.innerHTML = `
          <div class="flex">
            <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
              <span class="mb-[-5px] font-bold">${player.rating}</span>
              <span class="text-[10px] font-medium">${player.position}</span>
            </div>
            <img class="w-20" src="${player.photo}" alt="${player.name}">
          </div>
          <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
          <div class="text-[#362f16] gap-1 flex">
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">DIV</span>
              <span class="font-bold text-[10px]">${player.diving}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">HAN</span>
              <span class="font-bold text-[10px]">${player.handling}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">KIC</span>
              <span class="font-bold text-[10px]">${player.kicking}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">REF</span>
              <span class="font-bold text-[10px]">${player.reflexes}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">SPE</span>
              <span class="font-bold text-[10px]">${player.speed}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">POS</span>
              <span class="font-bold text-[10px]">${player.positioning}</span>
            </div>
          </div>
          <div class="flex justify-center items-center w-3 gap-2">
            <img src="${player.flag}" alt="${player.name}">
            <img src="${player.logo}" alt="${player.club}">
          </div>`;
          }
          data.status = "field"
          generatePlayerCardHTML(player)
          let img = document.createElement("img");
          let pen = document.createElement("img")
          img.setAttribute(
            "class",
            "w-5 bg-red-500 rounded-full  hover:scale-110 relative bottom-[150px] left-[45px] hidden"
          );
          pen.setAttribute(
            "class",
            "w-5 bg-green-500 rounded-full  hover:scale-110 relative  bottom-[131px] right-[45px] hidden"
          );
          img.setAttribute("src", "/img/delete.svg");
          img.setAttribute("alt", "deleteico");
          pen.setAttribute("src", "/img/pen.svg");
          pen.setAttribute("alt", "penicon");
          positionElement.addEventListener("mouseover", function () {
            img.classList.remove("hidden");
            img.classList.add("block");
            pen.classList.remove("hidden");
            pen.classList.add("block");
          });
          positionElement.addEventListener("mouseleave", function () {
            img.classList.remove("block");
            img.classList.add("hidden");
            pen.classList.remove("block");
            pen.classList.add("hidden");
          });
          pen.addEventListener('click',function(e){
            e.stopPropagation();
            document.getElementById('edit_form').style.display = 'flex';
            document.getElementById('edit_name').value = player.name
          })
          img.addEventListener("click", function (event) {
            event.stopPropagation();

            const playerIndex = addedToSquadArr.findIndex(
              (play) => play.name === player.name
            );

            addedToSquadArr.splice(playerIndex, 1);
            document
              .getElementById("filtredplayermodal")
              .classList.add("hidden");
            document
              .getElementById("filtredplayermodal")
              .classList.remove("flex");

            positionElement.innerHTML = "";
            let addImg = document.createElement("img");

            addImg.setAttribute(
              "class",
              "mt-9 w-8 cursor-pointer bg-black rounded-full hover:bg-red-500"
            );
            addImg.setAttribute("src", "/img/add.svg");

            positionElement.appendChild(addImg);

            positionElement.classList.add("bg-[url('img/bg.png')]");
            positionElement.classList.remove("bg-[url('img/badge_gold.webp')]");
            
            document
              .getElementById("filtredplayermodal")
              .classList.add("hidden");
            document
              .getElementById("filtredplayermodal")
              .classList.remove("flex");
          });
          positionElement.appendChild(pen)
          positionElement.appendChild(img);

          function updateSquadPlayers() {
            addedToSquadArr.push(player);
            console.log(addedToSquadArr);
          }
          function noChoosenPlayers() {}

          document.getElementById("filtredplayermodal").classList.add("hidden");
          document
            .getElementById("filtredplayermodal")
            .classList.remove("flex");
        });
        playerstoadd.appendChild(div);
      });
    }
   
    document.querySelectorAll(".position-button").forEach((button) => {
      button.addEventListener("click", function () {
        const position = button.getAttribute("player-position");
        addFiltreplayerToPosition(position);

        document.getElementById("filtredplayermodal").classList.add("flex");
        document
          .getElementById("filtredplayermodal")
          .classList.remove("hidden");
      });
    });
    document.querySelectorAll(".substitution").forEach((button) => {
      button.addEventListener("click", function () {
        document.getElementById("filtredplayermodal").classList.add("flex");
        document
          .getElementById("filtredplayermodal")
          .classList.remove("hidden");
      });
    });
  }
};
function edit(data){
  div.addEventListener('click' , function () {
    alert('hello')
  })
}