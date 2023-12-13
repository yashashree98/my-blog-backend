import express from 'express';
import { db, connectToDb } from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne( { name } );

    if (article){
        res.json(article);
    }
    else{
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvotes', async (req, res) => {
    const { name } = req.params;
    
    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    });

    const article = await db.collection('articles').findOne( { name } );

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!!`)
    }
    else{
        res.send('That article doesnt exist')
    }
});

app.post('/api/articles/:name/comments', async(req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne( { name }, {
        $push: { comments: {postedBy, text } },
    });

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        article.comments.push({ postedBy, text });
        res.send(article.comments)
    }
    else{
        res.send('That article doesnt exist')
    }

});

connectToDb(() => {
    console.log('Successully connected to database!')
    app.listen(8000, () => {
        console.log('Server is listenig on port 8000');
    });
});