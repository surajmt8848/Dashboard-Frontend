import Wrapper from "../components/wrapper";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./user.css";

import { User } from "../../classes/User";

export default class Users extends Component {
  state = {
    users: [],
  };

  page = 1;
  last_page = 0
  componentDidMount = async () => {
    const response = await axios.get(`users?page=${this.page}`);
    this.setState({
      users: response.data.data,
    });
    this.last_page = response.data.meta.last_page
  };
  prev = async () => {
    if(this.page === 1) return ""
    this.page--;
    await this.componentDidMount()
  }
  next = async () => {
    if(this.page === this.last_page) return ""
    this.page++;
    await this.componentDidMount()
  }
  delete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')){
        await axios.delete(`user/${id}`)
        this.setState({
          users: this.state.users.filter((u: User) => u.id !== id)
        })
    }
  }
  render() {
    return (
      <Wrapper>
        {/* BUTTON SECTION */}
        <div className="field is-grouped">
          <div className="control">
            <Link to={"/users/create"} className="button">
              Anchor
            </Link>
          </div>
        </div>
        {/* TABLE SECTION */}
        <table className="table">
          <thead>
            <tr>
              <th>
                <abbr title="Position">#</abbr>
              </th>
              <th>
                <abbr title="Position">Name</abbr>
              </th>
              <th>
                <abbr title="Played">Email</abbr>
              </th>
              <th>
                <abbr title="Won">Role</abbr>
              </th>
              <th>
                <abbr title="Drawn">Action</abbr>
              </th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>
                <abbr title="Position">#</abbr>
              </th>
              <th>
                <abbr title="Position">Name</abbr>
              </th>
              <th>
                <abbr title="Played">Email</abbr>
              </th>
              <th>
                <abbr title="Won">Role</abbr>
              </th>
              <th>
                <abbr title="Drawn">Action</abbr>
              </th>
            </tr>
          </tfoot>
          <tbody>
            {this.state.users.map((user: User) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                    <div className="is-grouped">
                      <div className="control">
                        <Link to={"/users"} className="button is-small is-info" >
                          Edit
                        </Link>
                        <Link
                          to={"/users"}
                          className="button is-small is-danger"
                          onClick={() => this.delete(user.id)}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* END OF TABLE SECTION */}

        {/* PAGINATION SECTION */}
          <nav
          className="pagination is-rounded"
          role="navigation"
          aria-label="pagination"
        >
          <a className="pagination-previous" onClick={this.prev}>Previous</a>
          <a className="pagination-next" onClick={this.next}>Next page</a>
          
        </nav>
        {/* END OF PAGINATION */}
      </Wrapper>
    );
  }
}
