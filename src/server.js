import express from 'express';

let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
}, {
    name: 'learn-node',
    upvotes: 0,
}, {
    name: 'mongodb',
    upvotes: 0,
}]

const app = express();
app.use(express.json());

app.put('/api/articles/:name/upvotes', (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if (article) {
        article.upvotes += 1;
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!!`)
    }
    else{
        res.send('That article doesnt exist')
    }
});

app.listen(8000, () => {
    console.log('Server is listenig on port 8000');
});