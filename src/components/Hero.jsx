import React, { Component } from "react";

export default class Hero extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      hobby: "",
      birthday: "",
      gender: "",
      todos: [],
      editId: null, // Track the ID of the item being edited
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, hobby, birthday, gender, todos, editId } = this.state;

    if (editId) {
      // Editing an existing item
      this.setState({
        todos: todos.map((todo) =>
          todo.id === editId
            ? { ...todo, fname, lname, hobby, birthday, gender }
            : todo
        ),
        fname: "",
        lname: "",
        hobby: "",
        gender: "",
        birthday: "",
        editId: null, // Reset edit mode
      });
    } else {
      // Adding a new item
      let newTodo = {
        id: Date.now(),
        fname,
        lname,
        hobby,
        birthday,
        gender,
      };
      this.setState({
        fname: "",
        lname: "",
        hobby: "",
        gender: "",
        birthday: "",
        todos: [...todos, newTodo],
      });
    }
  };

  handleEdit = (todo) => {
    this.setState({
      fname: todo.fname,
      lname: todo.lname,
      hobby: todo.hobby,
      birthday: todo.birthday,
      gender: todo.gender,
      editId: todo.id, // Store the ID for editing
    });
  };

  handleDelete = (id) => {
    let todos = this.state.todos.filter((item) => item.id !== id);
    this.setState({ todos });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.fname}
            onChange={(e) => this.setState({ fname: e.target.value })}
            type="text"
            required
            placeholder="First Name"
          />
          <input
            value={this.state.lname}
            onChange={(e) => this.setState({ lname: e.target.value })}
            type="text"
            required
            placeholder="Last Name"
          />
          <input
            value={this.state.hobby}
            onChange={(e) => this.setState({ hobby: e.target.value })}
            type="text"
            required
            placeholder="Hobby"
          />
          <input
            value={this.state.gender}
            onChange={(e) => this.setState({ gender: e.target.value })}
            type="text"
            required
            placeholder="Gender"
          />
          <input
            value={this.state.birthday}
            onChange={(e) => this.setState({ birthday: e.target.value })}
            type="date"
            required
            placeholder="Birthday"
          />
          <button type="submit">
            {this.state.editId ? "Update" : "Submit"}
          </button>
        </form>

        <div>
          {this.state.todos.map((todo) => (
            <div key={todo.id}>
              <h3>First Name: {todo.fname}</h3>
              <p>Last Name: {todo.lname}</p>
              <p>Hobby: {todo.hobby}</p>
              <p>Gender: {todo.gender}</p>
              <p>Birthday: {todo.birthday}</p>
              <button onClick={() => this.handleEdit(todo)}>Edit</button>
              <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
              <hr />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
