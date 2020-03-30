export default class commentData{
    constructor(author, text) {
        this.AUTHOR = author;
        this.TEXT = text;
    }
    getAuthor(){
        return this.AUTHOR;
    }
    getText(){
        return this.TEXT;
    }
    setAuthor(uusi){
        this.AUTHOR = uusi;
    }
    setText(uusi){
        this.TEXT = uusi;
    }
}