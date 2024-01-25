import "./NoteList.scss";
import { useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Tag } from "../../App";
import { Link } from "react-router-dom";
import EditTagsModal from "./EditTagsModal";
// import NoteCard from "./NoteCard/NoteCard";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

export function NoteList({
  availableTags,
  notes,
  onDeleteTag,
  onUpdateTag,
}: NoteListProps) {
  // Tags Style //

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [editTagsModalOpen, setEditTagsModalOpen] = useState(false);

  const filteredNotes = useMemo(() => {
    // if (!notes) {
    //   return [];
    // }
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <div className="NoteList">
      <div className="NoteListHeader">
        <div className="HeaderForms">
          <form className="NoteSearch">
            <span className="SearchBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="13"
                viewBox="0 0 14 15"
                fill="none"
              >
                <path
                  d="M14 13.7678L10.0893 9.85711C11.0291 8.72892 11.4977 7.28185 11.3977 5.81693C11.2977 4.35202 10.6368 2.98205 9.55246 1.99202C8.46811 1.00199 7.04382 0.468119 5.57588 0.501474C4.10793 0.534828 2.70936 1.13284 1.6711 2.1711C0.632837 3.20936 0.0348283 4.60793 0.00147384 6.07588C-0.0318806 7.54382 0.501988 8.96811 1.49202 10.0525C2.48205 11.1368 3.85202 11.7977 5.31693 11.8977C6.78185 11.9977 8.22892 11.5291 9.35711 10.5893L13.2678 14.5L14 13.7678ZM1.05418 6.21468C1.05418 5.29292 1.32752 4.39186 1.83962 3.62545C2.35172 2.85903 3.07959 2.26168 3.93118 1.90894C4.78278 1.5562 5.71985 1.46391 6.62389 1.64373C7.52794 1.82356 8.35836 2.26743 9.01014 2.91921C9.66193 3.57099 10.1058 4.40141 10.2856 5.30546C10.4654 6.20951 10.3732 7.14658 10.0204 7.99817C9.66767 8.84976 9.07032 9.57763 8.30391 10.0897C7.53749 10.6018 6.63644 10.8752 5.71468 10.8752C4.47906 10.8738 3.29444 10.3823 2.42072 9.50863C1.54701 8.63492 1.05555 7.4503 1.05418 6.21468Z"
                  fill="#F4F2F0"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="SearchInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
          <div className="NoteTag">
            <CreatableSelect  
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              className="CustomCelectContainer"
              placeholder="Tags..."
              isMulti
            />
          </div>
        </div>

        <div className="HeaderBtn">
          <Link to="/new">
            <button className="CreateBtn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  d="M7.76563 2.51685H3.08173C2.52962 2.51685 2.00013 2.73539 1.60973 3.1244C1.21932 3.51341 1 4.04103 1 4.59117V13.9256C1 14.4758 1.21932 15.0034 1.60973 15.3924C2.00013 15.7814 2.52962 16 3.08173 16H13.4904C14.0425 16 14.572 15.7814 14.9624 15.3924C15.3528 15.0034 15.5721 14.4758 15.5721 13.9256V9.25841"
                  stroke="#F4F2F0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M13.4905 3.55403L14.4825 4.5912M15.5722 1.44548C15.8497 1.73138 16.0034 2.11447 16.0001 2.51218C15.9967 2.90989 15.8367 3.29039 15.5545 3.57166L8.28617 10.8142L5.16357 11.8513L6.20444 8.73985L13.477 1.432C13.7326 1.17527 14.0748 1.02214 14.4372 1.00222C14.7996 0.982297 15.1566 1.09699 15.439 1.32413L15.5722 1.44548Z"
                  stroke="#F4F2F0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Create
            </button>
          </Link>

          <button
            className="EditTag"
            onClick={() => setEditTagsModalOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M16 6.5V4.5H12V0.5H10V4.5H6V0.5H4V4.5H0V6.5H4V10.5H0V12.5H4V16.5H6V12.5H10V16.5H12V12.5H16V10.5H12V6.5H16ZM10 10.5H6V6.5H10V10.5Z"
                fill="#F4F2F0"
              />
            </svg>
            Edit Tag
          </button>
          <EditTagsModal
            show={editTagsModalOpen}
            handleClose={() => setEditTagsModalOpen(false)}
            availableTags={availableTags}
            onDeleteTag={onDeleteTag}
            onUpdateTag={onUpdateTag}
          />
        </div>
      </div>

      <div className="NoteListBody">
        <h1 className="NoteListTitle">Note Inbox</h1>
        <hr color="#65778B" />

        <div className="NoteListCard">
          {filteredNotes.length === 0 ? (
            <div className="NotCard">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="232"
                height="213"
                viewBox="0 0 232 213"
                fill="none"
              >
                <path
                  d="M179.735 192.545L120.513 42.7982C120.191 41.9889 119.657 41.2815 118.967 40.7509C118.276 40.2203 117.455 39.8862 116.59 39.784L24.8101 28.9832C22.2052 28.6173 19.7969 30.4323 19.431 33.0372C19.4228 33.0961 19.4156 33.1554 19.4092 33.2147L0.0873798 187.792C-0.258154 190.437 1.60583 192.862 4.251 193.207C4.28949 193.212 4.32844 193.217 4.36693 193.221L173.435 212.543H173.986C175.192 212.549 176.357 212.103 177.251 211.293C178.145 210.483 178.703 209.368 178.817 208.167L180.073 194.767C180.137 194.01 180.021 193.249 179.735 192.545Z"
                  fill="#65778B"
                />
                <path
                  d="M212.631 33.2148C212.321 30.5651 209.921 28.668 207.272 28.9782L207.23 28.9832L165.688 33.8719L42.9921 48.305C40.365 48.6035 38.4662 50.9588 38.7315 53.5895L53.2231 208.166C53.3365 209.367 53.8951 210.482 54.7891 211.292C55.683 212.102 56.8476 212.548 58.0538 212.543H58.6045L227.673 193.221C230.324 192.917 232.226 190.522 231.922 187.871C231.92 187.851 231.917 187.83 231.915 187.81L212.631 33.2148Z"
                  fill="#97A9BD"
                />
                <path
                  d="M140.173 67.6274C139.216 67.629 138.281 67.3466 137.485 66.8159C136.689 66.2852 136.068 65.5302 135.702 64.6465C135.336 63.7627 135.24 62.7901 135.427 61.8519C135.614 60.9138 136.076 60.0523 136.753 59.3767L160.905 35.2241C162.759 33.3054 165.817 33.2519 167.736 35.1055C169.655 36.9591 169.708 40.0168 167.855 41.936C167.816 41.9763 167.776 42.0157 167.736 42.0547L143.583 66.2072C142.68 67.1139 141.453 67.6247 140.173 67.6274Z"
                  fill="#455A64"
                />
                <path
                  d="M178.817 48.305C192.156 48.305 202.97 37.4916 202.97 24.1525C202.97 10.8135 192.156 0 178.817 0C165.478 0 154.665 10.8135 154.665 24.1525C154.665 37.4916 165.478 48.305 178.817 48.305Z"
                  fill="#F44336"
                />
              </svg>
              <h1 className="NotCardText">No created notes</h1>
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div key={note.id} className="NoteListItem">
                <NoteCard id={note.id} title={note.title} tags={note.tags} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`}>
      <div className="NoteCover">
        <img
          src="https://images.unsplash.com/photo-1690147022120-92fbc09c7be8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="NoteCoverImg"
        />
      </div>

      <h1 className="ItemTitle">{title}</h1>
      {tags.length > 0 && (
        <div className="ItemTag">
          {tags.map((tag) => (
            <div className="TagItem" key={tag.id}>
              {tag.label}
            </div>
          ))}
        </div>
      )}
      {/* <p className="CardBody">
        We came up with a variety of concepts to make features in the mobile app
        more accessible, given the complexity of the existing navigation
        architecture. That's when the idea for a Quick Access feature was born –
        it's situated in the Home screen and part of what the user sees first
        upon entering the app. It allows them to access other features
        (categories, lists, the map, etc.) from within the search, add the term
        entered to the shopping list and eventually also search the actual
        product assortment.
      </p> */}
      {/* <button className="CardBtn">Open Note</button> */}
    </Link>
  );
}
