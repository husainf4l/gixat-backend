import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
import { KanbanService } from './kanban.service';

// @Controller('kanban')
// export class KanbanController {}

  
  @WebSocketGateway()
  export class BoardGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(private boardService: KanbanService) {}
  
    async handleConnection() {
      console.log('Client connected');
    }
  
    async handleDisconnect() {
      console.log('Client disconnected');
    }
  
    @SubscribeMessage('getBoards')
    async getUserBoards(@MessageBody('uid') uid: string) {
      const boards = await this.boardService.getUserBoards(uid);
      this.server.emit('boardsUpdated', boards);
      return boards;
    }
  
    @SubscribeMessage('createBoard')
    async createBoard(@MessageBody() data: { companyId: string; title: string }) {
      const board = await this.boardService.createBoard(data);
      this.server.emit('boardsUpdated', await this.boardService.getUserBoards(data.companyId));
      return board;
    }
  
  }
  