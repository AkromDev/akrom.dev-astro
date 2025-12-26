import {
  Sandpack,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";

interface SandboxProps {
  files: SandpackFiles;
  template?: SandpackPredefinedTemplate;
  showLineNumbers?: boolean;
  editorHeight?: number;
  activeFile?: string;
  visibleFiles?: string[];
  dependencies?: Record<string, string>;
}

export function Sandbox({
  files,
  template = "react",
  showLineNumbers = true,
  editorHeight = 420,
  activeFile,
  visibleFiles,
  dependencies = {},
}: SandboxProps) {
  return (
    <div className="sandpack-wrapper">
      <Sandpack
        template={template}
        files={files}
        theme={dracula}
        options={{
          showLineNumbers,
          showTabs: true,
          editorHeight,
          showNavigator: false,
          showConsole: false,
          showConsoleButton: true,
          activeFile,
          visibleFiles,
          layout: "preview",
          editorWidthPercentage: 55,
        }}
        customSetup={{
          dependencies,
        }}
      />
    </div>
  );
}

export default Sandbox;

