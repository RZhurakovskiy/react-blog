const deletePost = (id, callback) => {
    fetch('https://rzhurakovskiy-react-blog.vercel.app//posts/' + id, {
        method: 'DELETE'
    }).then(()=>{
        console.log('Post Deleted!');
        if (typeof callback === "function") callback();
    })
}

export default deletePost;