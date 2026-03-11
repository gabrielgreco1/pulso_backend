/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const mongoose_1 = __webpack_require__(5);
const core_1 = __webpack_require__(1);
const config_2 = __webpack_require__(6);
const all_exceptions_filter_1 = __webpack_require__(12);
const logging_interceptor_1 = __webpack_require__(13);
const jwt_auth_guard_1 = __webpack_require__(15);
const users_module_1 = __webpack_require__(18);
const auth_module_1 = __webpack_require__(28);
const analysis_module_1 = __webpack_require__(37);
const news_module_1 = __webpack_require__(59);
const ai_module_1 = __webpack_require__(58);
const scraping_module_1 = __webpack_require__(61);
const payments_module_1 = __webpack_require__(63);
const plans_module_1 = __webpack_require__(69);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.databaseConfig, config_2.jwtConfig, config_2.appConfig, config_2.stripeConfig, config_2.openaiConfig],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('database.uri'),
                    connectTimeoutMS: 5000,
                    serverSelectionTimeoutMS: 5000,
                    bufferCommands: false,
                    connectionFactory: (connection) => {
                        connection.on('error', (err) => {
                            console.error('Mongoose connection error:', err);
                        });
                        return connection;
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            analysis_module_1.AnalysisModule,
            news_module_1.NewsModule,
            ai_module_1.AiModule,
            scraping_module_1.ScrapingModule,
            payments_module_1.PaymentsModule,
            plans_module_1.PlansModule,
        ],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openaiConfig = exports.stripeConfig = exports.appConfig = exports.jwtConfig = exports.databaseConfig = void 0;
var database_config_1 = __webpack_require__(7);
Object.defineProperty(exports, "databaseConfig", ({ enumerable: true, get: function () { return database_config_1.default; } }));
var jwt_config_1 = __webpack_require__(8);
Object.defineProperty(exports, "jwtConfig", ({ enumerable: true, get: function () { return jwt_config_1.default; } }));
var app_config_1 = __webpack_require__(9);
Object.defineProperty(exports, "appConfig", ({ enumerable: true, get: function () { return app_config_1.default; } }));
var stripe_config_1 = __webpack_require__(10);
Object.defineProperty(exports, "stripeConfig", ({ enumerable: true, get: function () { return stripe_config_1.default; } }));
var openai_config_1 = __webpack_require__(11);
Object.defineProperty(exports, "openaiConfig", ({ enumerable: true, get: function () { return openai_config_1.default; } }));


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)('database', () => ({
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pulso',
}));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET || 'default-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRATION || '7d',
}));


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    scrapingApiUrl: process.env.SCRAPING_API_URL || 'http://localhost:8000',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
}));


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)('stripe', () => ({
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}));


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(3);
exports["default"] = (0, config_1.registerAs)('openai', () => ({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4o',
}));


/***/ }),
/* 12 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionsFilter_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AllExceptionsFilter = void 0;
const common_1 = __webpack_require__(2);
let AllExceptionsFilter = AllExceptionsFilter_1 = class AllExceptionsFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionsFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException ? exception.getResponse() : 'Internal server error';
        const errorResponse = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: typeof message === 'string' ? message : message.message || message,
        };
        this.logger.error(`${request.method} ${request.url} - Status: ${status}`, exception instanceof Error ? exception.stack : JSON.stringify(exception));
        response.status(status).json(errorResponse);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = AllExceptionsFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggingInterceptor = void 0;
const common_1 = __webpack_require__(2);
const operators_1 = __webpack_require__(14);
let LoggingInterceptor = LoggingInterceptor_1 = class LoggingInterceptor {
    constructor() {
        this.logger = new common_1.Logger(LoggingInterceptor_1.name);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        const now = Date.now();
        this.logger.log(`→ ${method} ${url}`);
        return next.handle().pipe((0, operators_1.tap)({
            next: () => {
                const response = context.switchToHttp().getResponse();
                const delay = Date.now() - now;
                this.logger.log(`← ${method} ${url} ${response.statusCode} - ${delay}ms`);
            },
            error: (error) => {
                const delay = Date.now() - now;
                this.logger.error(`← ${method} ${url} ERROR - ${delay}ms`, error.message);
            },
        }));
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = LoggingInterceptor_1 = __decorate([
    (0, common_1.Injectable)()
], LoggingInterceptor);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(16);
const core_1 = __webpack_require__(1);
const public_decorator_1 = __webpack_require__(17);
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException('Invalid or expired token');
        }
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object])
], JwtAuthGuard);


/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Public = exports.IS_PUBLIC_KEY = void 0;
const common_1 = __webpack_require__(2);
exports.IS_PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_KEY, true);
exports.Public = Public;


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const users_service_1 = __webpack_require__(19);
const users_controller_1 = __webpack_require__(23);
const user_schema_1 = __webpack_require__(22);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }])],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(20);
const bcrypt = __webpack_require__(21);
const user_schema_1 = __webpack_require__(22);
let UsersService = UsersService_1 = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async create(createUserDto) {
        this.logger.log(`Creating user: ${createUserDto.email}`);
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const passwordHash = await bcrypt.hash(createUserDto.password, 10);
        const user = new this.userModel({
            ...createUserDto,
            passwordHash,
        });
        const savedUser = await user.save();
        this.logger.log(`User created successfully: ${savedUser.email}`);
        return savedUser;
    }
    async findAll() {
        this.logger.log('Fetching all users');
        return this.userModel.find().select('-passwordHash').exec();
    }
    async findById(id) {
        this.logger.log(`Fetching user by ID: ${id}`);
        const user = await this.userModel.findById(id).select('-passwordHash').exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async findByEmail(email) {
        this.logger.log(`Fetching user by email: ${email}`);
        return this.userModel.findOne({ email }).exec();
    }
    async update(id, updateUserDto) {
        this.logger.log(`Updating user: ${id}`);
        const user = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .select('-passwordHash')
            .exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        this.logger.log(`User updated successfully: ${id}`);
        return user;
    }
    async remove(id) {
        this.logger.log(`Deleting user: ${id}`);
        const result = await this.userModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        this.logger.log(`User deleted successfully: ${id}`);
    }
    async updateStripeCustomerId(userId, stripeCustomerId) {
        this.logger.log(`Updating Stripe customer ID for user: ${userId}`);
        return this.update(userId, { stripeCustomerId });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const mongoose_1 = __webpack_require__(5);
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['essential', 'professional', 'strategic'],
        default: 'essential',
    }),
    __metadata("design:type", String)
], User.prototype, "plan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: null }),
    __metadata("design:type", String)
], User.prototype, "stripeCustomerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isAdmin", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.index({ stripeCustomerId: 1 });


/***/ }),
/* 23 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersController = void 0;
const common_1 = __webpack_require__(2);
const users_service_1 = __webpack_require__(19);
const create_user_dto_1 = __webpack_require__(24);
const update_user_dto_1 = __webpack_require__(26);
const jwt_auth_guard_1 = __webpack_require__(15);
const parse_objectid_pipe_1 = __webpack_require__(27);
let UsersController = UsersController_1 = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
        this.logger = new common_1.Logger(UsersController_1.name);
    }
    create(createUserDto) {
        this.logger.log('POST /users - Creating new user');
        return this.usersService.create(createUserDto);
    }
    findAll() {
        this.logger.log('GET /users - Fetching all users');
        return this.usersService.findAll();
    }
    findOne(id) {
        this.logger.log(`GET /users/${id} - Fetching user`);
        return this.usersService.findById(id);
    }
    update(id, updateUserDto) {
        this.logger.log(`PATCH /users/${id} - Updating user`);
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        this.logger.log(`DELETE /users/${id} - Deleting user`);
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_user_dto_1.CreateUserDto !== "undefined" && create_user_dto_1.CreateUserDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof update_user_dto_1.UpdateUserDto !== "undefined" && update_user_dto_1.UpdateUserDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object])
], UsersController);


/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUserDto = void 0;
const class_validator_1 = __webpack_require__(25);
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const class_validator_1 = __webpack_require__(25);
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['essential', 'professional', 'strategic']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "plan", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateUserDto.prototype, "isActive", void 0);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ParseObjectIdPipe = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(20);
let ParseObjectIdPipe = class ParseObjectIdPipe {
    transform(value, metadata) {
        if (!mongoose_1.Types.ObjectId.isValid(value)) {
            throw new common_1.BadRequestException(`Invalid ObjectId: ${value}`);
        }
        return value;
    }
};
exports.ParseObjectIdPipe = ParseObjectIdPipe;
exports.ParseObjectIdPipe = ParseObjectIdPipe = __decorate([
    (0, common_1.Injectable)()
], ParseObjectIdPipe);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(29);
const passport_1 = __webpack_require__(16);
const config_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(30);
const auth_controller_1 = __webpack_require__(31);
const jwt_strategy_1 = __webpack_require__(35);
const users_module_1 = __webpack_require__(18);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get('jwt.expiresIn'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy],
        exports: [auth_service_1.AuthService, jwt_strategy_1.JwtStrategy, passport_1.PassportModule],
    })
], AuthModule);


/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(29);
const config_1 = __webpack_require__(3);
const bcrypt = __webpack_require__(21);
const users_service_1 = __webpack_require__(19);
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async register(registerDto) {
        this.logger.log(`Registration attempt for: ${registerDto.email}`);
        const user = await this.usersService.create({
            email: registerDto.email,
            password: registerDto.password,
            name: registerDto.name,
        });
        const payload = {
            sub: user._id.toString(),
            email: user.email,
            plan: user.plan,
        };
        const accessToken = this.jwtService.sign(payload);
        this.logger.log(`Registration successful: ${registerDto.email}`);
        return {
            accessToken,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                plan: user.plan,
            },
        };
    }
    async login(loginDto) {
        this.logger.log(`Login attempt for: ${loginDto.email}`);
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            this.logger.warn(`Login failed: User not found - ${loginDto.email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            this.logger.warn(`Login failed: Invalid password - ${loginDto.email}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            this.logger.warn(`Login failed: User inactive - ${loginDto.email}`);
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        const payload = {
            sub: user._id.toString(),
            email: user.email,
            plan: user.plan,
        };
        const accessToken = this.jwtService.sign(payload);
        this.logger.log(`Login successful: ${loginDto.email}`);
        return {
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                plan: user.plan,
            },
        };
    }
    async getMe(userId) {
        this.logger.log(`Fetching user info for: ${userId}`);
        return this.usersService.findById(userId);
    }
    async refreshToken(userId) {
        this.logger.log(`Refreshing token for user: ${userId}`);
        const user = await this.usersService.findById(userId);
        const payload = {
            sub: user._id.toString(),
            email: user.email,
            plan: user.plan,
        };
        const accessToken = this.jwtService.sign(payload);
        this.logger.log(`Token refreshed for user: ${userId}`);
        return {
            accessToken,
        };
    }
    async validateUser(payload) {
        this.logger.log(`Validating token for user: ${payload.email}`);
        return this.usersService.findById(payload.sub);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AuthController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(2);
const auth_service_1 = __webpack_require__(30);
const login_dto_1 = __webpack_require__(32);
const register_dto_1 = __webpack_require__(33);
const public_decorator_1 = __webpack_require__(17);
const current_user_decorator_1 = __webpack_require__(34);
const jwt_auth_guard_1 = __webpack_require__(15);
let AuthController = AuthController_1 = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    register(registerDto) {
        this.logger.log(`POST /auth/register - Registration attempt: ${registerDto.email}`);
        return this.authService.register(registerDto);
    }
    login(loginDto) {
        this.logger.log(`POST /auth/login - Login attempt: ${loginDto.email}`);
        return this.authService.login(loginDto);
    }
    getMe(user) {
        this.logger.log(`GET /auth/me - User: ${user.email}`);
        return this.authService.getMe(user.id);
    }
    refreshToken(user) {
        this.logger.log(`POST /auth/refresh-token - User: ${user.email}`);
        return this.authService.refreshToken(user.id);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof login_dto_1.LoginDto !== "undefined" && login_dto_1.LoginDto) === "function" ? _c : Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDto = void 0;
const class_validator_1 = __webpack_require__(25);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(25);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(2);
exports.CurrentUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var JwtStrategy_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(2);
const passport_1 = __webpack_require__(16);
const passport_jwt_1 = __webpack_require__(36);
const config_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(19);
let JwtStrategy = JwtStrategy_1 = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor(configService, usersService) {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('jwt.secret'),
        });
        this.configService = configService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(JwtStrategy_1.name);
    }
    async validate(payload) {
        this.logger.log(`Validating JWT for user: ${payload.email}`);
        const user = await this.usersService.findById(payload.sub);
        if (!user) {
            this.logger.warn(`JWT validation failed: User not found - ${payload.email}`);
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!user.isActive) {
            this.logger.warn(`JWT validation failed: User inactive - ${payload.email}`);
            throw new common_1.UnauthorizedException('Account is inactive');
        }
        return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            plan: user.plan,
        };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = JwtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object])
], JwtStrategy);


/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalysisModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const analysis_service_1 = __webpack_require__(38);
const analysis_controller_1 = __webpack_require__(47);
const analysis_schema_1 = __webpack_require__(39);
const ai_module_1 = __webpack_require__(58);
const news_module_1 = __webpack_require__(59);
const scraping_module_1 = __webpack_require__(61);
const analysis_report_schema_1 = __webpack_require__(40);
const report_pdf_service_1 = __webpack_require__(49);
let AnalysisModule = class AnalysisModule {
};
exports.AnalysisModule = AnalysisModule;
exports.AnalysisModule = AnalysisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: analysis_schema_1.Analysis.name, schema: analysis_schema_1.AnalysisSchema },
                { name: analysis_report_schema_1.AnalysisReport.name, schema: analysis_report_schema_1.AnalysisReportSchema },
            ]),
            ai_module_1.AiModule,
            news_module_1.NewsModule,
            scraping_module_1.ScrapingModule,
        ],
        controllers: [analysis_controller_1.AnalysisController],
        providers: [analysis_service_1.AnalysisService, report_pdf_service_1.ReportPdfService],
        exports: [analysis_service_1.AnalysisService],
    })
], AnalysisModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AnalysisService_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalysisService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(20);
const analysis_schema_1 = __webpack_require__(39);
const analysis_report_schema_1 = __webpack_require__(40);
const news_service_1 = __webpack_require__(41);
const ai_service_1 = __webpack_require__(43);
const scraping_service_1 = __webpack_require__(46);
let AnalysisService = AnalysisService_1 = class AnalysisService {
    constructor(analysisModel, analysisReportModel, newsService, aiService, scrapingService) {
        this.analysisModel = analysisModel;
        this.analysisReportModel = analysisReportModel;
        this.newsService = newsService;
        this.aiService = aiService;
        this.scrapingService = scrapingService;
        this.logger = new common_1.Logger(AnalysisService_1.name);
    }
    async create(userId, userPlan, createAnalysisDto) {
        this.logger.log(`Creating analysis for user ${userId}: ${createAnalysisDto.targetName}`);
        const analysis = new this.analysisModel({
            userId: new mongoose_2.Types.ObjectId(userId),
            ...createAnalysisDto,
            plan: userPlan,
            status: 'pending',
            progress: 0,
        });
        const savedAnalysis = await analysis.save();
        this.logger.log(`Analysis created: ${savedAnalysis._id}`);
        return savedAnalysis;
    }
    async findByUser(userId) {
        this.logger.log(`Fetching analyses for user: ${userId}`);
        return this.analysisModel
            .find({ userId: new mongoose_2.Types.ObjectId(userId) })
            .sort({ createdAt: -1 })
            .exec();
    }
    async findById(id) {
        this.logger.log(`Fetching analysis: ${id}`);
        const analysis = await this.analysisModel.findById(id).exec();
        if (!analysis) {
            throw new common_1.NotFoundException(`Analysis with ID ${id} not found`);
        }
        return analysis;
    }
    async update(id, updateAnalysisDto) {
        this.logger.log(`Updating analysis ${id}: ${JSON.stringify(updateAnalysisDto)}`);
        const analysis = await this.analysisModel
            .findByIdAndUpdate(id, updateAnalysisDto, { new: true })
            .exec();
        if (!analysis) {
            throw new common_1.NotFoundException(`Analysis with ID ${id} not found`);
        }
        this.logger.log(`Analysis updated: ${id}`);
        return analysis;
    }
    async remove(id) {
        this.logger.log(`Deleting analysis: ${id}`);
        const result = await this.analysisModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Analysis with ID ${id} not found`);
        }
        this.logger.log(`Analysis deleted: ${id}`);
    }
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    async startAnalysis(id) {
        this.logger.log(`Starting full analysis pipeline for ${id}`);
        const analysis = await this.findById(id);
        try {
            await this.update(id, { status: 'scraping', progress: 5 });
            const portals = analysis.portals || ['g1', 'folha'];
            let scrapingResult;
            try {
                scrapingResult = await this.scrapingService.triggerScraping(analysis.targetName, portals, id, analysis.instagramProfile);
                this.logger.log(`Scraping triggered, job: ${scrapingResult.jobId}`);
            }
            catch (scrapingError) {
                this.logger.warn(`Scraping service unavailable: ${scrapingError.message}. Proceeding with existing articles.`);
                scrapingResult = { jobId: '', status: 'done', message: 'skipped' };
            }
            if (scrapingResult.jobId) {
                await this.update(id, { progress: 10 });
                const maxAttempts = 60;
                let attempt = 0;
                while (attempt < maxAttempts) {
                    await this.delay(5000);
                    attempt++;
                    try {
                        const status = await this.scrapingService.getScrapingStatus(scrapingResult.jobId);
                        this.logger.log(`Scraping poll #${attempt}: ${status.status}`);
                        const scrapingProgress = 10 + Math.floor((attempt / maxAttempts) * 30);
                        await this.update(id, { progress: Math.min(scrapingProgress, 40) });
                        if (status.status === 'done' || status.status === 'completed') {
                            this.logger.log(`Scraping completed for job ${scrapingResult.jobId}`);
                            break;
                        }
                        if (status.status === 'error' || status.status === 'failed') {
                            this.logger.warn(`Scraping failed for job ${scrapingResult.jobId}. Proceeding with available articles.`);
                            break;
                        }
                    }
                    catch (pollError) {
                        this.logger.warn(`Error polling scraping status: ${pollError.message}`);
                    }
                }
                if (attempt >= maxAttempts) {
                    this.logger.warn(`Scraping timed out for job ${scrapingResult.jobId}. Proceeding with available articles.`);
                }
            }
            await this.update(id, { status: 'analyzing', progress: 45 });
            const articles = await this.newsService.findByAnalysis(id);
            if (!articles || articles.length === 0) {
                this.logger.warn(`No articles found for analysis ${id}`);
                await this.update(id, {
                    status: 'done',
                    progress: 100,
                    errorMessage: 'No articles found after scraping. Try broader search terms.',
                });
                return;
            }
            this.logger.log(`Found ${articles.length} articles for analysis ${id}`);
            const totalArticles = articles.length;
            let analyzedCount = 0;
            for (const article of articles) {
                if (article.aiAnalysis) {
                    analyzedCount++;
                    continue;
                }
                const analysisResult = await this.aiService.analyzeSingle(article, analysis.targetName);
                if (analysisResult) {
                    await this.newsService.update(article._id.toString(), {
                        aiAnalysis: analysisResult,
                    });
                    analyzedCount++;
                }
                const progress = 45 + Math.floor((analyzedCount / totalArticles) * 40);
                if (analyzedCount % 3 === 0) {
                    await this.update(id, { progress });
                }
            }
            await this.update(id, { progress: 90 });
            const analyzedArticles = await this.newsService.findByAnalysis(id);
            const validArticles = analyzedArticles.filter((a) => a.aiAnalysis);
            if (validArticles.length > 0) {
                const report = await this.aiService.consolidate(id, analysis.targetName, validArticles);
                if (report) {
                    const { analysisId: _aiAnalysisId, ...reportData } = report;
                    const analysisReport = new this.analysisReportModel({
                        analysisId: new mongoose_2.Types.ObjectId(id),
                        ...reportData,
                    });
                    await analysisReport.save();
                    this.logger.log(`Report saved for analysis ${id}`);
                }
            }
            await this.update(id, { status: 'done', progress: 100 });
            this.logger.log(`Analysis ${id} completed successfully`);
        }
        catch (error) {
            this.logger.error(`Error in analysis pipeline for ${id}: ${error.message}`);
            await this.update(id, {
                status: 'error',
                errorMessage: error.message,
            });
        }
    }
    async getReport(analysisId) {
        let report = await this.analysisReportModel
            .findOne({ analysisId: new mongoose_2.Types.ObjectId(analysisId) })
            .exec();
        if (!report) {
            report = await this.analysisReportModel.findOne({ analysisId: analysisId }).exec();
        }
        return report;
    }
    async getArticles(analysisId) {
        return this.newsService.findByAnalysis(analysisId);
    }
};
exports.AnalysisService = AnalysisService;
exports.AnalysisService = AnalysisService = AnalysisService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(analysis_schema_1.Analysis.name)),
    __param(1, (0, mongoose_1.InjectModel)(analysis_report_schema_1.AnalysisReport.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _b : Object, typeof (_c = typeof news_service_1.NewsService !== "undefined" && news_service_1.NewsService) === "function" ? _c : Object, typeof (_d = typeof ai_service_1.AiService !== "undefined" && ai_service_1.AiService) === "function" ? _d : Object, typeof (_e = typeof scraping_service_1.ScrapingService !== "undefined" && scraping_service_1.ScrapingService) === "function" ? _e : Object])
], AnalysisService);


/***/ }),
/* 39 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalysisSchema = exports.Analysis = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(20);
let Analysis = class Analysis {
};
exports.Analysis = Analysis;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], Analysis.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Analysis.prototype, "targetName", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['politician', 'influencer', 'celebrity'],
        default: 'politician',
    }),
    __metadata("design:type", String)
], Analysis.prototype, "targetType", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['pending', 'scraping', 'analyzing', 'done', 'error'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], Analysis.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: ['essential', 'professional', 'strategic'],
    }),
    __metadata("design:type", String)
], Analysis.prototype, "plan", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Analysis.prototype, "portals", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0, min: 0, max: 100 }),
    __metadata("design:type", Number)
], Analysis.prototype, "progress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Analysis.prototype, "errorMessage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Analysis.prototype, "instagramProfile", void 0);
exports.Analysis = Analysis = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Analysis);
exports.AnalysisSchema = mongoose_1.SchemaFactory.createForClass(Analysis);
exports.AnalysisSchema.index({ userId: 1, createdAt: -1 });
exports.AnalysisSchema.index({ status: 1 });


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalysisReportSchema = exports.AnalysisReport = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(20);
let AnalysisReport = class AnalysisReport {
};
exports.AnalysisReport = AnalysisReport;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Analysis', required: true, unique: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], AnalysisReport.prototype, "analysisId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], AnalysisReport.prototype, "overallScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], AnalysisReport.prototype, "acceptanceScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], AnalysisReport.prototype, "temperatureScore", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object] }),
    __metadata("design:type", Array)
], AnalysisReport.prototype, "scoresByPortal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], AnalysisReport.prototype, "biasMap", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object] }),
    __metadata("design:type", Array)
], AnalysisReport.prototype, "strengths", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object] }),
    __metadata("design:type", Array)
], AnalysisReport.prototype, "weaknesses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object] }),
    __metadata("design:type", Array)
], AnalysisReport.prototype, "recommendations", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [Object] }),
    __metadata("design:type", Array)
], AnalysisReport.prototype, "keyThemes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], AnalysisReport.prototype, "sentimentDistribution", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ date: String, score: Number }] }),
    __metadata("design:type", Array)
], AnalysisReport.prototype, "trend", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AnalysisReport.prototype, "executiveSummary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], AnalysisReport.prototype, "methodology", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AnalysisReport.prototype, "generatedAt", void 0);
exports.AnalysisReport = AnalysisReport = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, strict: false })
], AnalysisReport);
exports.AnalysisReportSchema = mongoose_1.SchemaFactory.createForClass(AnalysisReport);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NewsService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsService = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(20);
const news_article_schema_1 = __webpack_require__(42);
let NewsService = NewsService_1 = class NewsService {
    constructor(newsArticleModel) {
        this.newsArticleModel = newsArticleModel;
        this.logger = new common_1.Logger(NewsService_1.name);
    }
    async findByAnalysis(analysisId) {
        this.logger.log(`Fetching articles for analysis: ${analysisId}`);
        return this.newsArticleModel
            .find({ analysisId: new mongoose_2.Types.ObjectId(analysisId) })
            .sort({ publishedAt: -1 })
            .exec();
    }
    async create(articleData) {
        this.logger.log(`Creating article: ${articleData.title}`);
        const article = new this.newsArticleModel(articleData);
        return article.save();
    }
    async update(id, updateData) {
        const article = await this.newsArticleModel
            .findByIdAndUpdate(id, updateData, { new: true })
            .exec();
        if (!article) {
            throw new Error(`Article with ID ${id} not found`);
        }
        return article;
    }
};
exports.NewsService = NewsService;
exports.NewsService = NewsService = NewsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(news_article_schema_1.NewsArticle.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], NewsService);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsArticleSchema = exports.NewsArticle = void 0;
const mongoose_1 = __webpack_require__(5);
const mongoose_2 = __webpack_require__(20);
let NewsArticle = class NewsArticle {
};
exports.NewsArticle = NewsArticle;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Analysis', required: true }),
    __metadata("design:type", typeof (_a = typeof mongoose_2.Types !== "undefined" && mongoose_2.Types.ObjectId) === "function" ? _a : Object)
], NewsArticle.prototype, "analysisId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NewsArticle.prototype, "portal", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NewsArticle.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], NewsArticle.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], NewsArticle.prototype, "publishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], NewsArticle.prototype, "scrapedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], NewsArticle.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            sentiment: String,
            score: Number,
            themes: [String],
            bias: String,
            relevance: String,
            summary: String,
        },
    }),
    __metadata("design:type", Object)
], NewsArticle.prototype, "aiAnalysis", void 0);
exports.NewsArticle = NewsArticle = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], NewsArticle);
exports.NewsArticleSchema = mongoose_1.SchemaFactory.createForClass(NewsArticle);
exports.NewsArticleSchema.index({ analysisId: 1, publishedAt: -1 });
exports.NewsArticleSchema.index({ portal: 1 });


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AiService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const openai_1 = __webpack_require__(44);
const prompts_1 = __webpack_require__(45);
let AiService = AiService_1 = class AiService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(AiService_1.name);
        this.openai = new openai_1.default({
            apiKey: this.configService.get('openai.apiKey'),
        });
        this.model = this.configService.get('openai.model') || 'gpt-4o';
    }
    async analyzeSingle(article, targetName) {
        this.logger.log(`Analyzing ${article.portal === 'instagram' ? 'social post' : 'article'}: ${article.title || 'no-title'}`);
        try {
            const isSocial = article.portal === 'instagram';
            const basePrompt = isSocial ? prompts_1.SINGLE_SOCIAL_PROMPT : prompts_1.SINGLE_NEWS_PROMPT;
            const prompt = basePrompt
                .replace('{targetName}', targetName)
                .replace('{title}', article.title || '')
                .replace('{portal}', article.portal || '')
                .replace('{date}', article.publishedAt ? new Date(article.publishedAt).toISOString() : '')
                .replace('{content}', (article.content || '').substring(0, 15000));
            const completion = await this.openai.chat.completions.create({
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
                    { role: 'user', content: prompt },
                ],
                model: this.model,
                response_format: { type: 'json_object' },
                temperature: 0.3,
            });
            const content = completion.choices[0].message.content;
            if (!content)
                return null;
            const analysis = JSON.parse(content);
            return {
                ...analysis,
                analyzedAt: new Date(),
                model: this.model,
            };
        }
        catch (error) {
            this.logger.error(`Error analyzing ${article.portal}: ${error.message}`);
            return null;
        }
    }
    async consolidate(analysisId, targetName, analyzedArticles) {
        this.logger.log(`Consolidating report for analysis: ${analysisId}`);
        if (!analyzedArticles || analyzedArticles.length === 0) {
            this.logger.warn('No articles to consolidate');
            return null;
        }
        try {
            const newsArticles = analyzedArticles.filter((a) => a.portal !== 'instagram');
            const socialPosts = analyzedArticles.filter((a) => a.portal === 'instagram');
            const newsSummary = newsArticles.map((article) => ({
                title: article.title,
                portal: article.portal,
                date: article.publishedAt,
                sentiment: article.aiAnalysis?.sentiment,
                bias: article.aiAnalysis?.bias,
                summary: article.aiAnalysis?.summary,
            }));
            const socialSummary = socialPosts.map((post) => ({
                portal: post.portal,
                date: post.publishedAt,
                sentiment: post.aiAnalysis?.sentiment,
                temperature: post.aiAnalysis?.temperature,
                summary: post.aiAnalysis?.summary,
                content: (post.content || '').substring(0, 100),
            }));
            const prompt = prompts_1.CONSOLIDATION_PROMPT.replace('{targetName}', targetName)
                .replace('{newsData}', JSON.stringify(newsSummary, null, 2))
                .replace('{socialData}', JSON.stringify(socialSummary, null, 2));
            const completion = await this.openai.chat.completions.create({
                messages: [
                    { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
                    { role: 'user', content: prompt },
                ],
                model: this.model,
                response_format: { type: 'json_object' },
                temperature: 0.4,
            });
            const content = completion.choices[0].message.content;
            if (!content)
                return null;
            const report = JSON.parse(content);
            return {
                ...report,
                analysisId,
                generatedAt: new Date(),
                articleCount: newsArticles.length,
                socialCount: socialPosts.length,
                model: this.model,
            };
        }
        catch (error) {
            this.logger.error(`Error consolidating report: ${error.message}`);
            throw error;
        }
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AiService);


/***/ }),
/* 44 */
/***/ ((module) => {

module.exports = require("openai");

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONSOLIDATION_PROMPT = exports.SINGLE_SOCIAL_PROMPT = exports.SINGLE_NEWS_PROMPT = void 0;
exports.SINGLE_NEWS_PROMPT = `
You are an expert political analyst. Analyze the following news article about {targetName}.

Title: {title}
Portal: {portal}
Date: {date}
Content: {content}

Analyze the article and provide a JSON response with the following fields:
1. "sentiment": float between -1.0 (very negative) and 1.0 (very positive).
2. "themes": list of strings (max 5 keywords/themes).
3. "bias": string (one of: "left", "center-left", "center", "center-right", "right", "unknown").
4. "relevance": string (one of: "protagonist", "supporting", "mention").
5. "summary": string (2-3 sentences summarizing the article).
6. "explanation": string (brief explanation of the sentiment score).

IMPORTANT: All text fields ("summary", "explanation", and "themes") MUST be written in Brazilian Portuguese (pt-BR). Only the enum values for "bias" and "relevance" should remain in English.

Return ONLY the JSON object.
`;
exports.SINGLE_SOCIAL_PROMPT = `
You are an expert social media analyst. Analyze the following comment/post from Instagram about {targetName}.

Content: {content}
Portal: {portal}
Date: {date}

Analyze the content (caption and comments) and provide a JSON response with the following fields:
1. "sentiment": float between -1.0 (very negative) and 1.0 (very positive).
2. "themes": list of strings (max 3 keywords/themes).
3. "relevance": string (one of: "direct", "indirect", "spam").
4. "summary": string (1 assertive sentence summarizing the prevailing public mood/reaction in this specific post).
5. "explanation": string (brief explanation of why this sentiment score was given).
6. "temperature": float between 0.0 (cold/no interest) and 1.0 (viral/extremely heated debate).

IMPORTANT: Focus EXCLUSIVELY on public perception. Ignore media portal biases here. All text fields ("summary", "explanation", and "themes") MUST be written in Brazilian Portuguese (pt-BR).

Return ONLY the JSON object.
`;
exports.CONSOLIDATION_PROMPT = `
You are a senior political strategist and communication analyst. I will provide you with a set of analyzed data about {targetName}, divided into News Articles and Social Media posts/comments.
Your goal is to generate a detailed, transparent, and data-driven consolidated positioning report that differentiates between media perception and public (social media) perception.

News Articles Data:
{newsData}

Social Media Data:
{socialData}

Generate a JSON response with the following structure. Each score MUST include sub-criteria showing exactly how the score was derived:

1. "overallScore": object {{
    "value": integer (0-100),
    "label": string (one of: "Crítico", "Ruim", "Regular", "Bom", "Excelente"),
    "explanation": string (A detailed 3-4 sentence analysis merging news and social media trends),
    "criteria": [
        {{ "name": "Sentimento Portais", "value": integer (0-100), "weight": float (0 to 1), "detail": string }},
        {{ "name": "Sentimento Redes Sociais", "value": integer (0-100), "weight": float (0 to 1), "detail": string }},
        {{ "name": "Volume de Exposição", "value": integer (0-100), "weight": float (0 to 1), "detail": string }},
        {{ "name": "Protagonismo Médio", "value": integer (0-100), "weight": float (0 to 1), "detail": string }}
    ]
}}

2. "acceptanceScore": object {{
    "value": integer (0-100),
    "label": string (one of: "Muito Baixa", "Baixa", "Moderada", "Alta", "Muito Alta"),
    "explanation": string (Explain using 2-3 specific supporting factors derived purely from public sentiment and comment patterns),
    "criteria": [
        {{ "name": "Apoio em Comentários", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Equilíbrio de Sentimento", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Nível de Crítica", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Engajamento Construtivo", "value": integer (0-100), "weight": float, "detail": string }}
    ]
}}

3. "temperatureScore": object {{
    "value": integer (0-100),
    "label": string (one of: "Frio", "Morno", "Quente", "Muito Quente", "Viral"),
    "explanation": string (Describe the intensity of the public debate and the speed of information spread),
    "criteria": [
        {{ "name": "Volume Redes Sociais", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Menções em Portais", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Recência dos Dados", "value": integer (0-100), "weight": float, "detail": string }},
        {{ "name": "Potencial de Viralização", "value": integer (0-100), "weight": float, "detail": string }}
    ]
}}

4. "socialMediaAnalysis": object {{
    "sentiment": float (-1 to 1),
    "totalComments": int,
    "topThemes": list of strings,
    "acceptanceRate": float (0 to 100),
    "summary": string (High-level summary of social media perception),
    "detailedPoints": list of strings (3-4 dense bullet points detailing: "Exactly what people are saying", including common praises, specific criticisms, and recurring phrases or arguments found in the comments)
}}

5. "scoresByPortal": list of objects {{
    "portal": "Name",
    "score": float (average sentiment from -1 to 1),
    "articleCount": int,
    "topThemes": list of strings (top 3 themes from this portal),
    "bias": string (predominant bias of this portal's coverage or "social" for redes)
}}

6. "biasMap": object {{ "left": int, "center": int, "right": int }} (news articles only)

7. "strengths": list of objects {{
    "title": string,
    "description": string,
    "evidence": string (Cite specific articles or sentiment patterns)
}}

8. "weaknesses": list of objects {{
    "title": string,
    "description": string,
    "risk": string (one of: "baixo", "médio", "alto", "crítico"),
    "evidence": string (Cite specific criticisms or negative comments/headlines)
}}

9. "recommendations": list of objects {{
    "title": string,
    "description": string,
    "priority": string (one of: "baixa", "média", "alta", "urgente"),
    "impact": string
}}

10. "keyThemes": list of objects {{
    "theme": string,
    "count": int,
    "averageSentiment": float (-1 to 1),
    "summary": string
}}

11. "sentimentDistribution": object {{
    "positive": int,
    "neutral": int,
    "negative": int
}}

12. "trend": list of objects {{"date": "YYYY-MM-DD", "score": float}}

13. "executiveSummary": string (A high-density strategic analysis of 5 paragraphs.
    Paragraph 1: Executive Overview – Unified view of news vs social media.
    Paragraph 2: Media Landscape – Detailed breakdown of how portals are framing the target.
    Paragraph 3: Social Pulse – Deep dive into the "Digital Street", citing patterns in public comments and reaction speed.
    Paragraph 4: Critical Vulnerabilities – Identification of narrative risks and potential escalation points.
    Paragraph 5: Strategic Action Plan – Targeted recommendations to mitigate risks and leverage strengths.)

14. "methodology": string (Relating both News and Social data analysis)

IMPORTANT: ALL text fields MUST be written in Brazilian Portuguese (pt-BR).
Return ONLY the JSON object.
`;


/***/ }),
/* 46 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ScrapingService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScrapingService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
let ScrapingService = ScrapingService_1 = class ScrapingService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ScrapingService_1.name);
        this.scrapingApiUrl = this.configService.get('app.scrapingApiUrl');
        this.logger.log(`Scraping API URL: ${this.scrapingApiUrl}`);
    }
    async triggerScraping(targetName, portals, analysisId, instagramProfile) {
        this.logger.log(`Triggering scraping for: ${targetName} on portals: ${portals.join(', ')}`);
        try {
            const response = await fetch(`${this.scrapingApiUrl}/scrape`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    target_name: targetName,
                    portals: portals,
                    analysis_id: analysisId,
                    instagram_profile: instagramProfile,
                }),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new common_1.HttpException(error.detail || 'Scraping service error', response.status);
            }
            const data = await response.json();
            this.logger.log(`Scraping job created: ${data.job_id}`);
            return {
                jobId: data.job_id,
                status: data.status,
                message: data.message,
            };
        }
        catch (error) {
            this.logger.error(`Error triggering scraping: ${error.message}`);
            throw new common_1.HttpException('Failed to trigger scraping service', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getScrapingStatus(jobId) {
        this.logger.log(`Checking scraping status for job: ${jobId}`);
        try {
            const response = await fetch(`${this.scrapingApiUrl}/status/${jobId}`);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new common_1.HttpException('Job not found', common_1.HttpStatus.NOT_FOUND);
                }
                throw new common_1.HttpException('Scraping service error', response.status);
            }
            const data = await response.json();
            this.logger.log(`Job ${jobId} status: ${data.status}`);
            return data;
        }
        catch (error) {
            this.logger.error(`Error checking scraping status: ${error.message}`);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException('Failed to check scraping status', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async healthCheck() {
        try {
            const response = await fetch(`${this.scrapingApiUrl}/health`);
            return response.ok;
        }
        catch (error) {
            this.logger.error('Scraping service health check failed');
            return false;
        }
    }
};
exports.ScrapingService = ScrapingService;
exports.ScrapingService = ScrapingService = ScrapingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ScrapingService);


/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AnalysisController_1;
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnalysisController = void 0;
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(48);
const analysis_service_1 = __webpack_require__(38);
const report_pdf_service_1 = __webpack_require__(49);
const create_analysis_dto_1 = __webpack_require__(56);
const update_analysis_dto_1 = __webpack_require__(57);
const jwt_auth_guard_1 = __webpack_require__(15);
const current_user_decorator_1 = __webpack_require__(34);
const parse_objectid_pipe_1 = __webpack_require__(27);
let AnalysisController = AnalysisController_1 = class AnalysisController {
    constructor(analysisService, reportPdfService) {
        this.analysisService = analysisService;
        this.reportPdfService = reportPdfService;
        this.logger = new common_1.Logger(AnalysisController_1.name);
    }
    async download(id, res) {
        this.logger.log(`GET /analysis/${id}/download`);
        const analysis = await this.analysisService.findById(id);
        const report = await this.analysisService.getReport(id);
        const articles = await this.analysisService.getArticles(id);
        if (!report) {
            return res.status(404).json({ message: 'Relatório não encontrado' });
        }
        try {
            const pdfStream = await this.reportPdfService.generateReport(analysis, report, articles);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=Relatorio-Pulso-${analysis.targetName}.pdf`);
            pdfStream.pipe(res);
        }
        catch (error) {
            this.logger.error(`Error generating PDF for analysis ${id}: ${error.message}`);
            return res.status(500).json({ message: 'Erro ao gerar PDF' });
        }
    }
    create(user, createAnalysisDto) {
        this.logger.log(`POST /analysis - Creating analysis for user ${user.id}`);
        return this.analysisService.create(user.id, user.plan, createAnalysisDto);
    }
    startAnalysis(id) {
        this.logger.log(`POST /analysis/${id}/start`);
        this.analysisService.startAnalysis(id).catch((err) => {
            this.logger.error(`Error starting analysis ${id}: ${err.message}`);
        });
        return { message: 'Analysis started' };
    }
    findAll(user) {
        this.logger.log(`GET /analysis - Fetching analyses for user ${user.id}`);
        return this.analysisService.findByUser(user.id);
    }
    findOne(id) {
        this.logger.log(`GET /analysis/${id}`);
        return this.analysisService.findById(id);
    }
    getReport(id) {
        this.logger.log(`GET /analysis/${id}/report`);
        return this.analysisService.getReport(id);
    }
    getArticles(id) {
        this.logger.log(`GET /analysis/${id}/articles`);
        return this.analysisService.getArticles(id);
    }
    update(id, updateAnalysisDto) {
        this.logger.log(`PATCH /analysis/${id}`);
        return this.analysisService.update(id, updateAnalysisDto);
    }
    remove(id) {
        this.logger.log(`DELETE /analysis/${id}`);
        return this.analysisService.remove(id);
    }
};
exports.AnalysisController = AnalysisController;
__decorate([
    (0, common_1.Get)(':id/download'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_c = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AnalysisController.prototype, "download", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_d = typeof create_analysis_dto_1.CreateAnalysisDto !== "undefined" && create_analysis_dto_1.CreateAnalysisDto) === "function" ? _d : Object]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "startAnalysis", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/report'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "getReport", null);
__decorate([
    (0, common_1.Get)(':id/articles'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "getArticles", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_e = typeof update_analysis_dto_1.UpdateAnalysisDto !== "undefined" && update_analysis_dto_1.UpdateAnalysisDto) === "function" ? _e : Object]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AnalysisController.prototype, "remove", null);
exports.AnalysisController = AnalysisController = AnalysisController_1 = __decorate([
    (0, common_1.Controller)('analysis'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof analysis_service_1.AnalysisService !== "undefined" && analysis_service_1.AnalysisService) === "function" ? _a : Object, typeof (_b = typeof report_pdf_service_1.ReportPdfService !== "undefined" && report_pdf_service_1.ReportPdfService) === "function" ? _b : Object])
], AnalysisController);


/***/ }),
/* 48 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ReportPdfService_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportPdfService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const path = __webpack_require__(50);
const fs = __webpack_require__(51);
const handlebars = __webpack_require__(52);
const marked_1 = __webpack_require__(53);
const axios_1 = __webpack_require__(54);
const FormData = __webpack_require__(55);
let ReportPdfService = ReportPdfService_1 = class ReportPdfService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ReportPdfService_1.name);
        this.gotenbergUrl = this.configService.get('GOTENBERG_URL') || 'http://localhost:3003';
        this.registerHelpers();
    }
    registerHelpers() {
        handlebars.registerHelper('scoreColor', (value) => {
            if (value >= 70)
                return 'score-emerald';
            if (value >= 50)
                return 'score-sky';
            if (value >= 30)
                return 'score-amber';
            return 'score-rose';
        });
        handlebars.registerHelper('barColor', (value) => {
            if (value >= 70)
                return 'bg-emerald-500';
            if (value >= 50)
                return 'bg-sky-500';
            if (value >= 30)
                return 'bg-amber-500';
            return 'bg-rose-500';
        });
        handlebars.registerHelper('sentimentColor', (sentiment) => {
            if (sentiment > 0.3)
                return 'text-emerald-500';
            if (sentiment < -0.3)
                return 'text-rose-500';
            return 'text-slate-400';
        });
        handlebars.registerHelper('sentimentPct', (sentiment) => {
            const val = Math.round((sentiment || 0) * 100);
            return `${val > 0 ? '+' : ''}${val}%`;
        });
        handlebars.registerHelper('formatDate', (dateStr) => {
            if (!dateStr)
                return '';
            return new Date(dateStr).toLocaleDateString('pt-BR');
        });
        handlebars.registerHelper('markdown', (text) => {
            if (!text)
                return '';
            return new handlebars.SafeString(marked_1.marked.parse(text));
        });
    }
    async generateReport(analysis, report, articles) {
        this.logger.log(`Generating High-Fidelity PDF via Gotenberg for analysis: ${analysis._id}`);
        try {
            const data = {
                analysis,
                report: this.prepareReportData(report),
                articles: articles.slice(0, 15),
                today: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
            };
            const templatePath = path.join(__dirname, 'templates', 'report.hbs');
            let templateSource;
            try {
                templateSource = await fs.readFile(templatePath, 'utf-8');
            }
            catch (err) {
                const fallbackPath = path.join(process.cwd(), 'src/modules/analysis/templates/report.hbs');
                templateSource = await fs.readFile(fallbackPath, 'utf-8');
            }
            const template = handlebars.compile(templateSource);
            const html = template(data);
            this.logger.debug(`HTML template compiled. Size: ${html.length} chars`);
            this.logger.log(`Calling Gotenberg at: ${this.gotenbergUrl}`);
            const form = new FormData();
            form.append('index.html', html);
            form.append('waitDelay', '2s');
            const response = await axios_1.default.post(`${this.gotenbergUrl}/forms/chromium/convert/html`, form, {
                headers: form.getHeaders(),
                responseType: 'stream',
                timeout: 30000
            });
            return response.data;
        }
        catch (error) {
            const errorMsg = error.response ?
                `Gotenberg failed with status ${error.response.status}: ${JSON.stringify(error.response.data || 'No data')}` :
                `Gotenberg request failed: ${error.message} (Code: ${error.code})`;
            this.logger.error(`Failed to generate PDF via Gotenberg: ${errorMsg}`);
            if (error.code === 'ECONNREFUSED' || error.message?.includes('ECONNREFUSED')) {
                this.logger.error(`CRITICAL: Backend cannot reach Gotenberg at ${this.gotenbergUrl}.`);
                this.logger.error('Please verify if the Docker container is running: docker ps | grep gotenberg');
                this.logger.error('Or try starting it: docker-compose up -d gotenberg');
            }
            throw error;
        }
    }
    prepareReportData(report) {
        const ensureScore = (score) => {
            if (typeof score === 'number') {
                return { value: score, label: this.getScoreLabel(score), explanation: '' };
            }
            return {
                ...score,
                label: score.label || this.getScoreLabel(score.value)
            };
        };
        return {
            ...report,
            overallScore: ensureScore(report.overallScore),
            acceptanceScore: ensureScore(report.acceptanceScore),
            temperatureScore: ensureScore(report.temperatureScore)
        };
    }
    getScoreLabel(value) {
        if (value >= 85)
            return 'Excepcional';
        if (value >= 70)
            return 'Forte';
        if (value >= 50)
            return 'Estável';
        if (value >= 30)
            return 'Frágil';
        return 'Crítico';
    }
};
exports.ReportPdfService = ReportPdfService;
exports.ReportPdfService = ReportPdfService = ReportPdfService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ReportPdfService);


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("handlebars");

/***/ }),
/* 53 */
/***/ ((module) => {

module.exports = require("marked");

/***/ }),
/* 54 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("form-data");

/***/ }),
/* 56 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateAnalysisDto = void 0;
const class_validator_1 = __webpack_require__(25);
class CreateAnalysisDto {
}
exports.CreateAnalysisDto = CreateAnalysisDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAnalysisDto.prototype, "targetName", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['politician', 'influencer', 'celebrity']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAnalysisDto.prototype, "targetType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateAnalysisDto.prototype, "portals", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAnalysisDto.prototype, "plan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnalysisDto.prototype, "instagramProfile", void 0);


/***/ }),
/* 57 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateAnalysisDto = void 0;
const class_validator_1 = __webpack_require__(25);
class UpdateAnalysisDto {
}
exports.UpdateAnalysisDto = UpdateAnalysisDto;
__decorate([
    (0, class_validator_1.IsEnum)(['pending', 'scraping', 'analyzing', 'done', 'error']),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAnalysisDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAnalysisDto.prototype, "progress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateAnalysisDto.prototype, "errorMessage", void 0);


/***/ }),
/* 58 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AiModule = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const ai_service_1 = __webpack_require__(43);
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [ai_service_1.AiService],
        exports: [ai_service_1.AiService],
    })
], AiModule);


/***/ }),
/* 59 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsModule = void 0;
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(5);
const news_service_1 = __webpack_require__(41);
const news_controller_1 = __webpack_require__(60);
const news_article_schema_1 = __webpack_require__(42);
let NewsModule = class NewsModule {
};
exports.NewsModule = NewsModule;
exports.NewsModule = NewsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: news_article_schema_1.NewsArticle.name, schema: news_article_schema_1.NewsArticleSchema }])],
        controllers: [news_controller_1.NewsController],
        providers: [news_service_1.NewsService],
        exports: [news_service_1.NewsService],
    })
], NewsModule);


/***/ }),
/* 60 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NewsController_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewsController = void 0;
const common_1 = __webpack_require__(2);
const news_service_1 = __webpack_require__(41);
const jwt_auth_guard_1 = __webpack_require__(15);
const parse_objectid_pipe_1 = __webpack_require__(27);
let NewsController = NewsController_1 = class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
        this.logger = new common_1.Logger(NewsController_1.name);
    }
    findByAnalysis(analysisId) {
        this.logger.log(`GET /news/analysis/${analysisId}`);
        return this.newsService.findByAnalysis(analysisId);
    }
};
exports.NewsController = NewsController;
__decorate([
    (0, common_1.Get)('analysis/:analysisId'),
    __param(0, (0, common_1.Param)('analysisId', parse_objectid_pipe_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "findByAnalysis", null);
exports.NewsController = NewsController = NewsController_1 = __decorate([
    (0, common_1.Controller)('news'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [typeof (_a = typeof news_service_1.NewsService !== "undefined" && news_service_1.NewsService) === "function" ? _a : Object])
], NewsController);


/***/ }),
/* 61 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScrapingModule = void 0;
const common_1 = __webpack_require__(2);
const scraping_service_1 = __webpack_require__(46);
const scraping_controller_1 = __webpack_require__(62);
let ScrapingModule = class ScrapingModule {
};
exports.ScrapingModule = ScrapingModule;
exports.ScrapingModule = ScrapingModule = __decorate([
    (0, common_1.Module)({
        controllers: [scraping_controller_1.ScrapingController],
        providers: [scraping_service_1.ScrapingService],
        exports: [scraping_service_1.ScrapingService],
    })
], ScrapingModule);


/***/ }),
/* 62 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScrapingController = void 0;
const common_1 = __webpack_require__(2);
const scraping_service_1 = __webpack_require__(46);
const public_decorator_1 = __webpack_require__(17);
let ScrapingController = class ScrapingController {
    constructor(scrapingService) {
        this.scrapingService = scrapingService;
    }
    async triggerScraping(targetName, portals, analysisId) {
        return this.scrapingService.triggerScraping(targetName, portals, analysisId);
    }
    async getStatus(jobId) {
        return this.scrapingService.getScrapingStatus(jobId);
    }
    async healthCheck() {
        const isHealthy = await this.scrapingService.healthCheck();
        return { status: isHealthy ? 'healthy' : 'unhealthy' };
    }
};
exports.ScrapingController = ScrapingController;
__decorate([
    (0, common_1.Post)('trigger'),
    __param(0, (0, common_1.Body)('targetName')),
    __param(1, (0, common_1.Body)('portals')),
    __param(2, (0, common_1.Body)('analysisId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, String]),
    __metadata("design:returntype", Promise)
], ScrapingController.prototype, "triggerScraping", null);
__decorate([
    (0, common_1.Get)('status/:jobId'),
    __param(0, (0, common_1.Param)('jobId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScrapingController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Get)('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScrapingController.prototype, "healthCheck", null);
exports.ScrapingController = ScrapingController = __decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('scraping'),
    __metadata("design:paramtypes", [typeof (_a = typeof scraping_service_1.ScrapingService !== "undefined" && scraping_service_1.ScrapingService) === "function" ? _a : Object])
], ScrapingController);


/***/ }),
/* 63 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsModule = void 0;
const common_1 = __webpack_require__(2);
const payments_service_1 = __webpack_require__(64);
const payments_controller_1 = __webpack_require__(67);
const users_module_1 = __webpack_require__(18);
const plans_module_1 = __webpack_require__(69);
let PaymentsModule = class PaymentsModule {
};
exports.PaymentsModule = PaymentsModule;
exports.PaymentsModule = PaymentsModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, plans_module_1.PlansModule],
        controllers: [payments_controller_1.PaymentsController],
        providers: [payments_service_1.PaymentsService],
        exports: [payments_service_1.PaymentsService],
    })
], PaymentsModule);


/***/ }),
/* 64 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentsService_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsService = void 0;
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const stripe_1 = __webpack_require__(65);
const users_service_1 = __webpack_require__(19);
const plans_service_1 = __webpack_require__(66);
let PaymentsService = PaymentsService_1 = class PaymentsService {
    constructor(configService, usersService, plansService) {
        this.configService = configService;
        this.usersService = usersService;
        this.plansService = plansService;
        this.logger = new common_1.Logger(PaymentsService_1.name);
        const stripeSecretKey = this.configService.get('stripe.secretKey');
        this.stripe = new stripe_1.default(stripeSecretKey, {
            apiVersion: '2023-10-16',
        });
        this.stripeWebhookSecret = this.configService.get('stripe.webhookSecret');
        if (!this.stripeWebhookSecret) {
            this.logger.warn('Stripe webhook secret not configured - webhook signature verification disabled');
        }
    }
    async createCheckoutSession(userId, planName, successUrl, cancelUrl) {
        this.logger.log(`Creating checkout session for user ${userId}, plan: ${planName}`);
        const plan = this.plansService.getPlan(planName);
        if (!plan) {
            throw new common_1.BadRequestException(`Invalid plan: ${planName}`);
        }
        const user = await this.usersService.findById(userId);
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const customer = await this.stripe.customers.create({
                email: user.email,
                name: user.name,
                metadata: {
                    userId: userId,
                },
            });
            customerId = customer.id;
            await this.usersService.updateStripeCustomerId(userId, customerId);
            this.logger.log(`Created Stripe customer: ${customerId} for user ${userId}`);
        }
        const session = await this.stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: plan.name,
                            description: plan.features.join(', '),
                        },
                        unit_amount: plan.price * 100,
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: successUrl || `${this.configService.get('app.frontendUrl')}/dashboard?payment=success`,
            cancel_url: cancelUrl || `${this.configService.get('app.frontendUrl')}/plans?payment=cancelled`,
            metadata: {
                userId: userId,
                plan: planName,
            },
        });
        this.logger.log(`Checkout session created: ${session.id} for user ${userId}`);
        return {
            sessionId: session.id,
            url: session.url,
        };
    }
    async handleWebhook(rawBody, signature) {
        let event;
        if (this.stripeWebhookSecret && signature) {
            try {
                event = this.stripe.webhooks.constructEvent(rawBody, signature, this.stripeWebhookSecret);
                this.logger.log(`Webhook signature verified: ${event.type}`);
            }
            catch (err) {
                this.logger.error(`Webhook signature verification failed: ${err.message}`);
                throw new common_1.BadRequestException('Invalid webhook signature');
            }
        }
        else {
            event = JSON.parse(rawBody.toString());
            this.logger.warn(`Processing webhook WITHOUT signature verification: ${event.type}`);
        }
        this.logger.log(`Processing webhook event: ${event.type}`);
        switch (event.type) {
            case 'checkout.session.completed':
                await this.handleCheckoutCompleted(event.data.object);
                break;
            case 'customer.subscription.updated':
                await this.handleSubscriptionUpdated(event.data.object);
                break;
            case 'customer.subscription.deleted':
                await this.handleSubscriptionDeleted(event.data.object);
                break;
            default:
                this.logger.log(`Unhandled webhook event type: ${event.type}`);
        }
    }
    async handleCheckoutCompleted(session) {
        this.logger.log(`Checkout completed: ${session.id}`);
        const userId = session.metadata?.userId;
        const plan = session.metadata?.plan;
        if (!userId || !plan) {
            this.logger.error('Missing userId or plan in checkout session metadata');
            return;
        }
        await this.usersService.update(userId, { plan });
        this.logger.log(`User ${userId} plan updated to: ${plan}`);
    }
    async handleSubscriptionUpdated(subscription) {
        this.logger.log(`Subscription updated: ${subscription.id}`);
        const customerId = subscription.customer;
        const users = await this.usersService.findAll();
        const user = users.find((u) => u.stripeCustomerId === customerId);
        if (!user) {
            this.logger.error(`User not found for Stripe customer: ${customerId}`);
            return;
        }
        if (subscription.status === 'active') {
            this.logger.log(`Subscription active for user ${user._id}`);
        }
        else if (subscription.status === 'canceled' || subscription.status === 'unpaid') {
            await this.usersService.update(user._id.toString(), { plan: 'essential' });
            this.logger.log(`User ${user._id} downgraded to essential due to subscription status: ${subscription.status}`);
        }
    }
    async handleSubscriptionDeleted(subscription) {
        this.logger.log(`Subscription deleted: ${subscription.id}`);
        const customerId = subscription.customer;
        const users = await this.usersService.findAll();
        const user = users.find((u) => u.stripeCustomerId === customerId);
        if (!user) {
            this.logger.error(`User not found for Stripe customer: ${customerId}`);
            return;
        }
        await this.usersService.update(user._id.toString(), { plan: 'essential' });
        this.logger.log(`User ${user._id} downgraded to essential after subscription deletion`);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = PaymentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _b : Object, typeof (_c = typeof plans_service_1.PlansService !== "undefined" && plans_service_1.PlansService) === "function" ? _c : Object])
], PaymentsService);


/***/ }),
/* 65 */
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),
/* 66 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PlansService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlansService = void 0;
const common_1 = __webpack_require__(2);
let PlansService = PlansService_1 = class PlansService {
    constructor() {
        this.logger = new common_1.Logger(PlansService_1.name);
        this.plans = {
            essential: {
                name: 'Essential',
                price: 990,
                maxTargets: 1,
                maxPortals: 3,
                updateFrequency: 'weekly',
                features: ['General AI analysis', 'Weekly updates'],
            },
            professional: {
                name: 'Professional',
                price: 490,
                maxTargets: 3,
                maxPortals: 10,
                updateFrequency: 'weekly',
                features: [
                    'Detailed per-article analysis',
                    'Temperature & acceptance scores',
                    'Weekly updates',
                ],
            },
            strategic: {
                name: 'Strategic',
                price: 4990,
                maxTargets: 5,
                maxPortals: 10,
                updateFrequency: 'every-3-days',
                features: [
                    'Per-portal score',
                    'Bias map',
                    'Positioning recommendations',
                    'Weekly PDF report',
                    'Updates every 3 days',
                ],
            },
        };
    }
    getAllPlans() {
        this.logger.log('Fetching all plans');
        return this.plans;
    }
    getPlan(planName) {
        this.logger.log(`Fetching plan: ${planName}`);
        return this.plans[planName] || null;
    }
    canUserPerformAction(userPlan, action, currentCount) {
        const plan = this.getPlan(userPlan);
        if (!plan) {
            this.logger.warn(`Invalid plan: ${userPlan}`);
            return false;
        }
        const limit = action === 'create_target' ? plan.maxTargets : plan.maxPortals;
        const canPerform = currentCount < limit;
        this.logger.log(`User with ${userPlan} plan ${canPerform ? 'CAN' : 'CANNOT'} ${action} (${currentCount}/${limit})`);
        return canPerform;
    }
};
exports.PlansService = PlansService;
exports.PlansService = PlansService = PlansService_1 = __decorate([
    (0, common_1.Injectable)()
], PlansService);


/***/ }),
/* 67 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PaymentsController_1;
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentsController = void 0;
const common_1 = __webpack_require__(2);
const express_1 = __webpack_require__(48);
const payments_service_1 = __webpack_require__(64);
const create_checkout_dto_1 = __webpack_require__(68);
const jwt_auth_guard_1 = __webpack_require__(15);
const current_user_decorator_1 = __webpack_require__(34);
const public_decorator_1 = __webpack_require__(17);
let PaymentsController = PaymentsController_1 = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
        this.logger = new common_1.Logger(PaymentsController_1.name);
    }
    async createCheckout(user, createCheckoutDto) {
        this.logger.log(`POST /payments/checkout - User: ${user.id}, Plan: ${createCheckoutDto.plan}`);
        return this.paymentsService.createCheckoutSession(user.id, createCheckoutDto.plan, createCheckoutDto.successUrl, createCheckoutDto.cancelUrl);
    }
    async handleWebhook(req, signature) {
        this.logger.log('POST /payments/webhook - Processing Stripe webhook');
        const rawBody = req.body;
        await this.paymentsService.handleWebhook(rawBody, signature);
        return { received: true };
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('checkout'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof create_checkout_dto_1.CreateCheckoutDto !== "undefined" && create_checkout_dto_1.CreateCheckoutDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createCheckout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Headers)('stripe-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handleWebhook", null);
exports.PaymentsController = PaymentsController = PaymentsController_1 = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [typeof (_a = typeof payments_service_1.PaymentsService !== "undefined" && payments_service_1.PaymentsService) === "function" ? _a : Object])
], PaymentsController);


/***/ }),
/* 68 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateCheckoutDto = void 0;
const class_validator_1 = __webpack_require__(25);
class CreateCheckoutDto {
}
exports.CreateCheckoutDto = CreateCheckoutDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['essential', 'professional', 'strategic'], {
        message: 'Plan must be one of: essential, professional, strategic',
    }),
    __metadata("design:type", String)
], CreateCheckoutDto.prototype, "plan", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCheckoutDto.prototype, "successUrl", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCheckoutDto.prototype, "cancelUrl", void 0);


/***/ }),
/* 69 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlansModule = void 0;
const common_1 = __webpack_require__(2);
const plans_service_1 = __webpack_require__(66);
const plans_controller_1 = __webpack_require__(70);
let PlansModule = class PlansModule {
};
exports.PlansModule = PlansModule;
exports.PlansModule = PlansModule = __decorate([
    (0, common_1.Module)({
        controllers: [plans_controller_1.PlansController],
        providers: [plans_service_1.PlansService],
        exports: [plans_service_1.PlansService],
    })
], PlansModule);


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PlansController_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlansController = void 0;
const common_1 = __webpack_require__(2);
const plans_service_1 = __webpack_require__(66);
const public_decorator_1 = __webpack_require__(17);
let PlansController = PlansController_1 = class PlansController {
    constructor(plansService) {
        this.plansService = plansService;
        this.logger = new common_1.Logger(PlansController_1.name);
    }
    getAllPlans() {
        this.logger.log('GET /plans - Fetching all plans');
        return this.plansService.getAllPlans();
    }
    getPlan(name) {
        this.logger.log(`GET /plans/${name}`);
        return this.plansService.getPlan(name);
    }
};
exports.PlansController = PlansController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlansController.prototype, "getAllPlans", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(':name'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlansController.prototype, "getPlan", null);
exports.PlansController = PlansController = PlansController_1 = __decorate([
    (0, common_1.Controller)('plans'),
    __metadata("design:paramtypes", [typeof (_a = typeof plans_service_1.PlansService !== "undefined" && plans_service_1.PlansService) === "function" ? _a : Object])
], PlansController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('app.port');
    const nodeEnv = configService.get('app.nodeEnv');
    app.enableCors({
        origin: ['http://localhost:3000', 'http://frontend:3000'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api');
    await app.listen(port);
    logger.log(`🚀 Application running in ${nodeEnv} mode on port ${port}`);
    logger.log(`📡 API available at: http://localhost:${port}/api`);
    logger.log(`🔐 CORS enabled for: http://localhost:3000`);
}
bootstrap();

})();

/******/ })()
;