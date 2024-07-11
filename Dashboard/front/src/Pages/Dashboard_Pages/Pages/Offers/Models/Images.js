import "../Models.css";
import { Table } from "antd";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FiEdit } from "react-icons/fi";
import { BiTrash } from "react-icons/bi";
import { PlusCircleFilled } from "@ant-design/icons";

import { FaCheckCircle } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { useEffect, useState } from "react";

import ImageTest from "../../../../../assets/global/offer.png";

export default function Images() {
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
    <div className="SubModel Images">
      <div className="preview" id="preview">
        <img src={selectedImage} alt="image" />
      </div>

      <div className="row">
        <form className="col">
          <label for="image" class="btn btn-primary">
            Upload New Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
        </form>

        <div className="col mb-2 displayButton">
          <button className="btn btn-success" onClick={handleSave}>
            <FaCheckCircle />
            <span>save</span>
          </button>
        </div>
        <div className="col mb-2 displayButton">
          <button className="btn btn-danger" onClick={handleRefresh}>
            <IoMdRefresh />
            <span>refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// export default function Images() {
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedImage(reader.result);
//         actions.forEach((btn) => (btn.style.display = "flex"));
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setSelectedImage(ImageTest);
//     }
//   };

//   return (
//     <div className="Images">
//       <div className="content">
//         <div className="body">
//           <div className="image">
//             <img src={imageTest} alt="offer" />
//           </div>
//           <div>
//             <label>size: (584px , 140px)</label>
//             <form>
//               <input
//                 type="file"
//                 name="image"
//                 id="image"
//                 onChange={handleImageChange}
//               />
//               <label for="image" className="btn btn-primary">
//                 upload new image
//               </label>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
