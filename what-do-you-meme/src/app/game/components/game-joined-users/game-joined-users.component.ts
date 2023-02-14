import { Component  } from '@angular/core';
import { Player } from 'src/app/lobbies/models/lobbie-info.model';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-game-joined-users',
  templateUrl: './game-joined-users.component.html',
  styleUrls: ['./game-joined-users.component.scss']
})
export class GameJoinedUsersComponent {
  isClosed: boolean = false;

  constructor(public gameService: GameService) {
    this.gameService.joinLobbyEvent().subscribe((data: Player) => {
      this.gameService.players = Object.values(data);
    });
  }

  togglePlayers() {
    this.isClosed = !this.isClosed;
  }
}
