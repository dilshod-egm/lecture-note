import { useState } from "react";
import "./PasteImage.scss";

interface PasteImageProps {
  onImageUpload: (image: File) => void;
}

export function PasteImage({}: PasteImageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const PasteImageBtnClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.addEventListener("change", (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
        };

        reader.readAsDataURL(file);
      }
    });

    input.click();
  };

  return (
    <div className="PasteImage">
      {/* <img className="PosteImageImg" src={'selectedImage'} alt="" /> */}
      {selectedImage && (
        <img className="PosteImageImg" src={selectedImage} alt="" />
      )}
      <div className="PasteImageBlock">
        <div className="PasteImageIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            fill="none"
          >
            <path
              d="M91.6667 50C91.6667 48.895 91.2277 47.8352 90.4463 47.0538C89.6649 46.2724 88.6051 45.8334 87.5 45.8334C86.395 45.8334 85.3352 46.2724 84.5538 47.0538C83.7724 47.8352 83.3334 48.895 83.3334 50H91.6667ZM50 16.6667C51.1051 16.6667 52.1649 16.2277 52.9463 15.4463C53.7277 14.6649 54.1667 13.6051 54.1667 12.5C54.1667 11.395 53.7277 10.3352 52.9463 9.55376C52.1649 8.77236 51.1051 8.33337 50 8.33337V16.6667ZM81.25 83.3334H18.75V91.6667H81.25V83.3334ZM16.6667 81.25V18.75H8.33337V81.25H16.6667ZM83.3334 50V81.25H91.6667V50H83.3334ZM18.75 16.6667H50V8.33337H18.75V16.6667ZM18.75 83.3334C18.1975 83.3334 17.6676 83.1139 17.2769 82.7232C16.8862 82.3325 16.6667 81.8026 16.6667 81.25H8.33337C8.33337 84.0127 9.43084 86.6622 11.3843 88.6157C13.3378 90.5692 15.9874 91.6667 18.75 91.6667V83.3334ZM81.25 91.6667C84.0127 91.6667 86.6622 90.5692 88.6157 88.6157C90.5692 86.6622 91.6667 84.0127 91.6667 81.25H83.3334C83.3334 81.8026 83.1139 82.3325 82.7232 82.7232C82.3325 83.1139 81.8026 83.3334 81.25 83.3334V91.6667ZM16.6667 18.75C16.6667 18.1975 16.8862 17.6676 17.2769 17.2769C17.6676 16.8862 18.1975 16.6667 18.75 16.6667V8.33337C15.9874 8.33337 13.3378 9.43084 11.3843 11.3843C9.43084 13.3378 8.33337 15.9874 8.33337 18.75H16.6667Z"
              fill="#828282"
            />
            <path
              d="M12.5 72.9167L34.7771 52.4958C35.5279 51.8077 36.5049 51.4184 37.5232 51.4015C38.5416 51.3846 39.5309 51.7413 40.3042 52.4042L66.6667 75M58.3333 64.5833L68.2771 54.6396C68.9863 53.9299 69.9279 53.4999 70.9287 53.4287C71.9295 53.3575 72.9224 53.6499 73.725 54.2521L87.5 64.5833M62.5 25H87.5M75 12.5V37.5"
              stroke="#828282"
              stroke-width="6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <button onClick={PasteImageBtnClick} className="PasteImageBtn">
          Add Photo
        </button>
      </div>
    </div>
  );
}
