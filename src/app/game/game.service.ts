import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { IoOutput } from '../io/enums/event-name.enum';
import { Lobby } from './classes/lobby';
import { GameStatus } from './enum/game-status.enum';
import { GameControlService } from './game-control.service';
import { Meme } from './dto/player.dto';

@Injectable()
export class GameService {
  constructor(private gameControlService: GameControlService) {}

  private changePhase(io: Server, lobby: Lobby): void {
    this.gameControlService.changePhase(lobby);
    //? ↓↓↓ автотаймер ↓↓↓
    switch (lobby.status) {
      case GameStatus.VOTE_RESULTS:
        lobby.delayedChangePhase.set(() => this.changePhase(io, lobby), lobby.timerDelayVoteResults);
        break;
      case GameStatus.SITUATION:
      case GameStatus.VOTE:
        lobby.delayedChangePhase.set(() => this.changePhase(io, lobby), lobby.timerDelay);
        break;
      case GameStatus.PREPARE:
      case GameStatus.END:
      default:
    }
    //? ↑↑↑ автотаймер ↑↑↑
    io.to(lobby.uuid).emit(IoOutput.changePhase, lobby.gameData);
  }

  public forcedChangePhase(io: Server, socket: Socket, uuid: string): string {
    const lobby = this.gameControlService.getLobby(uuid);
    const { username } = socket.handshake.auth;

    if (lobby.owner !== username) {
      throw new WsException(`${username} is not owner of lobby (${uuid})!`);
    }

    this.changePhase(io, lobby);
    return uuid;
  }

  public startGame(io: Server, uuid: string): string {
    const lobby = this.gameControlService.getLobby(uuid);
    this.gameControlService.resetGame(lobby);

    this.changePhase(io, lobby);

    return uuid;
  }

  public pickMeme(io: Server, socket: Socket, uuid: string, meme: Meme): string {
    const lobby = this.gameControlService.getLobby(uuid);
    const { username } = socket.handshake.auth;

    if (!username) {
      throw new WsException(`Invalid username (${username})!`);
    }
    if (lobby.status !== GameStatus.SITUATION) {
      throw new WsException(`${username}'s Socket GameStatus is not ${GameStatus.SITUATION}!`);
    }

    const player = this.gameControlService.getPlayer(lobby, username);
    this.gameControlService.setPlayerMeme(player, meme);

    if (lobby.isReadyToChangeGameStatus('meme')) {
      this.changePhase(io, lobby);
    }
    return uuid;
  }

  public getVote(io: Server, socket: Socket, uuid: string, vote: Meme): string {
    const lobby = this.gameControlService.getLobby(uuid);
    const { username } = socket.handshake.auth;

    if (!username) {
      throw new WsException(`Invalid username (${username})!`);
    }
    if (lobby.status !== GameStatus.VOTE) {
      throw new WsException(`${username}'s Socket GameStatus is not ${GameStatus.VOTE}!`);
    }

    const player = this.gameControlService.getPlayer(lobby, username);
    this.gameControlService.setPlayerVote(player, vote);

    if (lobby.isReadyToChangeGameStatus('vote')) {
      this.changePhase(io, lobby);
    }
    return uuid;
  }
}
