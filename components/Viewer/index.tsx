import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

interface IViewerProps {
  content: string;
}

const TuiViewer = ({ content = "" }: IViewerProps) => {
  return <>{content && <Viewer initialValue={content || ""} />}</>;
};

export default TuiViewer;
