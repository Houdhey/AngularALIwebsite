import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import {
  onChildAdded,
  onChildRemoved,
  onDisconnect,
  onValue,
  ref,
  set,
  update,
} from '@angular/fire/database';
import { keyPressListener } from '../../utilities/KeyPressListener';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LobbyComponent implements OnInit {
  isUserConnected = false;
  playerId;
  playerRef;
  players = {};

  // liste de références au DOM d'éléments
  playerElements = {};
  coins = {};
  coinElements = {};

  const; // Options for Player Colors... these are in the same order as our sprite sheet
  playerColors = ['blue', 'red', 'orange', 'yellow', 'green', 'purple'];

  lastMessage;
  // Coins non franchissables, exemple : 5x7 = chaise turquoise premiere
  mapData = {
    minX: 1,
    maxX: 14,
    minY: 4,
    maxY: 12,
    blockedSpaces: {
      '7x4': true,
      '1x11': true,
      '12x10': true,
      '4x7': true,
      '5x7': true,
      '6x7': true,
      '8x6': true,
      '9x6': true,
      '10x6': true,
      '7x9': true,
      '8x9': true,
      '9x9': true,
    },
  };
  constructor() {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.handleArrowPress(0, -1);
        break;
      case 'ArrowDown':
        this.handleArrowPress(0, 1);
        break;
      case 'ArrowLeft':
        this.handleArrowPress(-1, 0);
        break;
      case 'ArrowRight':
        this.handleArrowPress(1, 0);
        break;
    }
  }

  ngOnInit() {
    //this.playAudio();
    const auth = getAuth();
    signInAnonymously(auth).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });

    onAuthStateChanged(auth, (user) => {
      const database = getDatabase();
      const playerNameInput = document.getElementById(
        'player-name'
      ) as HTMLInputElement;
      const playerColorButton = document.getElementById(
        'player-color'
      ) as HTMLInputElement;
      if (user) {
        console.log('user? ', user);
        //user logged in
        this.playerId = user.uid;

        // Référence au user sur firebase
        this.playerRef = ref(database, 'players/' + this.playerId);

        const { x, y } = this.getRandomSafeSpot();

        const name = this.createName();

        set(ref(database, 'players/' + this.playerId), {
          id: this.playerId,
          name,
          direction: 'right',
          color: this.randomFromArray(this.playerColors),
          x,
          y,
          coins: 0,
        });

        onDisconnect(ref(database, 'players/' + this.playerId)).remove();
        this.initGame();
      } else {
        // User is signed out
      }
    });
  }

  initGame() {
    const database = getDatabase();
    const allPlayersRef = ref(database, 'players');
    const allCoinsRef = ref(database, 'coins');
    const gameContainer = document.getElementById(
      'game-container'
    ) as HTMLInputElement;

    onValue(allPlayersRef, (snapshot) => {
      //Fires whenever a change occurs
      this.players = snapshot.val() || {};

      Object.keys(this.players).forEach((key) => {
        const characterState = this.players[key];
        const el = this.playerElements[key];
        // Now update the DOM
        el.querySelector('.Character_name').innerText = characterState.name;
        el.querySelector('.Character_coins').innerText = characterState.coins;
        el.setAttribute('data-color', characterState.color);
        el.setAttribute('data-direction', characterState.direction);
        const left = 16 * characterState.x + 'px';
        const top = 16 * characterState.y - 4 + 'px';
        el.style.transform = `translate3d(${left}, ${top}, 0)`;
      });
    });

    onChildAdded(allPlayersRef, (snapshot) => {
      //Fires whenever a new node is added the tree
      const addedPlayer = snapshot.val();
      const characterElement = document.createElement('div');
      characterElement.classList.add('Character', 'grid-cell');
      if (addedPlayer.id === this.playerId) {
        characterElement.classList.add('you');
      }

      characterElement.innerHTML = `
        <div class="Character_shadow grid-cell"></div>
        <div class="Character_sprite grid-cell"></div>
        <div class="Character_name-container">
          <span class="Character_name"></span>
          <span class="Character_coins">0</span>

        </div>
        <div class="Character_you-arrow"></div>

      `;
      this.playerElements[addedPlayer.id] = characterElement;

      //Fill in some initial state
      characterElement.querySelector('.Character_name').innerHTML =
        addedPlayer.name;
      characterElement.querySelector('.Character_coins').innerHTML =
        addedPlayer.coins;
      characterElement.setAttribute('data-color', addedPlayer.color);
      characterElement.setAttribute('data-direction', addedPlayer.direction);
      const left = 16 * addedPlayer.x + 'px';
      const top = 16 * addedPlayer.y - 4 + 'px';
      characterElement.style.transform = `translate3d(${left}, ${top}, 0)`;
      gameContainer.appendChild(characterElement);
    });

    onChildRemoved(allPlayersRef, (snapshot) => {
      //Remove character DOM element after they leave
      const removedKey = snapshot.val().id;
      gameContainer.removeChild(this.playerElements[removedKey]);
      delete this.playerElements[removedKey];
    });
  }

  changeColor() {
    const mySkinIndex = this.playerColors.indexOf(
      this.players[this.playerId].color
    );
    const nextColor =
      this.playerColors[mySkinIndex + 1] || this.playerColors[0];
    const database = getDatabase();
    update(ref(database, 'players/' + this.playerId), {
      color: nextColor,
    });
  }
  onNameChange() {
    //Updates player name with text input

    const playerNameInput = document.getElementById(
      'player-name'
    ) as HTMLInputElement;
    const newName = playerNameInput.value || this.createName();
    const database = getDatabase();
    update(ref(database, 'players/' + this.playerId), {
      name: newName,
    });
    /*      playerNameInput.value = newName;
      playerRef.update({
        name: newName,
      });*/
  }

  userChatting(message) {
    this.lastMessage = message.target.value;
    const database = getDatabase();
    set(ref(database, 'messages/'), {
      sender: this.playerId,
      message: this.lastMessage,
    });
  }
  playAudio() {
    const audio = new Audio();
    audio.volume = 0.3;
    audio.src = '../../../assets/sounds/underwaterTheme.mp3';
    audio.load();
    audio.play();
  }
  isSolid(x, y) {
    const blockedNextSpace =
      this.mapData.blockedSpaces[this.getKeyString(x, y)];
    return (
      blockedNextSpace ||
      x >= this.mapData.maxX ||
      x < this.mapData.minX ||
      y >= this.mapData.maxY ||
      y < this.mapData.minY
    );
  }

  handleArrowPress(xChange = 0, yChange = 0) {
    const database = getDatabase();
    const newX = this.players[this.playerId].x + xChange;
    const newY = this.players[this.playerId].y + yChange;
    if (!this.isSolid(newX, newY)) {
      //move to the next space
      this.players[this.playerId].x = newX;
      this.players[this.playerId].y = newY;
      if (xChange === 1) {
        this.players[this.playerId].direction = 'right';
      }
      if (xChange === -1) {
        this.players[this.playerId].direction = 'left';
      }

      update(ref(database, 'players/' + this.playerId), {
        direction: this.players[this.playerId].direction,
        x: this.players[this.playerId].x,
        y: this.players[this.playerId].y,
      });
    }
  }

  getRandomSafeSpot() {
    //We don't look things up by key here, so just return an x/y
    return this.randomFromArray([
      { x: 1, y: 4 },
      { x: 2, y: 4 },
      { x: 1, y: 5 },
      { x: 2, y: 6 },
      { x: 2, y: 8 },
      { x: 2, y: 9 },
      { x: 4, y: 8 },
      { x: 5, y: 5 },
      { x: 5, y: 8 },
      { x: 5, y: 10 },
      { x: 5, y: 11 },
      { x: 11, y: 7 },
      { x: 12, y: 7 },
      { x: 13, y: 7 },
      { x: 13, y: 6 },
      { x: 13, y: 8 },
      { x: 7, y: 6 },
      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 8, y: 8 },
      { x: 10, y: 8 },
      { x: 8, y: 8 },
      { x: 11, y: 4 },
    ]);
  }

  //Misc Helpers
  randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  getKeyString(x, y) {
    return `${x}x${y}`;
  }

  createName() {
    const prefix = this.randomFromArray([
      'COOL',
      'SUPER',
      'HIP',
      'SMUG',
      'COOL',
      'SILKY',
      'GOOD',
      'SAFE',
      'DEAR',
      'DAMP',
      'WARM',
      'RICH',
      'LONG',
      'DARK',
      'SOFT',
      'BUFF',
      'DOPE',
    ]);
    const animal = this.randomFromArray([
      'BEAR',
      'DOG',
      'CAT',
      'FOX',
      'LAMB',
      'LION',
      'BOAR',
      'GOAT',
      'VOLE',
      'SEAL',
      'PUMA',
      'MULE',
      'BULL',
      'BIRD',
      'BUG',
    ]);
    return `${prefix} ${animal}`;
  }
}
