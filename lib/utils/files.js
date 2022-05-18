"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJSON = exports.writeJSON = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
function writeJSON(data, path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const previousContent = yield readJSON(path);
        const newContent = Object.assign(Object.assign({}, previousContent), data);
        const content = JSON.stringify(newContent, null, 2);
        return yield fs_1.promises.writeFile(path, content);
    });
}
exports.writeJSON = writeJSON;
function readJSON(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const content = yield fs_1.promises.readFile(path, "utf8").catch(() => null);
        if (!content)
            return null;
        return JSON.parse(content);
    });
}
exports.readJSON = readJSON;
