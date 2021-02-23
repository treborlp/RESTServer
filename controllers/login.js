const login = async(req, res) => {
    const post = req.body

    res.json({
        msj: post
    })

}

module.exports = login