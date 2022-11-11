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
  onDisconnect,
  onValue,
  ref,
  set,
} from '@angular/fire/database';
import { keyPressListener } from '../../utilities/KeyPressListener';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LobbyComponent implements OnInit {
  playerId;
  playerRef;
  players = {};

  // liste de références au DOM d'éléments
  playerElements = {};
  coins = {};
  coinElements = {};

  const; // Options for Player Colors... these are in the same order as our sprite sheet
  playerColors = ['blue', 'red', 'orange', 'yellow', 'green', 'purple'];

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
    console.log('event key ', event.key);
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

  ngOnInit() {
    const auth = getAuth();
    signInAnonymously(auth).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });

    onAuthStateChanged(auth, (user) => {
      const database = getDatabase();
      if (user) {
        console.log('user? ', user);
        //user logged in
        this.playerId = user.uid;

        // Référence au user sur firebase
        this.playerRef = ref(database, 'players/' + this.playerId);

        set(ref(database, 'players/' + this.playerId), {
          id: this.playerId,
          name: this.createName(),
          direction: 'right',
          color: this.randomFromArray(this.playerColors),
          x: 3,
          y: 10,
          coins: 0,
        });

        onDisconnect(ref(database, 'players/' + this.playerId)).remove();
        this.initGame();
      } else {
        // User is signed out
      }
    });
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

      console.log('players  ', this.players[this.playerId]);
      //set(ref(database, 'players/' + this.playerId), {id: this.});

      set(ref(database, 'players/' + this.playerId), {
        id: this.players[this.playerId].id,
        name: this.players[this.playerId].name,
        direction: this.players[this.playerId].direction,
        color: this.players[this.playerId].color,
        x: this.players[this.playerId].x,
        y: this.players[this.playerId].y,
        coins: this.players[this.playerId].coins,
      });
      //this.playerRef.set(this.players[this.playerId]);
      // attemptGrabCoin(newX, newY);
    }
  }

  initGame() {
    const database = getDatabase();
    const allPlayersRef = ref(database, 'players');
    const allCoinsRef = ref(database, 'coins');
    const gameContainer = document.getElementById(
      'game-container'
    ) as HTMLInputElement;
    const playerNameInput = document.getElementById(
      'player-name'
    ) as HTMLInputElement;
    const playerColorButton = document.getElementById(
      'player-color'
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

      console.log('character element ', characterElement);
      gameContainer.appendChild(characterElement);
    });
  }
}
