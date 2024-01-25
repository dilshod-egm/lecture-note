import { useNote } from "../NoteLayout/NoteLayout";
import "./Note.scss";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

type NOteProps = {
  onDelete: (id: string) => void;
};

function Note({ onDelete }: NOteProps) {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      <div className="ShowBtn">
        <div className="LeftBtn">
          <Link to="/">
            <button className="Back">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
              >
                <path
                  d="M0.43868 6.09748C0.157779 6.37873 -3.30282e-07 6.75998 -3.12907e-07 7.15748C-2.95532e-07 7.55498 0.157779 7.93623 0.43868 8.21748L6.09468 13.8765C6.37607 14.1579 6.75773 14.316 7.15568 14.316C7.55363 14.316 7.93529 14.1579 8.21668 13.8765C8.49808 13.5951 8.65616 13.2134 8.65616 12.8155C8.65616 12.4175 8.49808 12.0359 8.21668 11.7545L5.12068 8.65748L16.6557 8.65748C17.0535 8.65748 17.435 8.49945 17.7163 8.21814C17.9976 7.93684 18.1557 7.55531 18.1557 7.15748C18.1557 6.75966 17.9976 6.37813 17.7163 6.09682C17.435 5.81552 17.0535 5.65748 16.6557 5.65748L5.12068 5.65748L8.21668 2.56148C8.35601 2.42215 8.46654 2.25674 8.54194 2.07469C8.61735 1.89265 8.65616 1.69753 8.65616 1.50048C8.65616 1.30344 8.61735 1.10832 8.54194 0.926274C8.46654 0.744227 8.35601 0.578815 8.21668 0.439482C8.07735 0.30015 7.91194 0.189626 7.72989 0.11422C7.54784 0.0388142 7.35273 2.53963e-06 7.15568 2.54824e-06C6.95863 2.55685e-06 6.76352 0.0388142 6.58147 0.11422C6.39942 0.189626 6.23401 0.30015 6.09468 0.439482L0.43868 6.09748Z"
                  fill="#F4F2F0"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div className="RightBtn">
          <Link to={`/${note.id}/edit`}>
            <button className="Edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
              >
                <path
                  d="M8.5 14.8333H15.625M12.0625 1.77083C12.3774 1.45589 12.8046 1.27895 13.25 1.27895C13.4705 1.27895 13.6889 1.32239 13.8927 1.40679C14.0964 1.49119 14.2816 1.61489 14.4375 1.77083C14.5934 1.92678 14.7171 2.11191 14.8015 2.31566C14.8859 2.51941 14.9294 2.73779 14.9294 2.95833C14.9294 3.17887 14.8859 3.39725 14.8015 3.601C14.7171 3.80475 14.5934 3.98989 14.4375 4.14583L4.54167 14.0417L1.375 14.8333L2.16667 11.6667L12.0625 1.77083Z"
                  stroke="#FAFAFA"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </Link>
          <button
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
            className="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="17"
              viewBox="0 0 13 17"
              fill="none"
            >
              <path
                d="M0.916667 14.9167C0.916667 15.4029 1.10982 15.8692 1.45364 16.213C1.79745 16.5568 2.26377 16.75 2.75 16.75H10.0833C10.5696 16.75 11.0359 16.5568 11.3797 16.213C11.7235 15.8692 11.9167 15.4029 11.9167 14.9167V3.91667H0.916667V14.9167ZM2.75 5.75H10.0833V14.9167H2.75V5.75ZM9.625 1.16667L8.70833 0.25H4.125L3.20833 1.16667H0V3H12.8333V1.16667H9.625Z"
                fill="#191919"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="ShowBody">
        <h1 className="ShowTitle">{note.title}</h1>

        {note.tags.length > 0 && (
          <div className="ShowTag">
            <div className="ShowTagBlock">
              {note.tags.map((tag) => (
                <div className="ShowTagItem" key={tag.id}>
                  {tag.label}
                </div>
              ))}
            </div>  
            <div className="ShowCover">
              <img
                src="https://images.unsplash.com/photo-1690147022120-92fbc09c7be8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="ShowCoverImg"
              />
            </div>
            <div className="NoteMarkdown">
              <ReactMarkdown>{note.markdown}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Note;
