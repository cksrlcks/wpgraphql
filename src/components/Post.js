import React, {useEffect} from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import '../css/post.scss';
import { faPen, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";
import parse, {domToReact} from 'html-react-parser';
import {PostCode} from '../components/PostCode';

const override = css`
    margin:0 auto;
    text-align:center;
`
const formatDate = date => new Date(date).toDateString();



const GET_SINGLE_POST = gql`
    query GetSinglePost($id: ID!){
        post(id: $id) {
            title(format: RENDERED)
            author {
                name
                }
            content(format: RENDERED)
            date
            id
            termNames(taxonomies: CATEGORY)
            tags {
                edges {
                    node {
                    id
                    }
                }
            }
        }   
  }
`;

const Post = ({ match, history }) => {
    const POST_ID = match.params.id;
    const { loading, error, data } = useQuery(GET_SINGLE_POST, {
        variables: { id: POST_ID }
    });
    const content = data?.post.content  ;

    const replaceCode = node => {
        if (node.name === 'pre') {
          return node.children.length > 0 && <PostCode language={getLanguage(node)}>{domToReact(getCode(node))}</PostCode>;
        }
      };
    
    const getLanguage = node => {
    if (node.attribs.class != null) {
        console.log(node.attribs.class);
        return node.attribs.class;
        
    }
    return null;
    };
    
    const getCode = node => {
    if (node.children.length > 0 && node.children[0].name === 'code') {
        return node.children[0].children;
    } else {
        return node.children;
    }
    };

    return (
        < div className="post_wrap" >
            {error ? <p className="error_message">포스트를 불러오는데 실패했습니다</p> :
                loading ? <BeatLoader
                    size={10}
                    css={override}
                    color={"#01c080"}
                /> :
                    <>
                        <button onClick={history.goBack} className="go_back"><FontAwesomeIcon icon={faArrowLeft} className="post_icon" /><i>List</i></button>
                        <h3 className="title">{data?.post?.title}</h3>
                        <div className="meta">
                            <p className="date"><FontAwesomeIcon icon={faCalendar} className="post_icon" />{formatDate(data?.post.date)}</p>
                            <p className="writer"><FontAwesomeIcon icon={faPen} className="post_icon" />{data?.post.author.name}</p>
                        </div>
                        
                        {/* <div className="content" dangerouslySetInnerHTML={content()}></div> */}
    <div className="content">{parse(content, {replace: replaceCode})}</div>
                    </>
            }

            
        </div >
    )

}

export default Post;
