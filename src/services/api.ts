import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import {
  Board,
  ChangeTaskStatus,
  CreateTaskPayload,
  Filters,
  Project,
  TaskStatus,
  TaskType,
} from "../data/runrunit";
import { logger } from "../utils/logger";
import { ConfigService } from "./config";

export class RunrunitService {
  private api!: AxiosInstance;

  async prepare() {
    const config = await ConfigService.get();

    if (!config.APP_KEY || !config.USER_TOKEN) return;

    const headers: AxiosRequestHeaders = {
      "App-Key": config.APP_KEY,
      "User-Token": config.USER_TOKEN,
    };

    this.api = axios.create({
      baseURL: "https://runrun.it/api/v1.0",
      headers,
    });
  }

  async getBoards() {
    const boards: Board[] = [
      { id: 319149, alias: "green-signal", name: "Green Signal" },
      { id: 341086, alias: "sst-app", name: "SST - APP" },
      { id: 322422, alias: "blw", name: "BLW" },
    ];

    return boards;
  }

  async getProjects() {
    const { data } = await this.api.get<Project[]>("/projects");

    return data;
  }

  async getTaskStatuses() {
    const { data } = await this.api.get<TaskStatus[]>("/task_statuses");

    return data;
  }

  async getTasks(filters?: Filters) {
    const { data } = await this.api.get<TaskType[]>("/tasks", {
      params: {
        sort: "close_date",
        board_id: filters?.board,
        project_id: filters?.project,
        board_stage_id: filters?.status,
      },
    });

    return data;
  }

  async getTask(id: TaskType["id"]) {
    const { data } = await this.api.get<TaskType>(`/tasks/${id}`);

    return data;
  }

  async createTask(props: CreateTaskPayload) {
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

    const { data } = await this.api.post(`/tasks`, payload);

    return data;
  }

  async moveCard(id: TaskType["id"], statusOrId: ChangeTaskStatus) {
    const { data } =
      statusOrId === "done"
        ? await this.api.post(`/tasks/${id}/deliver`)
        : await this.api.post(`/tasks/${id}/change_status`, {
            task_status_id: statusOrId,
          });

    return data;
  }

  async playCard(id: TaskType["id"]) {
    const { data } = await this.api.post<TaskType>(`/tasks/${id}/play`);

    return data;
  }

  async pauseCard(id: TaskType["id"]) {
    const { data } = await this.api.post<TaskType>(`/tasks/${id}/pause`);

    return data;
  }
}
