
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Comment {
  id: number;
  name: string;
  content: string;
  date: string;
  avatar?: string;
  image?: string;
}

interface CommentSectionProps {
  recipeId: number;
  comments: Comment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ recipeId, comments: initialComments }) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim() || !content.trim()) {
      setError('Please provide your name and comment');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      const newComment: Comment = {
        id: comments.length + 1,
        name,
        content,
        date: new Date().toLocaleDateString(),
        image: imagePreview || undefined
      };
      
      setComments([...comments, newComment]);
      setName('');
      setContent('');
      setImage(null);
      setImagePreview(null);
      setIsSubmitting(false);
      
      // Show success message
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <div className="mt-12">
      <h2 className="font-serif text-2xl font-medium mb-6">Comments ({comments.length})</h2>
      
      {/* Comment Form */}
      <div className="bg-card rounded-md p-6 border border-border mb-8">
        <h3 className="font-serif text-xl font-medium mb-4">Leave a Comment</h3>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 bg-herb-50 text-herb-800 border-herb-200">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Your name"
              className="mt-1"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="comment">Comment</Label>
            <Textarea 
              id="comment" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Share your thoughts..."
              className="mt-1 min-h-24"
            />
          </div>
          
          <div className="mb-4">
            <Label htmlFor="image" className="block mb-1">Upload Image (optional)</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                className="flex items-center gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                {image ? 'Change Image' : 'Add Image'}
              </Button>
              <Input 
                id="image"
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {image && (
                <span className="text-sm text-muted-foreground">
                  {image.name.length > 20 ? image.name.substring(0, 20) + '...' : image.name}
                </span>
              )}
            </div>
            
            {imagePreview && (
              <div className="mt-3">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="h-24 rounded-md object-cover"
                />
              </div>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="bg-spice-500 hover:bg-spice-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </Button>
        </form>
      </div>
      
      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-muted-foreground italic">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-border pb-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between flex-wrap gap-2 mb-1">
                    <h4 className="font-medium">{comment.name}</h4>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  
                  <p className="text-foreground">{comment.content}</p>
                  
                  {comment.image && (
                    <div className="mt-3">
                      <img 
                        src={comment.image} 
                        alt={`Image by ${comment.name}`} 
                        className="max-h-40 rounded-md object-cover border border-border"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
