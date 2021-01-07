import React from 'react';
import { Link } from 'react-router-dom';
import '../css/post_card.scss';
import { faPen, faStickyNote } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const formatDate = date => new Date(date).toDateString();

const PostCard = ({ post }) => {


    const { title, date, author, featuredImage, excerpt, id, termNames, tags } = post.node;
    const summary = () => {
        return { __html: excerpt }
    }
    const postTitle = () => {
        return { __html: title }
    }

    return (
        <>
            <Link to={`/${termNames}/${id}`} className="post_card">
                {featuredImage && <figure className="poster"><img src={featuredImage.mediaItemUrl} alt={title} /></figure>}
                <h3 className="title" dangerouslySetInnerHTML={(postTitle())}></h3>
                <div dangerouslySetInnerHTML={(summary())} className="content"></div>
                {tags.nodes.length > 0 && <div className="terms">
                    {tags.nodes.map((tag, i) => <i className="tag" key={i}>{tag.name}</i>)}
                </div>}
                <div className="meta">
                    <p className="category"><FontAwesomeIcon icon={faStickyNote} className="post_icon" />{termNames}</p>
                    <p className="date"><FontAwesomeIcon icon={faCalendar} className="post_icon" />{formatDate(date)}</p>
                    <p className="writer"><FontAwesomeIcon icon={faPen} className="post_icon" />{author?.name}</p>
                </div>
            </Link>
        </>
    )
}

export default PostCard
