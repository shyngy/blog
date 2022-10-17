import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styles from './Article.module.css';
import LabelInput from '../LabelInput';
import Tags from '../Tags';
import { editArticle, getPostBySlug, newArticle } from '../../api/post';
import { ArticleProps, Tag, ArticleData } from './types';

const Article: React.FC<ArticleProps> = ({ articleTitle }) => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = React.useState(true);
  const [tags, setTags] = React.useState<Tag[]>([{ value: '', id: uuidv4() }]);
  const [error, setError] = React.useState(false);
  const formData = useForm<ArticleData>({
    mode: 'onBlur',
  });
  React.useEffect(() => {
    if (!document.cookie.includes('token')) {
      navigate('/');
    }
  }, [navigate]);

  React.useEffect(() => {
    setLoading(false);
    getPostBySlug(params.slug as string).then((data) => {
      const { title, description, body, tagList } = data.article;
      formData.setValue('title', title);
      formData.setValue('description', description);
      formData.setValue('body', body);
      setTags(
        tagList.map((item) => {
          const value = typeof item === 'string' ? item : '';
          return { value, id: uuidv4() };
        }),
      );
    });
  }, [params.slug, formData, navigate]);

  const addTag = () => {
    setTags((prev) => [...prev, { value: '', id: uuidv4() }]);
  };

  const deleteTag = (id: string) => {
    setTags((prev) => prev.filter((item) => item.id !== id));
  };

  const changeTagValue = (value: string, id: string) => {
    setTags((prev) => prev.map((item) => (item.id === id ? { value, id } : item)));
  };

  const onSubmit = formData.handleSubmit(({ title, description, body }) => {
    const articleBody = { title, description, body, tagList: tags.map((item) => item.value) };
    if (window.location.pathname.includes('/edit')) {
      editArticle(articleBody, params.slug as string)
        .then((data) => {
          navigate(`/articles/${data.article.slug}`);
        })
        .catch(() => {
          setError(true);
        });
    } else {
      newArticle(articleBody).then((data) => {
        navigate(`/articles/${data.article.slug}`);
      });
    }
  });

  if (loading) {
    return <>loading</>;
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.header}>{articleTitle}</h1>
      <LabelInput
        register={formData.register('title', {
          required: 'title is required',
        })}
        name="Title"
        type="text"
      />
      <LabelInput
        register={formData.register('description', {
          required: 'description is required',
        })}
        name="Short description"
        type="text"
      />
      <LabelInput
        isTextarea
        register={formData.register('body', {
          required: 'description is required',
        })}
        name="Text"
      />
      <Tags changeTagValue={changeTagValue} addTag={addTag} deleteTag={deleteTag} tags={tags} />

      <button onClick={onSubmit} className="button" name="send" type="button">
        Send
      </button>
      {error && (
        <div style={{ color: 'red', marginTop: '8px' }}>
          Forbidden error: Edit only your articles!
        </div>
      )}
    </section>
  );
};

export default Article;
