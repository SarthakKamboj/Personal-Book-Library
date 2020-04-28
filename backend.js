
let isValid  = (inputElement) => {
    if (inputElement.value === "") {
        inputElement.parentElement.style.borderColor = "red"
        console.log
        return false
    } else {
        inputElement.parentElement.style.borderColor = "black"
    }
    return inputElement
}

window.addEventListener("load",()=>{
    const submit = document.querySelector('.submit')
    submit.addEventListener("click",()=>{
        const title = isValid(document.querySelector("#title"))
        const author = isValid(document.querySelector("#author"))
        const genre = isValid(document.querySelector("#genre"))
        const summary = isValid(document.querySelector("#summary"))
        const image = isValid(document.querySelector("#image"))

        if (!title || !author || !genre || !summary || !image) {
            return
        } else {
            let separator = "<>"

            localStorage.setItem(title.value,`${title.value}${separator}${author.value}${separator}${genre.value}${separator}${image.value}${separator}${summary.value}`)

            console.log(localStorage)

            title.value = ""
            author.value = ""
            genre.value = ""
            summary.value = ""
            image.value = ""
        }

    })

})