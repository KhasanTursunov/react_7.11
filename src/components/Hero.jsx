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
      editId: null,
    };
  }

  getImage = (gender) => {
    if (gender === "Male")
      return "https://cdn-icons-png.flaticon.com/512/21/21104.png";
    if (gender === "Female")
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNJryFTSQUV8Zuu_EGw2iUCpMbIIKWHBl2eQ&s";
    return "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, hobby, birthday, gender, todos, editId } = this.state;

    if (editId !== null) {
      this.setState({
        todos: todos.map((todo) =>
          todo.id === editId
            ? {
                ...todo,
                fname,
                lname,
                hobby,
                birthday,
                gender,
                image: this.getImage(gender),
              }
            : todo
        ),
        fname: "",
        lname: "",
        hobby: "",
        gender: "",
        birthday: "",
        editId: null,
      });
    } else {
      let newTodo = {
        id: Date.now(),
        fname,
        lname,
        hobby,
        birthday,
        gender,
        image: this.getImage(gender),
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
      editId: todo.id,
    });
  };

  handleDelete = (id) => {
    const { editId, fname, lname, hobby, birthday, gender } = this.state;

    let todos = this.state.todos.filter((item) => item.id !== id);

    this.setState((prevState) => ({
      todos,
      ...(prevState.editId === id
        ? {
            fname: "",
            lname: "",
            hobby: "",
            birthday: "",
            gender: "",
            editId: null,
          }
        : {}),
    }));
  };

  handleClearAll = () => {
    this.setState({ todos: [] });
  };

  render() {
    return (
      <div className="flex flex-col md:flex-row items-start min-h-screen bg-gray-100 p-10 gap-6">
        <div className="md:w-1/2 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
            User Form
          </h2>
          <form onSubmit={this.handleSubmit} className="space-y-4">
            <input
              value={this.state.fname}
              onChange={(e) => this.setState({ fname: e.target.value })}
              type="text"
              required
              autoFocus
              placeholder="First Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={this.state.lname}
              onChange={(e) => this.setState({ lname: e.target.value })}
              type="text"
              required
              placeholder="Last Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              value={this.state.hobby}
              onChange={(e) => this.setState({ hobby: e.target.value })}
              type="text"
              required
              placeholder="Hobby"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={this.state.gender}
              onChange={(e) => this.setState({ gender: e.target.value })}
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              value={this.state.birthday}
              onChange={(e) => this.setState({ birthday: e.target.value })}
              type="date"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer bg-white"
              onFocus={(e) =>
                e.target.showPicker ? e.target.showPicker() : null
              }
            />

            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {this.state.editId ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">User List</h2>
          <div className="flex flex-wrap gap-4">
            {this.state.todos.map((todo) => (
              <div
                key={todo.id}
                className="p-4 border rounded-lg shadow-md bg-white flex flex-col items-center w-60"
              >
                <img
                  src={todo.image}
                  alt="Gender Representation"
                  className="w-16 h-16 rounded-full mb-2"
                />
                <h3 className="font-semibold text-lg">
                  {todo.fname} {todo.lname}
                </h3>
                <p className="text-gray-600">Hobby: {todo.hobby}</p>
                <p className="text-gray-600">Gender: {todo.gender}</p>
                <p className="text-gray-600">Birthday: {todo.birthday}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => this.handleEdit(todo)}
                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => this.handleDelete(todo.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {this.state.todos.length > 0 && (
            <button
              onClick={this.handleClearAll}
              className="w-full mt-4 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    );
  }
}
