#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var esa_client_1 = require("./esa-client");
var upload_1 = require("./upload");
var dotenv = __importStar(require("dotenv"));
var chalk = require('chalk');
var figlet = require('figlet');
var path = require('path');
var program = require('commander');
dotenv.config();
console.log(chalk.greenBright(figlet.textSync('wataridori')));
program
    .version('1.0.2')
    .arguments('<filename>')
    .description("CLI for Importing emoji to esa.io")
    .option('-a, --access-token <access-token>', 'esa access token (with write access)')
    .option('-t, --team-name <team-name>', 'team name (Usually, it is a sub domain)')
    .option('-d, --delete-succeeded-files', '')
    .option('--dry', "It won't upload.")
    .option('--verbose', 'Show more details while processing.')
    // .option('-g, --convert-apng-to-gif', '') // TODO convert to gif (beta)
    // .option('-r, --convert-romaji-filename', '') // TODO convert to romaji (beta)
    .action(function (filename) {
    var team = program.teamName || process.env.ESA_TEAM_NAME;
    var token = program.accessToken || process.env.ESA_TOKEN;
    if (!team || !token) {
        console.error("Error: You have to specify both " + chalk.red('team name') + " and " + chalk.red('access token') + ". See help for more details.");
        return;
    }
    var client = new esa_client_1.EsaClient(team, token);
    var filepath = path.resolve(process.cwd(), filename);
    var deleteSucceededFiles = program.deleteSucceededFiles;
    var dry = program.dry;
    var verbose = program.verbose;
    upload_1.upload({ filepath: filepath, client: client, deleteSucceededFiles: deleteSucceededFiles, dry: dry, verbose: verbose });
})
    .parse(process.argv);
if (!(program.args[0] || '').length) {
    program.outputHelp();
}
