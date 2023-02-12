import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSurveys } from "../../actions";

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  renderSurveys() {
    return this.props.surveys.reverse().map(({ _id, title, body, dateSent, yes, no }) => {
      if (!yes) yes = 0;
      if (!no) no = 0;

      return (
        <div className="card blue-grey darken-1" key={_id}>
          <div className="card-content white-text">
            <span className="card-title">{title}</span>
            <p>{body}</p>
            <p className="right">Sent On {new Date(dateSent).toLocaleDateString()}</p>
          </div>
          <div className="card-action">
            <a href="#">Yes: {yes} </a>
            <a href="#">No: {no} </a>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Survey List</h1>
        {this.renderSurveys()}
      </div>
    );
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
