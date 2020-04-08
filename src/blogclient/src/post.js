export default class Post {
    constructor(id, author, text, tags) {
        this.ID = id;
        this.AUTHOR = author;
        this.TEXT = text;
        this.TAGS = tags;
        this.TIME = "null";
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
    getTags(){
        return this.TAGS;
    }
    setTags(uusi){
        this.TAGS = uusi;
    }
    setTIME(value){
        let date = new Date(parseInt(value));
        this.TIME = date.toUTCString();
        console.log("time: " + this.TIME);
    }
    getTIME(){
        return this.TIME;
    }
}