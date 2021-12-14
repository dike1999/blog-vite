/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Drawer, Divider, Spin } from 'antd';
import {
  MenuOutlined,
  ReadOutlined,
  EyeOutlined,
  CommentOutlined,
} from '@ant-design/icons';

import axios from '@/utils/axios';
import { translateMarkdown, calcCommentsCount } from '@/utils';
import useAjaxLoading from '@/hooks/useAjaxLoading';
import ArticleTag from '@/components/ArticleTag';
import Discuss from '@/components/Discuss';
import Navigation from './Navigation';
import './index.less';

const Article = ({ location, match, history }) => {
  const [loading, withLoading] = useAjaxLoading();

  const [article, setArticle] = useState({
    title: '',
    content: '',
    tags: [],
    categories: [],
    comments: [],
    createdAt: '',
    viewCount: 0,
  });
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const hash = decodeURI(location.hash);
      const ele = document.querySelector(`a[href="${hash}"]`);
      if (ele && hash) ele.click(); // 挂载时路由跳转到指定位置
    }, 800);
  }, []);

  useEffect(() => {
    withLoading(axios.get(`/article/${match.params.id}`))
      .then((res) => {
        res.content = translateMarkdown(res.content);
        setArticle(res);
      })
      .catch(() => {
        history.push('/404');
      });
  }, [match.params.id]);

  const setCommentList = (list) => {
    setArticle({ ...article, comments: list });
  };

  const {
    title, content, tags, categories, comments, createdAt, viewCount
  } = article;
  const articleId = parseInt(match.params.id, 10);
  const isFoldNavigation = useMediaQuery({ query: '(max-width: 1300px)' });
  return (
    <Spin tip='Loading...' spinning={loading}>
      <article
        className='app-article'
        style={{ paddingRight: isFoldNavigation ? 0 : 275 }}
      >
        <div className='post-header'>
          <h1 className='post-title'>{title}</h1>

          <div className='article-desc'>
            <span className='post-time'>
              <ReadOutlined />
              &nbsp; Posted on &nbsp;
              <span>{createdAt.slice(0, 10)}</span>
            </span>
            <ArticleTag tagList={tags} categoryList={categories} />
            <Divider type='vertical' />
            <a
              className='comment-count'
              href='#discuss'
              style={{ color: 'inherit' }}
            >
              <CommentOutlined style={{ marginRight: 2 }} />
              <span style={{ marginRight: 5 }}>
                {calcCommentsCount(comments)}
              </span>
            </a>
            <EyeOutlined style={{ marginRight: 2 }} />
            <span>{viewCount}</span>
          </div>
        </div>

        <div
          className='article-detail'
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {isFoldNavigation ? (
          <>
            <div className='drawer-btn' onClick={() => setDrawerVisible(true)}>
              <MenuOutlined className='nav-phone-icon' />
            </div>
            <Drawer
              title={title}
              placement='right'
              closable={false}
              onClose={() => setDrawerVisible(false)}
              visible={drawerVisible}
              getContainer={() => document.querySelector('.app-article')}
            >
              <div className='right-navigation'>
                <Navigation content={content} />
              </div>
            </Drawer>
          </>
        ) : (
          <nav className='article-navigation'>
            <Navigation content={content} />
          </nav>
        )}

        <Discuss
          articleId={articleId}
          commentList={comments}
          setCommentList={setCommentList}
        />
      </article>
    </Spin>
  );
};

export default Article;