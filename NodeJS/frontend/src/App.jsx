import { useState, useEffect } from "react";
import { getTrees, addTree, resetTrees } from "./api";
import "./App.css";

function App() {
  const [treeName, setTreeName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    "https://tecwood.com.vn/upload/images/Post/anh-cay-xanh-dep.jpg"
  );
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    const data = await getTrees();
    setTrees(data);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddTree = async () => {
    if (!treeName || !description) return;
    const formData = new FormData();
    formData.append("treename", treeName);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    await addTree(formData);
    fetchTrees();
    resetForm();
  };

  const handleResetTrees = async () => {
    await resetTrees();
    fetchTrees();
  };

  const resetForm = () => {
    setTreeName("");
    setDescription("");
    setImage(null);
    setPreviewImage(
      "https://tecwood.com.vn/upload/images/Post/anh-cay-xanh-dep.jpg"
    );
  };

  return (
    <div>
      <header>
        <div style={{ flex: 1 }}>Tree Shop</div>
        <div style={{ flex: 1, textAlign: "right" }}>About Me</div>
      </header>

      <div className="container">
        <div className="image-preview">
          <img id="previewImage" src={previewImage} alt="Tree Preview" />
        </div>
        <div className="form-container">
          <h1>Tree Shop</h1>
          <div className="form-group">
            <label htmlFor="treeName">Tree Name</label>
            <input
              type="text"
              id="treeName"
              value={treeName}
              onChange={(e) => setTreeName(e.target.value)}
              placeholder="Phong lan"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhắc đến ý nghĩa..."
            />
          </div>
          <div className="form-group image-input">
            <label htmlFor="imageUpload">Image</label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <button
              className="browse-btn"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              Browse
            </button>
          </div>
          <button onClick={handleAddTree}>Add</button>
          <button className="reset" onClick={resetForm}>
            Reset
          </button>
          <button className="reset" onClick={handleResetTrees}>
            Reset All Trees
          </button>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {trees.map((tree) => (
            <tr key={tree._id}>
              <td>{tree._id}</td>
              <td>{tree.treename}</td>
              <td>
                <img src={tree.image} alt={tree.treename} width="50" />
              </td>
              <td>{tree.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <p>Số 8, Tôn Thất Thuyết, Cầu Giấy, Hà Nội</p>
      </footer>
    </div>
  );
}

export default App;
