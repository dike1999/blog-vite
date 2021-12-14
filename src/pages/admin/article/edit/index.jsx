import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FileSyncOutlined, PlusOutlined } from '@ant-design/icons';
// eslint-disable-next-line object-curly-newline
import { Button, Input, Modal, BackTop, message } from 'antd';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import axios from '@/utils/axios';
import { translateMarkdown } from '@/utils';
import useBreadcrumb from '@/hooks/useBreadcrumb';
import List from './Tag';
import './index.less';

const Edit = ({ match, history }) => {
  const store = useSelector((state) => ({
    tagList: state.article.tagList,
    categoryList: state.article.categoryList,
    authorId: state.user.userId,
  }));

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tagList, setTagList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagSelectedList, setTagSelectedList] = useState([]);
  const [cateSelectedList, setCateSelectedList] = useState([]);

  const editId = parseInt(match.params.id, 10);

  useBreadcrumb([
    { link: '/admin/article/manager', name: '文章管理' },
    editId ? '编辑文章' : '新增文章',
  ]);

  useEffect(() => {
    // mounted
    if (!editId) {
      const tags = store.tagList.map((d) => d.name).slice(0, 10);
      const cates = store.categoryList.map((d) => d.name).slice(0, 10);
      setTagList(tags);
      setCategoryList(cates);
      if (tags[0]) setTagSelectedList([tags[0]]);
      if (cates[0]) setCateSelectedList([cates[0]]);
    }
  }, [store.tagList, store.categoryList]);

  const fetchArticle = (id) => {
    axios.get(`/article/${id}?type=0`).then((res) => {
      setTitle(res.title);
      setContent(res.content);
      const tags = res.tags.map((d) => d.name);
      const categories = res.categories.map((d) => d.name);
      setTagList(tags);
      setCategoryList(categories);
      setTagSelectedList(tags);
      setCateSelectedList(categories);
    });
  };

  useEffect(() => {
    // did mounted
    if (editId) {
      fetchArticle(editId);
    }
  }, [match.params]);

  // eslint-disable-next-line consistent-return
  const add = () => {
    if (!title) return message.warning('标题不能为空！');
    axios
      .post('/article', {
        title,
        content,
        tagList: tagSelectedList,
        categoryList: cateSelectedList,
        authorId: store.authorId,
      })
      .then((res) => {
        Modal.confirm({
          title: '文章创建成功！是否立即查看？',
          onOk: () => history.push(`/article/${res.id}`),
        });
      });
  };

  const update = () => {
    axios
      .put(`/article/${editId}`, {
        title,
        content,
        tags: tagSelectedList,
        categories: cateSelectedList,
      })
      .then(() => {
        message.success('更新成功');
      });
  };

  return (
    <div className='admin-edit-article'>
      <ul className='form-list'>
        <li>
          <span className='label'>标题：</span>
          <span style={{ flex: 1 }}>
            <Input
              placeholder='请输入文章标题'
              className='title-input'
              name='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </span>
        </li>
        <li>
          <span className='label'>标签：</span>
          <span>
            <List
              list={tagList}
              setList={setTagList}
              selectedList={tagSelectedList}
              setSelectedList={setTagSelectedList}
            />
          </span>
        </li>
        <li>
          <span className='label'>分类：</span>
          <span>
            <List
              list={categoryList}
              setList={setCategoryList}
              selectedList={cateSelectedList}
              setSelectedList={setCateSelectedList}
            />
          </span>
        </li>
      </ul>

      <SimpleMDE
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
        options={{ autofocus: true, previewRender: translateMarkdown }}
      />

      <Button
        type='primary'
        shape='circle'
        size='large'
        disabled={!title}
        className='action-icon'
        title={editId ? '更新' : '新增'}
        icon={editId ? <FileSyncOutlined /> : <PlusOutlined />}
        onClick={() => {
          // eslint-disable-next-line no-unused-expressions
          editId ? update() : add();
        }}
      />
      <BackTop target={() => document.querySelector('.admin-content-wrap')} />
    </div>
  );
};

export default Edit;