import React, { Component } from "react";
import TaskDataService from "../../services/task.service";
import { Link } from "react-router-dom";
import './style.css'

export default class TaskList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTasks = this.retrieveTasks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTask = this.setActiveTask.bind(this);
    this.removeAllTasks = this.removeAllTasks.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      tasks: [],
      currentTask: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTasks();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTasks() {
    TaskDataService.getAll()
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTasks();
    this.setState({
      currentTask: null,
      currentIndex: -1
    });
  }

  setActiveTask(task, index) {
    this.setState({
      currentTask: task,
      currentIndex: index
    });
  }

  removeAllTasks() {
    TaskDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTask: null,
      currentIndex: -1
    });

    TaskDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tasks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  handleChange(e) {
    e.preventDefault();

    TaskDataService.findByStatus(e.target.value)
    .then(response =>{
      this.setState({tasks:response.data});
      console.log(response.data)
    })
    .catch( e =>{
      console.log(e)
    })
  }

  render() {
    const { searchTitle, tasks, currentTask, currentIndex } = this.state;

    return (
      <div id="tasklist-page" className="list row">
        <div className="search-container ">

          <input
            type="text"
            className=""
            placeholder="Procurar pelo Titulo"
            value={searchTitle}
            onChange={this.onChangeSearchTitle}
          />

        <button
          className=""
          type="button"
          onClick={this.searchTitle}
        >
          Procurar
        </button>
      </div>
      <div className="flex between">
          <div>
          <h3 className="wc-text">Lista de Tarefas</h3>
          </div>
          <div id="select-status" >
          <h3 className="wc-text">Buscar por status:</h3>
          <select className="wc-text" onChange={this.handleChange}>

          <option>Selecione</option>
          <option value="true">Concluidas</option>
          <option value="false">Não Concluidas</option>
        </select>
        </div>
      </div>
     
        <div className="col-md-6">

          <ul className="list-group">
            {tasks &&
              tasks.map((task, index) => (
                <li
                  className={
                    "list-group-task wc-text " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTask(task, index)}
                  key={index}
                >
                  {task.title}
                </li>
              ))}
          </ul>

          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTasks}
          >
            Remove All
          </button> */}
        </div>
        
        <div className="col-md-6 wc-text">
          {currentTask ? (
            <div>
              <h4>Tarefa</h4>
              <div>
                <label>
                  <strong>Titulo:</strong>
                </label>{" "}
                {currentTask.title}
              </div>
              <div>
                <label>
                  <strong>Descrição:</strong>
                </label>{" "}
                {currentTask.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTask.status ? "Concluida" : "Não Concluida"}
              </div>
              <div>
                <label>
                  <strong>Criado em:</strong>
                </label>{" "}
                {currentTask.createdAt}
              </div>
              <div>
                <label>
                  <strong>Finalizado em:</strong>
                </label>{" "}
                {currentTask.finishedAt}
              </div>

              <Link
                to={"/home/tasks/" + currentTask.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p className="wc-text">Por favor, clique em uma tarefa...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
