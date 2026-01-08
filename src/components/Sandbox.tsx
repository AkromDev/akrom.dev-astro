import {
  Sandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackConsole,
  useSandpackNavigation,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
} from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";

function RefreshButton() {
  const { refresh } = useSandpackNavigation();
  return (
    <button
      onClick={refresh}
      className="sp-refresh-button"
      title="Reload"
      type="button"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
      Reload
    </button>
  );
}

interface SandboxProps {
  files: SandpackFiles;
  template?: SandpackPredefinedTemplate;
  showLineNumbers?: boolean;
  editorHeight?: number;
  activeFile?: string;
  visibleFiles?: string[];
  dependencies?: Record<string, string>;
  showConsole?: boolean;
  consoleOnly?: boolean;
}

export function Sandbox({
  files,
  template = "react",
  showLineNumbers = true,
  editorHeight = 420,
  activeFile,
  visibleFiles,
  dependencies = {},
  showConsole = false,
  consoleOnly = false,
}: SandboxProps) {
  // For console-only mode, use custom layout with editor + console (hidden preview for execution)
  if (consoleOnly) {
    return (
      <div className="sandpack-wrapper console-only">
        <SandpackProvider
          template={template}
          files={files}
          theme={dracula}
          customSetup={{ dependencies }}
          options={{ activeFile, visibleFiles }}
        >
          <SandpackLayout>
            <SandpackCodeEditor
              showLineNumbers={showLineNumbers}
              showTabs={true}
              style={{ height: editorHeight }}
            />
            <div className="console-panel">
              {/* Hidden preview to execute code */}
              <SandpackPreview style={{ display: "none" }} />
              <div className="console-header">
                <span>Console</span>
                <RefreshButton />
              </div>
              <SandpackConsole style={{ height: editorHeight - 36 }} resetOnPreviewRestart showHeader={false} />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    );
  }

  // Standard layout with preview
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
          showConsole,
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

