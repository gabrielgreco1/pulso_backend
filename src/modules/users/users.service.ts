import { Injectable, Logger, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Service for managing users
 * Handles CRUD operations for users with password hashing
 */
@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Create a new user with hashed password
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user: ${createUserDto.email}`);

    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email: createUserDto.email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);

    const user = new this.userModel({
      ...createUserDto,
      passwordHash,
    });

    const savedUser = await user.save();
    this.logger.log(`User created successfully: ${savedUser.email}`);
    return savedUser;
  }

  /**
   * Find all users
   */
  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.userModel.find().select('-passwordHash').exec();
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User> {
    this.logger.log(`Fetching user by ID: ${id}`);
    const user = await this.userModel.findById(id).select('-passwordHash').exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<UserDocument | null> {
    this.logger.log(`Fetching user by email: ${email}`);
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Update user information
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user: ${id}`);

    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-passwordHash')
      .exec();

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.logger.log(`User updated successfully: ${id}`);
    return user;
  }

  /**
   * Delete user
   */
  async remove(id: string): Promise<void> {
    this.logger.log(`Deleting user: ${id}`);

    const result = await this.userModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.logger.log(`User deleted successfully: ${id}`);
  }

  /**
   * Update user's Stripe customer ID
   */
  async updateStripeCustomerId(userId: string, stripeCustomerId: string): Promise<User> {
    this.logger.log(`Updating Stripe customer ID for user: ${userId}`);
    return this.update(userId, { stripeCustomerId } as UpdateUserDto);
  }
}
