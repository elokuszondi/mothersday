import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
}

interface CommentSectionProps {
  tributeId: string;
  currentUser: User | null;
}

const CommentSection: React.FC<CommentSectionProps> = ({ tributeId, currentUser }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchComments();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('comments')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'comments',
          filter: `tribute_id=eq.${tributeId}`
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setComments(prev => [payload.new as Comment, ...prev]);
          } else if (payload.eventType === 'DELETE') {
            setComments(prev => prev.filter(comment => comment.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [tributeId]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('tribute_id', tributeId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }

    setComments(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newComment.trim()) return;

    setLoading(true);
    const { error } = await supabase
      .from('comments')
      .insert([
        {
          tribute_id: tributeId,
          content: newComment.trim(),
          user_id: currentUser.id,
        },
      ]);

    if (error) {
      console.error('Error posting comment:', error);
    } else {
      setNewComment('');
    }
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    if (!currentUser) return;

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', currentUser.id);

    if (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-serif mb-6">Comments</h2>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-rose-200 focus:border-rose-300"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="mt-2 btn btn-primary"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      ) : (
        <p className="text-gray-600 mb-8">Please sign in to leave a comment.</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <p className="text-gray-700">{comment.content}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
              {currentUser?.id === comment.user_id && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-sm text-rose-500 hover:text-rose-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;