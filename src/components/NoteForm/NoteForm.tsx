import "./NoteForm.scss";
import { FormEvent, useRef, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { NoteData, Tag } from "../../App";
import { v4 as uuidV4 } from "uuid";
// import { PasteImage } from "./PasteImage/PasteImage";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
}: // tags = [],
NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [selectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (selectedTags.length === 0) {
      // Ваш код для обработки случая, когда не выбран ни один тег
      alert("Please select at least one tag.");
      return; // Прерываем выполнение функции, так как не выбран ни один тег
    }

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
      image: selectedImage,
    });

    navigate("..");
  }

  return (
    <form
      className="NewNote"
      onSubmit={handleSubmit}
      // onAddTag={onSubmit}
      // availableTags={availableTags}
    >
      <div className="NewNoteHeader">
        <CreatableSelect
          onCreateOption={(label) => {
            const newTag = { id: uuidV4(), label };
            onAddTag(newTag);
            setSelectedTags((prev) => [...prev, newTag]);
          }}
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

        <div className="NewNoteButton">
          <button className="NewNoteSave">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="13"
              viewBox="0 0 17 13"
              fill="none"
            >
              <path
                d="M16 1.5L6 11.5L1 6.5"
                stroke="#FAFAFA"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Save
          </button>

          <Link to="..">
            <button className="NewNoteCancel">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
              >
                <path
                  d="M1 11.743L6.243 6.49996L11.486 11.743M11.486 1.25696L6.242 6.49996L1 1.25696"
                  stroke="#F4F2F0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Cancel
            </button>
          </Link>
        </div>
      </div>

      <div className="NewNoteBody">
        {/* <PasteImage onImageSelect={setSelectedImage} /> */}

        <div className="FormTitle">
          {/* <label htmlFor="title">Title</label> */}
          <input
            ref={titleRef}
            type="text"
            placeholder="Notes Title"
            id="title"
            className="TitleInput"
            required
            defaultValue={title}
            // onChange={(e) => handleTitleChange(e.target.value)}
          />
          {/* <div className="BodyLine"></div> */}
        </div>

        <div className="FormBody">
          <textarea
            defaultValue={markdown}
            ref={markdownRef}
            required
            id="markdown"
            className="BodyInput"
            placeholder="Type your notes"
          />
        </div>
      </div>
    </form>
  );
}
