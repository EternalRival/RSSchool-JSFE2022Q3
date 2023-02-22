import { PlayerDto, Meme } from '../dto/player.dto';

export class Player implements PlayerDto {
  constructor(public readonly username: string, public readonly image: string) {}
  public score: number = 0;
  public meme: Meme = null;
  public vote: Meme = null;

  public setMeme(meme: this['meme']): void {
    this.meme = meme;
  }
  public setVote(vote: this['vote']): void {
    this.vote = vote;
  }
  public setScore(score: this['score']): void {
    this.score = score;
  }
}
