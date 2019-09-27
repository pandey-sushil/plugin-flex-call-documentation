import React from "react";
import * as Flex from "@twilio/flex-ui";
import axios from "axios";
import { Actions } from "@twilio/flex-ui";
import { withTaskContext } from "@twilio/flex-ui";

const MIN_REPORT_LENGTH = 15;

/**
 * This component is responsible to generate the 
 * editable text area against the tasks for the channel
 * subscribed by the user. 
 *
 */
export class CallDocumentationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { task: props.task, saveApiUrl: props.saveApiUrl };
  }

/**
 * Updates the state with the most updated
 * report written by the user.
 *
 * @param {string} Object
 */
  handleUpdate(e) {
    this.setState({ report: e.target.value });
  }

/**
 * Validates and saves the user provided
 * report to the provided api. For now, the most
 * basic validation of minimum length is present. 
 * This can be updated as per the requirement of the
 * project.
 *
 *
 */
  save() {
    let _this = this;
    if (this.state.report && this.state.report.length <= MIN_REPORT_LENGTH) {
      this.setState({
        success: "",
        error: "Please give a more detailed report of the call."
      });
      return;
    }

    axios
      .post(this.state.saveApiUrl, {
        from_no: this.state.task.attributes.from,
        to_no: this.state.task.attributes.to,
        created_by: this.state.task.source._worker.attributes.email,
        notes: this.state.report,
        direction: this.state.task.attributes.direction,
        task_sid: this.state.task.taskSid
      })
      .then(function(response) {
        _this.setState({
          success: "Call report saved successfully.",
          error: ""
        });
      })
      .catch(function(error) {
        _this.setState({
          success: "",
          error: "Report could not be saved. Please try again."
        });
      });
  }

  render() {
    return (
      <div class="call-report">
        <div>
          {this.state.error && <p className="text-error">{this.state.error}</p>}
          {this.state.success && (
            <p className="text-success">{this.state.success}</p>
          )}
          <p>Enter and save important call comments:</p>
          <textarea
            placeholder="Type here"
            value={this.state.report}
            onChange={this.handleUpdate.bind(this)}
          ></textarea>
          <button className="report-btn" onClick={this.save.bind(this)}>
            Save Report
          </button>
        </div>
      </div>
    );
  }
}

export default withTaskContext(CallDocumentationComponent);
