import {http} from "../http-common";

class TaskDataService {
  getAll() {
    return http.get("/Task");
  }

  get(id) {
    return http.get(`/Task/${id}`);
  }

  create(data) {
    return http.post("/Task", data);
  }

  update(id, data) {
    return http.put(`/Task/${id}`, data);
  }

  delete(id) {
    return http.delete(`/Task/${id}`);
  }

  deleteAll() {
    return http.delete(`/Task`);
  }

  findByTitle(title) {
    return http.get(`/Task/Title/?title=${title}`);
  }
  findByStatus(status) {
    return http.get(`/Task/status/?status=${status}`);
  }
}

export default new TaskDataService();