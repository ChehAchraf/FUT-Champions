let createForm = document.getElementById('createForm');
let player_name = document.getElementById('name');
let position = document.getElementById('position');
let pac = document.getElementById('pac');
let shoot = document.getElementById('shoot');
let pass = document.getElementById('pass');
let driblle = document.getElementById('driblle');
let defonce = document.getElementById('defonce');
let physique = document.getElementById('physique');
let position_import = document.getElementById('positionImport');
let pac_import = document.getElementById('pacImport');
let shoot_import = document.getElementById('shootImport');
let pass_import = document.getElementById('passImport');
let driblle_import = document.getElementById('dribbleImport');
let defonce_import = document.getElementById('defenceImport');
let physique_import = document.getElementById('physiqueImport');
let rate_import = document.getElementById('rateimport');


const createTab = document.getElementById('createTab');
const importTab = document.getElementById('importTab');
const createPlayer = document.getElementById('createPlayer');
const importPlayers = document.getElementById('importPlayers');

createTab.addEventListener('click', () => {
  createTab.classList.add('bg-white', 'text-cyan-900');
  createTab.classList.remove('text-gray-300');
  importTab.classList.remove('bg-white', 'text-cyan-900');
  importTab.classList.add('text-gray-300');
  createPlayer.classList.remove('hidden');
  importPlayers.classList.add('hidden');
});

importTab.addEventListener('click', () => {
  importTab.classList.add('bg-white', 'text-cyan-900');
  importTab.classList.remove('text-gray-300');
  createTab.classList.remove('bg-white', 'text-cyan-900');
  createTab.classList.add('text-gray-300');
  createPlayer.classList.add('hidden');
  importPlayers.classList.remove('hidden');
});

get_from_json();

createForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if(player_name.value.trim() == '' || position.value.trim() == '' || pac.value.trim() == '' || defonce.value.trim() == '' || shoot.value.trim() == '' || driblle.value.trim() == '' || physique.value.trim() == '') {
        console.log('empty');
    }
});

document.getElementById('importedName').addEventListener('change', function() {
    fill_field();
    document.getElementById('modal').style.display = 'flex'
});

document.getElementById('importForm').addEventListener('submit',function(e){
    e.preventDefault();
    fill_field();
})

function get_from_json() {
    let conn = new XMLHttpRequest();
    conn.open('GET', 'https://data.3lachstore.com/data.json', true);
    conn.send();
    conn.onreadystatechange = function() {
        if(conn.readyState == 4 && conn.status == 200) {
            data = JSON.parse(conn.responseText);
            add_to_inport(data);
        }
    };
}

function add_to_inport(data) {
    data.players.forEach(function(player) {
        let option = document.createElement('option');
        option.value = player.name;
        option.textContent = player.name;
        document.getElementById('importedName').appendChild(option);
    });
}

function fill_field() {
  let selected_player_name = document.getElementById('importedName').value;
  
  if (selected_player_name) {
      const player_info = data.players.find(function(player) {
          return player.name === selected_player_name;
      });

      if (player_info) {
          position_import.value = player_info.position;
          shoot_import.value = player_info.shooting;
          pass_import.value = player_info.passing;
          driblle_import.value = player_info.dribbling;
          defonce_import.value = player_info.defending;
          physique_import.value = player_info.physical;
          rate_import.value = player_info.rating;

          let img = player_info.photo;
          let name = player_info.name;

          let temp_card = `
            <div class="player-card bg-[url('img/badge_gold.webp')] w-1/5 h-[220px] flex flex-col justify-center items-center" data-name="${name}">
              <div class="flex justify-start">
                <div class="text-xs text-[#393218]">
                  <p class="font-extra-bold">${player_info.rating}</p>
                  <p class="font-semibold">${player_info.position}</p>
                </div>
                <div class="text-center text-xs text-[#393218] font-extra-bold">
                  <img src="${img}" alt="${name}" class="w-[70px]">
                  <p class="text-[9px]">${name}</p>
                </div>
              </div>
              <div class="boxes text-[9px] mt-4 text-[#393218] grid grid-cols-6 grid-rows-2 gap-[1px] justify-center items-center">
                <div>PAC</div><div>SHO</div><div>PAS</div><div>DRI</div><div>DEF</div><div>PHY</div>
                <div class="font-extra-bold">${player_info.pace}</div>
                <div class="font-extra-bold">${player_info.shooting}</div>
                <div class="font-extra-bold">${player_info.passing}</div>
                <div class="font-extra-bold">${player_info.dribbling}</div>
                <div class="font-extra-bold">${player_info.defending}</div>
                <div class="font-extra-bold">${player_info.physical}</div>
              </div>
              <div class="flages grid grid-cols-2 gap-4 items-center">
                <img src="https://cdn.sofifa.net/flags/ar.png" alt="" class="w-[10px]">
                <img src="https://cdn.sofifa.net/meta/team/239235/120.png" alt="" class="w-[10px]">
              </div>
            </div>`;
          document.getElementById('modal').innerHTML = temp_card
          document.getElementById('btn_import').addEventListener('click',function(e){
            e.preventDefault();
            if (isplayerinlist(name)) {
              alert('This player is already in the list.');
              return;
          }
          
            document.getElementById('cards-container').innerHTML += temp_card;
          })
          document.getElementById('modal').style.display = "none";
      } else {
          console.log('Player not found');
      }
  }
}


function isplayerinlist(playerName) {
  let existingPlayers = document.querySelectorAll('#cards-container .player-card');
  for (let playerCard of existingPlayers) {
      let cardName = playerCard.getAttribute('data-name');
      if (cardName === playerName) {
          return true; 
      }
  }
  return false;
}



