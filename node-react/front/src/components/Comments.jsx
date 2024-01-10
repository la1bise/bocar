import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Stars from './Stars'
import { token } from '../context/token';

const Comments = ({updateComment}) => {
    const [inputs, setInputs] = useState({
        pseudo: "",
        comment: "",
        rating: 0
    })
const { id } = useParams();

const handleChange = (e) =>{
    const {name, value} = e.target;

    setInputs({...inputs, [name]: value})
}
const handleSubmit= (e) => {
    e.preventDefault();

    if(inputs.pseudo.trim() === ""
    || inputs.content.trim() === ""
    || inputs.rating < 0
    || inputs.rating > 5
    ){
        return console.log("veuillez remplir tous les champs")
    }

    axios.put(`http://localhost:9000/articles/${id}/new-comment`, inputs, {headers: token()})
    .then((res)=> {
        console.log(res.data);
        // I use props for refresh comments child to parents
        updateComment(inputs)
        //clear inputs after reading
        setInputs({
            pseudo: "",
            content: "",
            rating: 0
        })
        
    })
    .catch((res)=>{
        console.log(res.data);
    })
}
    return (
        <section>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pseudo">Pseudo</label>
                <input onChange={handleChange} value={inputs.pseudo} type="text" name="pseudo" id="pseudo" />
                <label htmlFor="content">Content</label>
                <textarea onChange={handleChange} value={inputs.content} name="content" id="content"></textarea>
                <label htmlFor="rating">Note</label>
                <Stars rating={inputs.rating} setRating={(rating) => setInputs({...inputs, rating})}/>
                <button>Envoyer</button>
            </form>
        </section>
    );
};

export default Comments;