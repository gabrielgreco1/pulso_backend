import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { ParseObjectIdPipe } from '@common/pipes/parse-objectid.pipe';

/**
 * Controller for user management endpoints
 * All routes require JWT authentication
 */
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log('POST /users - Creating new user');
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    this.logger.log('GET /users - Fetching all users');
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseObjectIdPipe) id: string) {
    this.logger.log(`GET /users/${id} - Fetching user`);
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(@Param('id', ParseObjectIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(`PATCH /users/${id} - Updating user`);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseObjectIdPipe) id: string) {
    this.logger.log(`DELETE /users/${id} - Deleting user`);
    return this.usersService.remove(id);
  }
}
