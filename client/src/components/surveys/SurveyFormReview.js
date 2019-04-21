// SurveyFormReview shows users their form inputs for review
import React from 'react';
import {connect} from "react-redux";
import formFields from "./formFields";
import _ from "lodash";
import {withRouter} from "react-router-dom";
import * as actions from "../../actions";

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {

  const reviewFields = _.map(formFields, ({name, label}) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
        Back
      </button>
      <button onClick={() => submitSurvey(formValues, history)} className="green white-text btn-flat right">
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {formValues: state.form.surveyForm.values};
}

// so right now surveyformreview knows the history of the react router
// history object is passed along as a property of props
export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));