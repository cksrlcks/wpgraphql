import React from 'react';
import { NavLink } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Search from './Search';
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";

const override = css`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%);
`

const GET_PROFILE = gql`
{
    generalSettings {
    url
    description
    title
  }
}

`;

const Nav = () => {

    const { loading, data, error } = useQuery(GET_PROFILE);

    return (
        <aside className="aside">
            <section className="profile">
                {loading ? <BeatLoader
                    size={10}
                    css={override}
                    color={"#01c080"}
                /> :
                    <>
                        <figure className="site_pic"></figure>
                        <figure className="profile_pic">
                            <div className="frame">
                                <img src="https://www.gravatar.com/avatar/bdec2720f46316a7ae8fff2ef7739eb4?s=200" alt="" />
                            </div>
                        </figure>
                        <div className="site_info">
                            <h1 className="title">{data?.generalSettings.title}</h1>
                            <a href="https://heavybear.net" className="url" target="_blank" rel="noopener noreferrer">https://heavybear.net</a>
                            <p className="description" dangerouslySetInnerHTML={{ __html: data?.generalSettings.description }}></p>
                        </div>
                    </>
                }
                {error && <p class="error_message">데이터를 불러오는데 실패했습니다</p>}
            </section>
            <nav className="gnb">
                <ul className="gnb_item">
                    <li><NavLink exact to="/" activeClassName="active">Posts</NavLink></li>
                    <li><NavLink to="/Work" activeClassName="active">Work</NavLink></li>
                    <li><NavLink to="/Study" activeClassName="active">Study</NavLink></li>
                    <li><NavLink to="/Blog" activeClassName="active">Blog</NavLink></li>
                </ul>
            </nav>
            <Search />
        </aside>
    )
}

export default Nav
