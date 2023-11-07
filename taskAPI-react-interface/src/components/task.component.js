import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { withRouter } from '../common/with-router';

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getTask = this.getTask.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);

    this.state = {
      currentTask: {
        _id: null,
        title: "",
        status: "",
        createdAt:"",
        finishedAt:null
      }
    };
  }

  componentDidMount() {
    this.getTask(this.props.router.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        description: description
      }
    }));
  }
  onChangeStatus(e){
    const status = e.target.checked;
    this.setState(prevState => ({
      currentTask: {
        ...prevState.currentTask,
        status:status
      }
  }))
  }

  getTask(id) {
    TaskDataService.get(id)
      .then(response => {
        this.setState({
          currentTask: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      description: this.state.currentTask.description,
      published: status
    };

    TaskDataService.update(this.state.currentTask.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentTask: {
            ...prevState.currentTask,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTask() {
    TaskDataService.update(
      this.state.currentTask.id,
      this.state.currentTask
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Tarefa atualizada com sucesso!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTask() {    
    TaskDataService.delete(this.state.currentTask.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/home');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form wc-text">
            <h4 >Tarefa</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title" className="">Titulo</label>
                <input
                  type="text"
                  className=""
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição</label>
                <input
                  type="text"
                  className=""
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Concluida:</strong>
                </label>
                <label className="switch">
                  <input type="checkbox" onChange={this.onChangeStatus}/>
                  <span className="slider round"></span>
                </label>
              </div>
              
            </form>

            {/* {currentTask.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )} */}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTask}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor, clique em uma atividade...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Task);