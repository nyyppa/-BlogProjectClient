export default class Post {
    constructor(id, author, text) {
        this.ID = id;
        this.AUTHOR = author;
        this.TEXT = text;
    }
    getID(){
        return this.ID;
    }
    getAuthor(){
        return this.AUTHOR;
    }
    getText(){
        return this.TEXT;
    }
    setText(uusi){
        this.TEXT = uusi;
    }
}