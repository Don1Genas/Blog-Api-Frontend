import { useState } from "react";
import axios from 'axios'

const CreateBlog = (props) => {
  const [formData, setFormData] = useState({
    blog_title: "",
    blog_content: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4005/blogs', formData, {
        headers: {
          'x-auth-token': localStorage.getItem("userToken")
        }
      }).then(res => props.setBlogs([...props.blogs, res.data]))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="blog_title">
        Blog Title
      </label>
      <input
        className="form-control"
        type="text"
        id="blog_title"
        name="blog_title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.id]: e.target.value })
        }
      />

      <div className="mb-3">
        <label className="form-label" htmlFor="blog_content">
          Blog Content
        </label>
        <input
          className="form-control"
          type="text"
          id="blog_content"
          name="blog_content"
          value={formData.details}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.id]: e.target.value })
          }
        />
      </div>

      <input type="submit" className="btn btn-success" />
    </form>
  );
};

export default CreateBlog;