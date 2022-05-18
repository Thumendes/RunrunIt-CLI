export interface TaskType {
  id: number;
  title: string;
  name: string;
  is_visible: boolean;
  standard_effort: string;
  standard_effort_time: number;
  avg_delivery: number;
  color: string;
  is_public: boolean;
  is_default: boolean;
}

export interface TaskStatus {
  id: number;
  name: string;
  stage_group: string;
  board_id: number;
  position: number;
  is_following: boolean;
  use_latency_time: boolean;
  is_default: boolean;
  is_delivered: boolean;
  status_group: string;
}

export interface Project {
  id: number;
  name: string;
}

export interface Filters {
  project?: number;
  board?: number;
  status?: number;
}

export interface Board {
  id: number;
  alias: string;
  name: string;
}

export type ChangeTaskStatus = "done" | Omit<string, "done">;

export interface CreateTaskPayload {
  name: string;
  type: number;
  project: number;
  board: number;
  status: number;
  expedite?: boolean;
}
