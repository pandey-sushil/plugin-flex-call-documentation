import { FlexPlugin } from "flex-plugin";
import React from "react";
import CallDocumentationComponent from "./CallDocumentationComponent";
import { Tab } from "@twilio/flex-ui";

export default class FlexCallDocumentationPlugin extends FlexPlugin {
  name = "FlexCallDocumentationPlugin";

  init(flex, manager) {
    flex.TaskCanvasTabs.Content.add(
      <Tab label="Call Comments" key="call-report-tab">
        <CallDocumentationComponent
          key="call-documentation-key"
          saveApiUrl={`${manager.configuration.apiBaseUrl}api/v1/call-documentation`}
        />
      </Tab>
    );
  }
}
