enum ArticleState {
    published,
    designing,
    revising,
    editing,
    writing,
    researching,
    todo
}

interface Author {
    id:string;
    slug:string;
    firstname:string;
    lastname:string;
    profilePicture:string;
    email:string;
    biography:string;
}

interface Article {
    id:string;
    slug:string;
    title:string;
    summary:string;
    content:string;
    image:string;
    tags:string[];
    authorId:number;
    state:ArticleState;
}