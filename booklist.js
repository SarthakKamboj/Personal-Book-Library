
class Book {
    
    constructor(image,title,author,genre,summary) {
        this.image = image
        this.title = title
        this.author = author
        this.genre = genre
        this.summary = summary

        this.html = `
    <div class="book">
        <div class="image">
            <img src="${this.image}" alt="">
        </div>
        <div class="description">
            <div class="title">
                ${this.title}
            </div>
            <div class="author">
                ${this.author}
            </div>
            <div class="genre">
                Genre: ${this.genre}
            </div>
            <div class="summary">
                <span class="summaryTitle">Quick Summary</span><br class="line-break" />
                ${this.summary}    
            </div>
            <!-- <div class="read">
                Read
                <div class="emoji hidden">
                    <img src="images/read.png" alt="">
                </div>
            </div> -->
            <div class="clear">
                Remove Book
            </div>
        </div>
    </div>`
    }

    getHTML = () => {
        return this.html
    }

}

// let toggleRead = (readBtn=null) => {
//     readBtn.addEventListener("click",()=>{
//         const readEmoji = readBtn.querySelector(".emoji")
//         readEmoji.classList.toggle("hidden")
//         readEmoji.classList.toggle("visible")
//     })
    
// }


let getBooks = () => {
    const books = []
    let localStorageLength = localStorage.length;
    for (let index = 0; index < localStorageLength; index++) {
        let key = localStorage.key(index)
        let separator = "<>"
        let book = [...localStorage.getItem(key).split(separator)]
        let titleIndex = 0, authorIndex = 1, genreIndex = 2, imageIndex = 3, summaryIndex = 4;
        let title = book[titleIndex]
        let author = book[authorIndex]
        let genre = book[genreIndex]
        let image = book[imageIndex]
        let summary = book[summaryIndex]
        let newBook = new Book(image,title,author,genre,summary)
        books.push(newBook)
    }
    return books
}

let addBooksToHTML = (books) => {
    const bookList = document.querySelector(".book-list")
    books.forEach((newBook)=>{
        bookList.innerHTML += newBook.getHTML()
        // const readBtns = [...document.querySelectorAll(".read")]
        // const lastReadBtn = readBtns[readBtns.length-1]
        // toggleRead(lastReadBtn)
    })
}

let removeBook = () => {
    const removeBtns = [...document.querySelectorAll(".clear")]
    removeBtns.forEach((removeBtn)=>{
        removeBtn.addEventListener(("click"),()=>{
            let bookTitle = removeBtn.parentElement.querySelector(".title").innerText
            // console.log(bookTitle)
            localStorage.removeItem(bookTitle)
            let bookElement = removeBtn.parentElement.parentElement
            // console.log(bookElement)
            let bookListElement = document.querySelector(".book-list")
            bookListElement.removeChild(bookElement)
        })
        
    })
}

let searchBarAnimation = () => {
    let searchBar = document.querySelector(".search-bar")
    let searchBarRect = searchBar.getBoundingClientRect()
    window.addEventListener("click",(e)=>{
        console.log(searchBarRect)
        console.log(e)

        let searchBarX = searchBarRect.x
        let searchBarY = searchBarRect.y
        let searchBarWidth = searchBarRect.width
        let searchBarHeight = searchBarRect.height

        let clickX = e.clientX;
        let clickY = e.clientY;

        if (clickX > searchBarX && clickX < searchBarX+searchBarWidth) {
            if (clickY > searchBarY && clickY < searchBarY+searchBarHeight) {
                searchBar.classList.add("fullLengthBar")
            } else {
                searchBar.classList.remove("fullLengthBar")
            }
        } else {
            searchBar.classList.remove("fullLengthBar")
        }
        // let x = searchBarRect.x;
        // let y =searchBarRect.y;
        // let width = searchBar
    })
    // searchBar.addEventListener("click",(e)=>{
    //     searchBar.classList.toggle("fullLengthBar")
    //     console.log(searchBar.getBoundingClientRect())
    // })
    // searchBar.addEventListener("blur",()=>{
    //     console.log("not focused")
    //     searchBar.classList.remove("fullLengthBar")
    // })
}

let searchText = () => {
    let searchText = document.querySelector("#search")
    searchText.addEventListener("input",()=>{
        const books = [...document.querySelectorAll(".book")]
        books.forEach((book)=>{
            let title = book.querySelector(".description").querySelector(".title").innerText
            let searchValue = searchText.value.toLowerCase().trim();
            if (!title.toLowerCase().includes(searchValue)) {
                book.classList.add("hidden")
            } else {
                book.classList.remove("hidden")
            }
        })

    })

}


let searchBar = () => {
    searchBarAnimation()
    searchText()

}

window.addEventListener("load",()=>{
    const books = getBooks()
    addBooksToHTML(books)
    removeBook()
    searchBar()
})