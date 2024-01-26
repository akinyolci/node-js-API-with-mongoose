require('./db/mongoose');
const express = require('express');
const Blog = require('./models/blog');


const app = express();
app.use(express.json());



app.post('/blogs', async (req, res)=>{
    const blog = new Blog(req.body);
    try{
    await blog.save();
    res.status(201).send(blog);
    } catch(error) {
        res.status(500).send(error);
    }

    //Blog.create(req.body).then((blog)=>{
    //    res.status(201).send(blog);
    //}).catch((error)=>{
    //    res.status(400).send(error);
    //})

    //Blog.insertMany(req.body).then((blogs)=>{
    //    res.status(201).send(blogs);
    //}).catch((error)=>{
    //    res.status(400).send(error);
    //});
});


app.get('/blogs',async (req,res)=>{
    try{
    const blogs = await Blog.find({});
    res.status(200).send(blogs);
    } catch(error){
        res.status(500).send(error);
    }
})

app.get('/blogs/:id', async (req, res)=>{
    try{
     const blog =  await Blog.findById(req.params.id);
     if (!blog){
        return res.status(404);
     }else{
        res.status(200).send(blog);
     } } catch(error){
        res.status(500).send(error);
    }
    //Blog.findOne({_id: req.params.id}).then((blog)=>{
    //    if(!blog){
    //        return res.status(400).send();
    //    } else{
    //        res.send(blog);
    //    }
    //}).catch((error)=>{
    //    res.status(500).send(error);
    //})
})


app.patch('/blogs/:id', async (req, res) => {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {new:true});
    try{
        if(!blog){
            return res.status(404).send();
        } else{
            res.status(200).send(blog);
        }
    } catch(error) {
        res.status(500).send(error);
    }

    //Blog.updateOne({_id:req.params.id}, req.body).then((response)=>{
    //    res.status(200).send(response);
    //}).catch((error)=>{
    //    res.status(500).send(error);
    //});
})

app.delete('/blogs/:id', async (req,res)=>{
    try{
    const blog = await Blog.findByIdAndDelete(req.params.id)
        if(!blog){
            return res.status(404).send();
        }
        else{
            res.send(blog);
        }
    } catch(error){
        res.status(500).send(error);
    }
})




let port = 3000;
app.listen(port, (req, res) => {
    console.log(`app is running on http://127.0.0.1:${port}`);
});




