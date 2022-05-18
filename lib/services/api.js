"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunrunitService = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const config_1 = require("./config");
class RunrunitService {
    prepare() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const config = yield config_1.ConfigService.get();
            if (!config.APP_KEY || !config.USER_TOKEN)
                return;
            const headers = {
                "App-Key": config.APP_KEY,
                "User-Token": config.USER_TOKEN,
            };
            this.api = axios_1.default.create({
                baseURL: "https://runrun.it/api/v1.0",
                headers,
            });
        });
    }
    getBoards() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const boards = [
                { id: 319149, alias: "green-signal", name: "Green Signal" },
                { id: 341086, alias: "sst-app", name: "SST - APP" },
                { id: 322422, alias: "blw", name: "BLW" },
            ];
            return boards;
        });
    }
    getProjects() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.get("/projects");
            return data;
        });
    }
    getTaskStatuses() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.get("/task_statuses");
            return data;
        });
    }
    getTasks(filters) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.get("/tasks", {
                params: {
                    sort: "close_date",
                    board_id: filters === null || filters === void 0 ? void 0 : filters.board,
                    project_id: filters === null || filters === void 0 ? void 0 : filters.project,
                    board_stage_id: filters === null || filters === void 0 ? void 0 : filters.status,
                },
            });
            return data;
        });
    }
    getTask(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.get(`/tasks/${id}`);
            return data;
        });
    }
    createTask(props) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = {
                task: {
                    title: props.name,
                    type_id: props.type,
                    project_id: props.project,
                    board_id: props.board,
                    board_stage_id: props.status,
                    is_urgent: props.expedite,
                    // assignments: [{ assignee_id }],
                },
            };
            const { data } = yield this.api.post(`/tasks`, payload);
            return data;
        });
    }
    moveCard(id, statusOrId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = statusOrId === "done"
                ? yield this.api.post(`/tasks/${id}/deliver`)
                : yield this.api.post(`/tasks/${id}/change_status`, {
                    task_status_id: statusOrId,
                });
            return data;
        });
    }
    playCard(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.post(`/tasks/${id}/play`);
            return data;
        });
    }
    pauseCard(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.api.post(`/tasks/${id}/pause`);
            return data;
        });
    }
}
exports.RunrunitService = RunrunitService;
