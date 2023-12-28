import { Body, Controller, Get, Ip, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

import { BoardService } from './providers';
import { CreateBoardDto, CreateContentDto } from './dto';
import { ContentService } from './providers/content.service';
import { JwtAuthGuard, Payload } from 'src/auth';
import { ReqUser } from 'src/common';
import { PageDto, PageOptionsDto } from './dto/pagination';
import { Content } from './board.interface';

@ApiTags('Board')
@Controller('board')
export class BoardController {
  constructor(
    private readonly board: BoardService,
    private readonly content: ContentService,
  ) {}

  @ApiBody({ type: CreateBoardDto })
  @Post()
  public async createBoard(@Body() boardData: CreateBoardDto): Promise<boolean> {
    const isSuccess = await this.board.create(boardData);
    return isSuccess;
  }

  // TODO Add Role Guard
  @ApiBearerAuth()
  @ApiBody({ type: CreateContentDto })
  @ApiParam({ name: 'board_name', required: true, description: 'Test Board' })
  @Post('/:board_name/content')
  @UseGuards(JwtAuthGuard)
  public async createContent(
    @Param('board_name') boardName: string,
    @Body() createContentData: CreateContentDto,
    @Ip() ip: string,
    @ReqUser() user: Payload,
  ): Promise<boolean> {
    const contentData: CreateContentDto = {
      ...createContentData,
      ip,
      author: user.username,
    };
    const userId = user.user_id;
    const isSuccess = await this.content.create(userId, boardName, contentData);
    return isSuccess;
  }

  @ApiQuery({ name: 'page', required: false, description: '1' })
  @ApiQuery({ name: 'take', required: false, description: '10' })
  @ApiParam({ name: 'board_name', required: true, description: 'Test Board' })
  @Get('/:board_name')
  public async findAllContents(
    @Param('board_name') boardName: string,
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Content>> {
    const result = await this.content.findByBoardName(boardName, pageOptionsDto);
    return result;
  }

  // TODO Add Role Guard
  @ApiParam({ name: 'board_name', required: true, description: 'Test Board' })
  @ApiParam({ name: 'content_id', required: true, description: '1' })
  @Get('/:board_name/content/:content_id')
  public async findOneContent(
    @Param('board_name') boardName: string,
    @Param('content_id') contentId: number,
  ): Promise<Content> {
    const content = await this.content.findOneContent(boardName, contentId);
    return content;
  }
}
