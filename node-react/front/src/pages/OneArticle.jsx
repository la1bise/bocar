import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comments from '../components/Comments';
import { useAuth } from '../context/AuthContext';


const OneArticle = () => {
    const [article, setArticle] = useState()
    const { id } = useParams();
    const [comments, setComments] = useState([])
    const auth = useAuth();

    useEffect(() => {

        axios.get(`http://localhost:9000/articles/${id}`)
        .then((res) => {
            setArticle(res.data)
            // setComments(res.data.comments)
        })
        .catch((res)=>{
            console.log(res.data);
        })
    }, [comments])
    
    //récupére le commentaire insrer par l'utilisateur
    const addComment = (newComment) => {
        setComments([...comments, newComment])
    }

    return (
        <main>
            {article && 
            <>
            <h1>{article.title}</h1>
            <em>{article.description}</em>
            <p>{article.author}</p>
            {article.image &&
            <img style={{width: "200px"}}src={`http://localhost:9000/assets/img/${article.image.src}`} alt={article.image.alt} />
            }

            {auth.user &&(
                <>
                <hr />
                <Comments updateComment={addComment} />
            <hr />
            {
                article.comments.map((oneComment, i) =>(
                    <>
                    <h2>{oneComment.pseudo}</h2>
                    <p> {oneComment.rating}</p>
                    <em>Posté le: {new Date(oneComment.date).toLocaleDateString()}</em>
                    </>
                ))
            }
            </>
            )}
            
            </>
            }
        </main>
    );
};

export default OneArticle;