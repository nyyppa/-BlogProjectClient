export default class utils {
    removePost(id){
        console.log("remove id:" + id);
        /*
        ongelmia
         */
        fetch("http://localhost:8080/delete/" + id, {
            method: 'DELETE',
        });
    }
    addPost(id, author, text){

    }
}