'use client';
import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import style from './page.module.css';
import { Post } from '@/types';
import { useRouter } from 'next/navigation';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const router = useRouter();
  

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      const { data, error } = await supabase.from('board').select('*').eq('id', id).single();

      if (error) {
        setError('게시글을 가져오는 데 실패했습니다.');
      } else {
        setPost(data);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id || !post) return; // || !password

    if(password == "") {
      return alert('비밀번호를 입력하세요');
    };
    // 비밀번호 확인
    if (post.password !== password) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const { error } = await supabase.from('board').delete().eq('id', id);

    if (error) {
      setError('게시글 삭제에 실패했습니다.');
      console.log(error);
    } else {
      router.push(`/board/list/${post.type}`);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return (
      <div className={style.container}>
        <div className="w-1200">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className="w-1200">
        <div className={style.creation_hd_wrap}>
          <div className={style.creation_title_wrap}>
            <span>{post.type}</span>
            <h2>{post.title}</h2>
          </div>
          <div className={style.creation_info_wrap}>
            <p>작성자: {post.author}</p>
            <p>작성일: {post.creation_date}</p>
          </div>
        </div>
        <div className={style.creation_cont_wrap}>
          <p>{post.content}</p>
        </div>
        <div className={style.password_input_wrap}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className={style.creation_btn_wrap}>
          <button onClick={handleDelete} className={style.delete_btn}>
            삭제
          </button>
          <Link href={`/board/list/${post.type}`}>
            <span>목록</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
