const buscarController = (req, res) => {

    const { coleccion, termino } = req.params;

    res.status(200).json({
        coleccion,
        termino
    })
}

module.exports = buscarController