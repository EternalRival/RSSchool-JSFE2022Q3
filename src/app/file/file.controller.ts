import { Body, Controller, Get, Header, Post, Query, Req, StreamableFile } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Folder } from './enums/folder.enum';
import { FileService } from './file.service';

@ApiTags('File')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // TODO под снос
  /*   @Get(`${Folder.Avatars}/:fileName`)
  private getAvatar(@Req() req: Request, @Param('fileName') fileName: string): string {
    const origin = `${req.protocol}://${req.headers.host}`;
    const path = this.fileService.getFile(Folder.Avatars, fileName);
    return origin + path;
  } */
  @Get(Folder.Avatars)
  private async getAvatarList(@Req() req: Request): Promise<string[]> {
    const origin = `${req.protocol}://${req.headers.host}`;
    return this.fileService.getFileNames(origin, Folder.Avatars);
  }
  @Get('random-avatar')
  private async getRandomAvatar(@Req() req: Request): Promise<string> {
    const origin = `${req.protocol}://${req.headers.host}`;
    return this.fileService.getRandomAvatar(origin);
  }

  // TODO под снос
  /*   @Get(`${Folder.Meme}/:fileName`)
  private getMeme(@Req() req: Request, @Param('fileName') fileName: string): string {
    const origin = `${req.protocol}://${req.headers.host}`;
    const path = this.fileService.getFile(Folder.Meme, fileName);
    return origin + path;
  } */
  @Get(Folder.Meme)
  @ApiQuery({ name: 'quantity', required: false })
  private async getMemeList(@Req() req: Request, @Query('quantity') quantity: number): Promise<string[]> {
    const origin = `${req.protocol}://${req.headers.host}`;
    return this.fileService.getFileNames(origin, Folder.Meme, quantity);
  }

  @Post(`${Folder.Meme}/zip`)
  @Header('Content-Type', 'application/zip')
  @Header('Content-Disposition', 'attachment; filename="memes.zip"')
  private getMemeArchive(@Body() urlList: string[]): Promise<StreamableFile> {
    return this.fileService.getMemeArchive(urlList);
  }
}
