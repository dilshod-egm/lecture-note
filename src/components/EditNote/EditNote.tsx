import { NoteData, Tag } from "../../App";
import { NoteForm } from "../NoteForm/NoteForm";
import { useNote } from "../NoteLayout/NoteLayout";

type EditNoteFormProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteFormProps) {
  const note = useNote();

  return (
    <>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default EditNote;
