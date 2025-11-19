import { useEffect, useState } from "react";
import { fetchAdminMenu, addMenuItem, updateMenuItem, deleteMenuItem } from "../api/adminApi";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import "./AdminMenu.css";

type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
};

export default function AdminMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Partial<MenuItem>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadMenu = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminMenu();
      setMenu(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch menu items");
      console.error("Failed to fetch menu items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, form);
        setSuccess("Menu item updated successfully!");
      } else {
        await addMenuItem(form);
        setSuccess("Menu item added successfully!");
      }
      setForm({});
      setEditingItem(null);
      await loadMenu();
    } catch (err) {
      setError("Failed to save menu item");
      console.error("Failed to save menu item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setForm(item);
    setSuccess(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setLoading(true);
    try {
      await deleteMenuItem(id);
      setSuccess("Menu item deleted successfully!");
      await loadMenu();
    } catch (err) {
      setError("Failed to delete menu item");
      console.error("Failed to delete menu item:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setForm({});
    setError(null);
  };

  return (
    <div className="admin-menu">
      {/* Alerts */}
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button onClick={() => setError(null)}>
            <X size={18} />
          </button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)}>
            <X size={18} />
          </button>
        </div>
      )}

      <div className="menu-header">
        <div>
          <h2>Menu Management</h2>
          <p className="subtitle">Add, edit, or remove menu items</p>
        </div>
        <div className="item-count">Total Items: <strong>{menu.length}</strong></div>
      </div>

      {/* Form Section */}
      <div className="form-container">
        <div className="form-header">
          <h3>{editingItem ? "Edit Menu Item" : "Add New Item"}</h3>
          {editingItem && (
            <button className="close-btn" onClick={handleCancel}>
              <X size={20} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="menu-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Item Name *</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g., Margherita Pizza"
                value={form.name || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                id="price"
                type="number"
                name="price"
                placeholder="0.00"
                value={form.price || ""}
                onChange={handleChange}
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                name="category"
                placeholder="e.g., Pizza, Pasta, Dessert"
                value={form.category || ""}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                id="imageUrl"
                type="text"
                name="imageUrl"
                placeholder="https://example.com/image.jpg"
                value={form.imageUrl || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe the menu item..."
              value={form.description || ""}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Plus size={18} />
              {editingItem ? "Update Item" : "Add Item"}
            </button>
            {editingItem && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Menu List Section */}
      <div className="menu-list-container">
        <h3>Menu Items</h3>
        {loading && !menu.length ? (
          <div className="loading">Loading menu items...</div>
        ) : menu.length === 0 ? (
          <div className="empty-state">
            <p>No menu items yet. Add your first item above!</p>
          </div>
        ) : (
          <div className="menu-grid">
            {menu.map(item => (
              <div key={item._id} className="menu-card">
                {item.imageUrl && (
                  <div className="menu-image">
                    <img src={item.imageUrl} alt={item.name} />
                  </div>
                )}
                <div className="menu-content">
                  <div className="menu-header-card">
                    <h4>{item.name}</h4>
                    {item.category && <span className="badge">{item.category}</span>}
                  </div>
                  {item.description && <p className="description">{item.description}</p>}
                  <div className="menu-footer">
                    <span className="price">₹{item.price}</span>
                    <div className="actions">
                      <button
                        className="btn-icon edit"
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="btn-icon delete"
                        onClick={() => handleDelete(item._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}