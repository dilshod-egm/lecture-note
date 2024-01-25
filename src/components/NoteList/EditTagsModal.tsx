import { Tag } from "../../App";
import "./EditTagsModal.scss";

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,  
  onUpdateTag,
}: EditTagsModalProps) {
  if (!show) {
    return null;
  }

  return (
    <div className="EditModal">
      <div className="EditModalHeader">
        <h1 className="EditTagsTitle">Tags Edit</h1>
        <button className="EditTagsExit" onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 17 17"
            fill="none"
          >
            <path
              d="M1 16L8.5 8.5L16 16M16 1L8.49857 8.5L1 1"
              stroke="#65778B"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="TagsBlog">
        {availableTags.map((tag) => (
          <form className="TagsItem" key={tag.id}>
            <input
              type="text"
              className="TagsText"
              value={tag.label}
              onChange={(e) => onUpdateTag(tag.id, e.target.value)}
            />
            <button className="TagsDelete" onClick={() => onDeleteTag(tag.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
              >
                <path
                  d="M0.916667 14.6667C0.916667 15.1529 1.10982 15.6192 1.45364 15.963C1.79745 16.3068 2.26377 16.5 2.75 16.5H10.0833C10.5696 16.5 11.0359 16.3068 11.3797 15.963C11.7235 15.6192 11.9167 15.1529 11.9167 14.6667V3.66667H0.916667V14.6667ZM2.75 5.5H10.0833V14.6667H2.75V5.5ZM9.625 0.916667L8.70833 0H4.125L3.20833 0.916667H0V2.75H12.8333V0.916667H9.625Z"
                  fill="#120F0D"
                />
              </svg>
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}

export default EditTagsModal;
