import { useEffect, useState } from "react";
import { getTrees, addTree, resetTrees } from "./api";

function App() {
    const [trees, setTrees] = useState([]);
    const [formData, setFormData] = useState({
        treename: "",
        description: "",
        image: null
    });

    useEffect(() => {
        fetchTrees();
    }, []);

    const fetchTrees = async () => {
        const data = await getTrees();
        setTrees(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("treename", formData.treename);
        data.append("description", formData.description);
        if (formData.image) data.append("image", formData.image);

        await addTree(data);
        fetchTrees();
    };

    const handleReset = async () => {
        await resetTrees();
        fetchTrees();
    };

    return (
        <div>
            <h1>Tree Shop</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" name="treename" placeholder="Tree Name" required onChange={handleChange} />
                <textarea name="description" placeholder="Description" required onChange={handleChange} />
                <input type="file" name="image" onChange={handleFileChange} />
                <button type="submit">Add</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </form>

            <h2>Tree List</h2>
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
                    {trees.map((tree, index) => (
                        <tr key={tree._id}>
                            <td>{index + 1}</td>
                            <td>{tree.treename}</td>
                            <td>
                                {tree.image && <img src={`http://localhost:5000${tree.image}`} width="50" alt="Tree" />}
                            </td>
                            <td>{tree.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
