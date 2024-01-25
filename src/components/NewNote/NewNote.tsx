import { NoteData, Tag } from "../../App";
import { NoteForm } from "../NoteForm/NoteForm";
// import { PasteImage } from "../NoteForm/PasteImage/PasteImage";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({ onSubmit, onAddTag, availableTags }: NoteFormProps) {
  // const handleImageUpload = (image: File) => {
  //   // Обработчик загрузки изображения
  //   // Вызываем onAddTag с изображением или сохраняем изображение в заметке
  // };
  return (
    <>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default NewNote;
