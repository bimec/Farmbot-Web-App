import React from "react";
import { ExternalUrl } from "../external_urls";
import {
  DesignerPanel, DesignerPanelContent,
} from "../farm_designer/designer_panel";
import { Panel, DesignerNavTabs } from "../farm_designer/panel_header";
import { HelpHeader } from "./header";

export interface DocumentationPanelProps {
  url: string;
}

export const DocumentationPanel = (props: DocumentationPanelProps) => {
  const page = location.search.split("?page=").pop();
  return <DesignerPanel panelName={"documentation"} panel={Panel.Help}>
    <DesignerNavTabs />
    <HelpHeader />
    <DesignerPanelContent panelName={"documentation"}>
      <iframe src={page ? `${props.url}/${page}` : props.url} />
    </DesignerPanelContent>
  </DesignerPanel>;
};

export const SoftwareDocsPanel = () =>
  <DocumentationPanel url={ExternalUrl.softwareDocs} />;

export const DeveloperDocsPanel = () =>
  <DocumentationPanel url={ExternalUrl.developerDocs} />;
