import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-eco-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './eco-feed.component.html',
  styleUrls: ['./eco-feed.component.css'],
})
export class EcoFeedComponent implements OnInit {
  content = '';
  type: 'tip' | 'article' | 'event' = 'tip';
  selectedFile: File | null = null;
  posts: any[] = [];
  commentInputs: Record<string, string> = {};
  showForm = false;

  user: any = null;
  token: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const userJson = localStorage.getItem('user');
    this.user = userJson ? JSON.parse(userJson) : null;
this.token = localStorage.getItem('auth_token');
    this.loadPosts();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  loadPosts() {
    this.http.get<any[]>('http://localhost:5000/api/posts').subscribe({
      next: (data) => (this.posts = data),
      error: (err) => {
        console.error('Failed to load posts', err);
        alert('Could not load feed.');
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  submitPost() {
    if (!this.token || !this.user?.id || !this.user?.name) {
      alert('Login required to post.');
      return;
    }

    const formData = new FormData();
    formData.append('content', this.content);
    formData.append('type', this.type);
    formData.append('user', JSON.stringify({ id: this.user.id, name: this.user.name }));
    if (this.selectedFile) formData.append('media', this.selectedFile);

    this.http.post('http://localhost:5000/api/posts', formData, {
      headers: { Authorization: `Bearer ${this.token}` },
    }).subscribe({
      next: () => {
        this.content = '';
        this.selectedFile = null;
        this.type = 'tip';
        this.loadPosts();
        this.showForm = false;
      },
      error: (err) => {
        console.error('Post failed', err);
        alert('Post failed. Ensure you are logged in.');
      }
    });
  }

  toggleLike(postId: string) {
    if (!this.token) return;

    this.http.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
      headers: { Authorization: `Bearer ${this.token}` },
    }).subscribe({
      next: () => this.loadPosts(),
      error: (err) => console.error('Like failed', err),
    });
  }

  addComment(postId: string, text: string) {
    if (!text.trim() || !this.token) return;

    this.http.post(`http://localhost:5000/api/posts/${postId}/comment`, { text }, {
      headers: { Authorization: `Bearer ${this.token}` },
    }).subscribe({
      next: () => {
        this.commentInputs[postId] = '';
        this.loadPosts();
      },
      error: (err) => console.error('Comment failed', err),
    });
  }

  deletePost(postId: string) {
    if (!this.token) return;

    if (!confirm('Are you sure you want to delete this post?')) return;

    this.http.delete(`http://localhost:5000/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    }).subscribe({
      next: () => this.loadPosts(),
      error: (err) => {
        console.error('Delete failed', err);
        alert('Failed to delete post.');
      },
    });
  }

  isOwner(post: any): boolean {
    return post.user?.id === this.user?.id;
  }
  // At the top of the class
expandedComments: Record<string, boolean> = {};

// Returns only first 2 comments unless expanded
getVisibleComments(post: any) {
  return this.expandedComments[post._id]
    ? post.comments
    : post.comments.slice(0, 2);
}

// Toggle comment section expand/collapse
toggleCommentExpansion(postId: string) {
  this.expandedComments[postId] = !this.expandedComments[postId];
}

// Count number of comments on a post
getCommentCount(post: any): number {
  return post.comments ? post.comments.length : 0;
}

}
