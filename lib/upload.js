"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var esa_client_1 = require("./esa-client");
var utils_1 = require("./utils");
var ora = require("ora");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var esa_defined_emojis_1 = require("./esa-defined-emojis");
function upload(param) {
    return __awaiter(this, void 0, void 0, function () {
        var spinner, options, isDirectory, files;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spinner = ora({
                        discardStdin: false,
                        text: "Uploading emoji to " + param.client.teamName + ".esa.io..."
                    }).start();
                    options = {
                        deleteSucceededFiles: param.deleteSucceededFiles,
                        dry: param.dry,
                        verbose: param.verbose
                    };
                    if (options.dry && options.verbose)
                        spinner.info('Running on dry mode...');
                    return [4 /*yield*/, utils_1.isDir(param.filepath)];
                case 1:
                    isDirectory = _a.sent();
                    if (!isDirectory) return [3 /*break*/, 2];
                    fs.readdir(param.filepath, function (err, directoryFiles) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        spinner.fail(err);
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, uploadInternal(directoryFiles, spinner, param, options)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 4];
                case 2:
                    files = [param.filepath];
                    return [4 /*yield*/, uploadInternal(files, spinner, param, options)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.upload = upload;
function uploadInternal(files, spinner, param, options) {
    return __awaiter(this, void 0, void 0, function () {
        var list, length, i, timeoutMs, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, filterFiles(files, param.filepath, spinner, options)];
                case 1:
                    list = _a.sent();
                    length = list.length;
                    if (length === 0) {
                        spinner.succeed("No files can be uploaded to esa.io.");
                        return [2 /*return*/];
                    }
                    spinner.info(length + " acceptable PNG file(s) found!");
                    spinner.info("This upload process will take about " + (length - 1) * esa_client_1.ESA_API_INTERVAL / 1000 + " seconds.");
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < list.length)) return [3 /*break*/, 9];
                    timeoutMs = options.dry || (i + 1 === list.length) ? 0 : esa_client_1.ESA_API_INTERVAL;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 6, , 8]);
                    spinner.start("Uploading " + chalk_1.default.red(list[i].name) + "... (" + (i + 1) + " of " + length + ")");
                    return [4 /*yield*/, uploadFile(list[i].fullPath, param.client, options)];
                case 4:
                    result = _a.sent();
                    spinner.succeed("Successfully uploaded as " + chalk_1.default.red(result) + ". (" + (i + 1) + " of " + length + ")");
                    spinner.start('Waiting for next file...');
                    return [4 /*yield*/, utils_1.wait(timeoutMs)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 6:
                    e_1 = _a.sent();
                    spinner.fail(e_1);
                    spinner.start('Waiting for next file...');
                    return [4 /*yield*/, utils_1.wait(timeoutMs)];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 8:
                    i++;
                    return [3 /*break*/, 2];
                case 9:
                    spinner.succeed('Done!');
                    return [2 /*return*/];
            }
        });
    });
}
function uploadFile(filepath, client, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var name, e_2, obj;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                name = path.basename(filepath, path.extname(filepath));
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 5, , 6]);
                                if (options.dry) {
                                    resolve(name);
                                    return [2 /*return*/];
                                }
                                return [4 /*yield*/, client.upload({ filepath: filepath, name: name })];
                            case 2:
                                _a.sent();
                                if (!options.deleteSucceededFiles) return [3 /*break*/, 4];
                                return [4 /*yield*/, utils_1.deleteFile(filepath)];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4:
                                resolve(name);
                                return [3 /*break*/, 6];
                            case 5:
                                e_2 = _a.sent();
                                obj = JSON.parse(e_2.error);
                                reject("API Error: " + obj.message);
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function filterFiles(files, filePath, spinner, options) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var result, i, p, name_1, isAnimatedPNG;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                // At this point, we're just working for png files.
                                files = files.filter(function (f) { return f.endsWith('.png'); });
                                if (options.verbose)
                                    spinner.info(files.length + " PNG file(s) found!");
                                result = [];
                                i = 0;
                                _a.label = 1;
                            case 1:
                                if (!(i < files.length)) return [3 /*break*/, 4];
                                p = path.resolve(filePath, files[i]);
                                name_1 = path.basename(p, path.extname(p));
                                return [4 /*yield*/, utils_1.isAPNG(p)];
                            case 2:
                                isAnimatedPNG = _a.sent();
                                if (!isAnimatedPNG) {
                                    result.push({
                                        name: name_1,
                                        fullPath: p
                                    });
                                    return [3 /*break*/, 3];
                                }
                                if (options.verbose) {
                                    spinner.info(chalk_1.default.red(name_1) + " can't be uploaded because this file is APNG.");
                                }
                                _a.label = 3;
                            case 3:
                                i++;
                                return [3 /*break*/, 1];
                            case 4:
                                // esa.io only accepts emoji name for alphabet, number, and some character(-_) only.
                                result = result.filter(function (i) {
                                    var result = /[a-z\d-_]+/.test(i.name);
                                    if (!result && options.verbose) {
                                        spinner.info(chalk_1.default.red(i.name) + " can't be uploaded because this name is not accepted by esa.io.");
                                    }
                                    return result;
                                })
                                    // filter all pre-defined emojis on esa.io
                                    .filter(function (i) { return !esa_defined_emojis_1.ESA_DEFINED_EMOJIS.includes(i.name); });
                                resolve(result);
                                return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
