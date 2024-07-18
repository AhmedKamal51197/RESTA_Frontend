import "../../SubModels.css";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";

import ImageTest from "../../../../../assets/global/profile.png";
import { useEffect, useState } from "react";

export default function Image() {
  const [selectedImage, setSelectedImage] = useState(ImageTest);
  let actions = document.querySelectorAll(".displayButton");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(ImageTest);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      actions.forEach((btn) => (btn.style.display = "flex"));
    }
  }, [selectedImage]);

  const handleSave = () => {
    console.log("save image");
  };

  const handleRefresh = () => {
    setSelectedImage(ImageTest);
    actions.forEach((btn) => (btn.style.display = "none"));
  };

  return (
    <div className="SubModel Image">
      <div className="preview" id="preview">
        <img src={selectedImage} alt="image" />
      </div>

      <div className="row">
        <div className="col">
          <label for="image" class="btn btn-primary">
            Upload New Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="col displayButton">
          <button className="btn btn-success" onClick={handleSave}>
            <FaCheckCircle />
            <span>save</span>
          </button>
        </div>
        <div className="col displayButton">
          <button className="btn btn-danger" onClick={handleRefresh}>
            <IoMdRefresh />
            <span>refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}
