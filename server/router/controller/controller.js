exports.home = (request,response) => {
    response.render('main')
}

exports.uploads = (request,response,next) => {
    const files = request.files

    if(!files) {
        const error = new Error('Please choose files')
        error.httpStatusCode = 400;
        return next(error)
    }
    console.log("Error")
    response.json(files)
}