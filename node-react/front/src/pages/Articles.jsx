import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'
import axios from "axios";


const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [err, setErr] = useState();

    useEffect(() => {
        axios.get("http://localhost:9000/articles")
        .then((res) => {
            console.log(res);
            setArticles(res.data)
        })
        .catch((res) => {
            console.log(res)
            setErr("impossible to charge")
        })
    } ,[])
    return (
        <main>
            <section>
                {articles.map((oneArticle, i) => (
                    <>
                    <articles key={i}>
                    <NavLink to={`/article/${oneArticle._id}`}>{oneArticle.title}</NavLink>
                    <p>{oneArticle.description}</p>
                    <p>{oneArticle.author}</p>
                    <img style={{width: "200px"}} src={`http://localhost:9000/assets/img/${oneArticle.image.src}`} alt={oneArticle.image.alt}/>
                    <span>article créé le : {new Date(oneArticle.createdAt).toLocaleDateString("fr")}</span>
                    </articles>
                    </>
                ))}
            </section>
        </main>
    );
};

export default Articles;