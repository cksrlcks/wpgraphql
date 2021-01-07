import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import PostCard from '../components/PostCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { css } from "@emotion/core";
import { BeatLoader } from "react-spinners";


const override = css`
    margin:0 auto;
    position:fixed;
    top:50%;
    left:50%;
    transform:translate(-50%);
    color:red;
`;
const GET_RECENT_POST = gql`
    query getRecentPost($cursor: String) {
        posts(first: 5, after: $cursor, where: {categoryName: "work"}) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                node {
                    date
                    author {
                        name
                    }
                    featuredImage {
                        mediaItemUrl
                    }
                    excerpt
                    id
                    title(format: RENDERED)
                    termSlugs(taxonomies: TAG)
                    termNames(taxonomies: CATEGORY)
                    tags {
                        nodes {
                            name
                        }
                    }
                }
            }
            __typename
        }
        }

`;

const Work = () => {

    const { loading, error, data, fetchMore } = useQuery(GET_RECENT_POST, {
        variables: {
            after: null
        },

    });

    const loadMore = () => {
        fetchMore({
            variables: {
                cursor: data.posts.pageInfo.endCursor
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.posts.edges;
                const pageInfo = fetchMoreResult.posts.pageInfo;
                if (!fetchMoreResult) {
                    return prev;
                }
                return {
                    posts: {
                        pageInfo,
                        edges: [...prev.posts.edges, ...newEdges],
                        __typename: "RootQueryToPostConnectionEdge"
                    }

                }
            }
        })
    }

    return (
        <>
            {error && <p className="error_message">리스트를 불러오는데 실패했습니다</p>}
            {!loading && data && data.posts && (
                <InfiniteScroll
                    dataLength={data.posts.edges.length}
                    next={loadMore}
                    hasMore={data.posts.pageInfo.hasNextPage}
                    loader={
                        <BeatLoader
                            css={override}
                            size={20}
                            color={"#01c080"}
                        />
                    }
                    endMessage={
                        <p className="end_message">
                            마지막 포스트입니다
                        </p>
                    }
                >
                    {data.posts.edges.map((post, i) => <PostCard post={post} key={i} />)}
                </InfiniteScroll>
            )
            }

        </>
    )
}

export default Work;