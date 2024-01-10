import Article from "../models/articleModel.js";

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: "Impossible to find articles" });
  }
};

export const getOneArticle = async (req, res) => {
  try {
    // use for take back dynamic parametre
    const {id} = req.params
    const article = await Article.findById(id);
    //don't have article
    if(!article){
      return res.status(404).json({message: "Article not find"})
    }

    res.status(200).json(article)
  } catch (err) {
    res.status(500).json({message: "Error find to receve a article"})
  }
}

export const addArticle = async (req, res) => {
  try {

    const { title, description, author } = req.body
    //Si l'utilisateur remplit
    if(title.trim() === "" || description.trim() === "" || author.trim() === "" ){
      return res.status(401).json({message: "veuillez remplir tous les champs"})
    }

    //s'il n'y a pas d'image
    let article;
    if(!req.file){
      article = new Article({
        title: title,
        description: description,
        author: author,
        image: {
          src: "",
          alt: ""
        }
      })
    } else{
      article = new Article({
        title: title,
        description: description,
        author: author,
        image: {
          src: req.file.filename,
          alt: req.file.originalname
        }
      })
    }
    await article.save(); // I save in BDD
    res.status(200).json({ message: "Article create !!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "impossible to create a article" });
  }
};

export const addComment = async (req, res) => {
  try {
    // je récupére l'id de l'article sur le quel je veux ajouter un commentaire
    const {articleId} = req.params

    const {pseudo, rating, content} = req.body
if(pseudo.trim() === ""||
rating < 0 ||
rating > 5 ||
content.trim() === ""
){
  return res.status(401).json({message: "veuillez remplir les champs"})
}

const comment = {
  pseudo,
  rating,
  content,
  date: new Date() // Permet d'avoir la date actuekke du serveur
}
await Article.updateOne({_id: articleId}, {$push: {"comments": comment}})
// $addToSet permet également d'ajouter un élément dans un tableau 
        // mais on ne peut pas écrire de DOUBLON
res.status(200).json({message: "Le commentaire a bien été ajouter"})

  } catch (err) {
    res.status(500).json({message: "impossible d'ajouter ce commentaire"})
  }
}