import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import Responsive from '../common/Responsive';
import SubInfo from '../common/SubInfo';
import Tags from '../common/Tags';

const PostListBlock = styled.div`
    margin-top: 3rem;
`;

const WritePostButtonWrapepr = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;
    
    /* 맨위 포스트는 padding-top 없음 */
    &:first-child {
        padding-top: 0;
    }
    & + & {
        border-top: 1px solid ${palette.gray[2]};
    }

    h2 {
        font-size: 2rem;
        margin-bottom: 0;
        margin-top: 0;
        &:hover {
            color: ${palette.gray[6]};
        }
    }
    p {
        margin-top: 2rem;
    }
`;

const PostItem = () => {
    return (
        <PostItemBlock>
            <h2>제목</h2>
            <SubInfo username="username" publishedDate={new Date()} /> 
            <Tags tags={['tag1', 'tag2', 'tag3']} />
            <p>포스트 내용</p>
        </PostItemBlock>
    )
};

const PostList = () => {
    return (
        <PostListBlock>
            <WritePostButtonWrapepr>
                <Button cyan to="/write">
                    새 글 작성하기
                </Button>
            </WritePostButtonWrapepr>
            <div>
                <PostItem />
                <PostItem />
            </div>
        </PostListBlock>
    );
};

export default PostList;