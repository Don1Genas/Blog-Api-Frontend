import { useState, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const UpdateBlog = (props) => {
 const [blog, setBlog] = useState(null)
 const { id } = useParams()
 const history = useHistory()

 useEffect(() => {
  axios.get(`https://dwg-blog-app.herokuapp.com/blogs/${id}`, {
    headers: {
      'x-auth-token': localStorage.getItem("userToken")
    }
   }).then(res => {
    console.log(res.data);
    setBlog(res.data)
   })
   .catch((err) => console.error(err))
 }, []);


  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`https://dwg-blog-app.herokuapp.com/blogs/${id}`, blog, {
        headers: {
          'x-auth-token': localStorage.getItem("userToken")
        }
      }).then(res => history.push('/home'))
  }

  return (
    <div>
      {blog && (
        <form onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="blog_title">
          Title
        </label>
        <input
          className="form-control"
          type="text"
          id="blog_title"
          name="blog_title"
          value={blog.blog_title}
          onChange={(e) =>
            setBlog({ ...blog, [e.target.id]: e.target.value })
          }
        />
  
        <div className="mb-3">
          <label className="form-label" htmlFor="blog_content">
            Details
          </label>
          <input
            className="form-control"
            type="text"
            id="blog_content"
            name="blog_content"
            value={blog.blog_content}
            onChange={(e) =>
              setBlog({ ...blog, [e.target.id]: e.target.value })
            }
          />
        </div>
  
        <input 
          type="submit" 
          className="btn btn-success" 
          value='Update Blog' />
      </form>
      )}
    </div>
  );
};

export default UpdateBlog;