// Don't install Node 17
// npm i -g @angular/cli@13.0.4
// ng new my-project --no-strict
// ng serve
// install Angular Essentials extension

// =============================================================================
// post-create.component.ts
// =============================================================================
// import { Component, EventEmitter, Output } from '@angular/core'
// import { ngForm } from '@angular/forms'
// // import Post model here

// @Component({
// 	selector: 'app-post-create',
// 	templateUrl: './post-create.component.html',
// })
// export class PostCreateComponent {
// 	// enteredValue = ''
// 	// newPost = ''
// 	enteredTitle = ''
// 	enteredContent = ''
// 	@Output() postCreated = new EventEmitter<Post>()

// 	onAddPost(form: NgForm) {
// 		// To set the value based on the ref
// 		// this.newPost = postInput.value

// 		// To set the value based on 2 way binding
// 		// this.newPost = this.enteredValue

// 		if (form.invalid()) {
// 			return
// 		}
// 		const post: Post = {
// 			// title: this.enteredTitle,
// 			// content: this.enteredContent,
// 			title: post.value.title,
// 			content: post.value.content,
// 		}

// 		this.postCreated.emit(post)
// 	}
// }



// TODO Add Angular Material to the project and formate the components as desired
// TODO Add a toolbar, textbox, an add post button, and style it


// =============================================================================
// post-list.component.ts
// =============================================================================
import { Component, Input } from '@angular/core'
// import Post model here
// import Posts service here

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
})
export class PostListComponent {

	@Input() posts: Post[] = []
	// postsService: PostsService

	// Inject service into the component via constructor
	// constructor(postsService: PostsService) {
	// 	this.postsService = postsService
	// }

	// Shorthand way to do above
	constructor(public postsService: PostsService) {}
	// Service must be added to providers array in app.module.ts if you don't make the service injectable
}

// =============================================================================
// app.component.ts
// =============================================================================
// import Post model here
// // add posts = [] to store the posts
// storedPosts: Post[] = []
// onPostAdded(post) {
// 	this.storedPosts.push(post)
// }

// =============================================================================
// post.model.ts
// =============================================================================
// export interface Post {
// 	title: string,
// 	content: string
// }

// =============================================================================
// posts.service.ts
// =============================================================================
// TODO Add posts/posts.service.ts
// Import Injectable from angular core here
// Import Post model here

// If you don't add the line below, you need to add it to the providers array in app.module.ts
@Injectable({ providedIn: 'root' })
export class PostsService {
	private posts: Post[] = []

	getPosts() {
		// Use spread operator to get a copy of the array
		return [...this.posts]
	}

	addPost(title: string, content: string) {
		const post: Post = { title, content }
		this.posts.push(post)
	}
}
