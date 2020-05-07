let myLibrary = [];
        function Book(title,author,pages,read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }

        Book.prototype.info = function(){
            return "Title: "+this.title +"\r\nAuthor: "+this.author + "\r\nPages: "+this.pages + "\r\nRead: "+this.read;
        }
        Book.prototype.index = function(){
            return myLibrary.indexOf(this);
        }

        let newBook={};
        function addBookToLibrary(title,author,pages,read) {
            newBook = new Book(title,author,pages,read);
            if(myLibrary.length == 0){
                myLibrary.push(newBook);
            }
            else{
                    if(myLibrary.indexOf(null)>-1){
                        myLibrary[myLibrary.indexOf(null)]=newBook;
                    }
                    else{
                        myLibrary.push(newBook);
                    }
                }
                
           db.collection("books").add(newBook)
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            render();
        }

        function render(){
            
                let p = document.createElement('p');
                p.textContent = newBook.info();
                p.classList.add('book'+newBook.index());
                p.dataset.index = newBook.index();
                document.querySelector('#library').appendChild(p);

                let removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.classList.add("removeButton");
                p.appendChild(removeButton);

                let readButton = document.createElement("button");
                readButton.textContent = "Read";
                readButton.classList.add("readButton");
                p.appendChild(readButton);

                removeButton.addEventListener('click',function(){
                    document.querySelector("#library").removeChild(document.querySelector(`p.book${p.dataset.index}`));
                    myLibrary.splice(`${p.dataset.index}`,1,null);
                })

                readButton.addEventListener('click',function(){
                    let bookSlice = myLibrary.slice(`${p.dataset.index}`,`${p.dataset.index}`+1);
                    if(bookSlice[0].read == "yes"){
                        bookSlice[0].read = "no" 
                    }
                    else if(bookSlice[0].read=="no"){
                        bookSlice[0].read="yes"
                    }
                    p.textContent = bookSlice[0].info();
                    p.appendChild(removeButton);
                    p.appendChild(readButton);
                    console.log(myLibrary)
                })
        }

        let newBookButton = document.querySelector("#newBook");
        newBookButton.addEventListener('click',function(){
            let title = prompt("Add new title");
            let author = prompt("Add new author");
            let pages = prompt("Add number of pages");
            let read = prompt("Read or Not? (Yes/No)").toLowerCase();

            addBookToLibrary(title,author,pages,read);
        })
