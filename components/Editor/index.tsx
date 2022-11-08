import { Editor as ToastEditor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

export default function Editor({ editorRef, text, onChange }: any) {
  return (
    <ToastEditor
      ref={editorRef}
      initialValue={text}
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      language="ko-KR"
      onChange={onChange}
    />
  );
}
