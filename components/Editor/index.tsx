import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface IEditorProps {
  content: string;
  editorRef: React.MutableRefObject<any>;
}

const TuiEditor = ({ content = "", editorRef }: IEditorProps) => {
  return (
    <>
      {editorRef && (
        <Editor
          ref={editorRef}
          initialValue={content || ""}
          initialEditType="wysiwyg"
          previewStyle="vertical"
          height="600px"
          hideModeSwitch={true}
          language="ko-KR"
          autofocus={false}
        />
      )}
    </>
  );
};

export default TuiEditor;
