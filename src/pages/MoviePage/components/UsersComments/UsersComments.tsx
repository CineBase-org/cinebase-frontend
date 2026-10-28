import clsx from 'clsx';
import styles from './UsersComments.module.scss';
import { useAuth } from '../../../../contexts/AuthContext';
import { useState, type FormEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getComments, postComment } from '../../../../api/comments';
import { Link, useLocation } from 'react-router-dom';
import { Send, UserIcon } from 'lucide-react';

interface Props {
  movieId: number;
  className?: string;
}

export const UsersComments = ({ movieId, className }: Props) => {
  const {isAuthenticated, user} = useAuth();
  const location = useLocation();
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['comments', movieId],
    queryFn: () => getComments(movieId),
  });

  const commentsList = data?.results ?? [];

  const mutation = useMutation({
    mutationFn: (text: string) => postComment(movieId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', movieId] });
      setNewComment('');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;
    mutation.mutate(newComment);
  };

  return (
    <section 
      className={clsx(styles.box, className)}
      aria-label='Comments'
    >
      <h2 className={styles.title}>Comments</h2>

      <div className={styles.formContainer}>
        {!isAuthenticated ? (
          <div className={styles.authPrompt}>
            <p>You must be logged in to leave a comment.</p>
            <Link 
              to="/login" 
              className={styles.loginLink}
              state={{from: location.pathname}}
            >
              Log in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.commentForm}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <UserIcon size={20} />
              </div>

              <span className={styles.userName}>
                {user?.first_name || user?.last_name
                  ? `${user?.first_name} ${user?.last_name}`.trim()
                  : 'User CINEBASE'
                }
              </span>
            </div>

            <textarea
              className={styles.textarea}
              placeholder='Share your thoughts about this movie...'
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={mutation.isPending}
            />

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!newComment.trim() || mutation.isPending}
              >
                <Send size={16} />
                {mutation.isPending ? "Posting..." : "Post Comment"}
              </button>
            </div>
            {mutation.isError && (
              <p className={styles.error}>Failed to post comment. Please try again.</p>
            )}
          </form>
        )}
      </div>

      <div className={styles.commentsList}>
        {isLoading && <p className={styles.status}>Loading comments...</p>}

        {isError && <p className={styles.error}>Couldn't load comments.</p>}

        {!isLoading && !isError && commentsList.length === 0 ?(
          <p className={styles.empty}>No comments yet. Be the first to share your thoughts!</p>
        ) : (
          <ul className={styles.list}>
            {commentsList.map((comment) =>(
              <li key={comment.id} className={styles.commentItem}>
                <div className={styles.commentHeader}>
                  <div className={styles.avatarSmall}>
                    <UserIcon size={16} />
                  </div>
                  <span className={styles.commentAuthor}>
                    {comment.author || "Anonymous"}
                  </span>
                  <span className={styles.commentDate}>
                    {new Date(comment.created_at).toLocaleDateString()}
                  </span>
                </div>
                  <p className={styles.commentText}>{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};