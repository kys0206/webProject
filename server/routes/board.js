const express = require('express');
const router = express.Router();

const { Board } = require("../models/Board");

//=================================
//             Popular
//=================================

router.post('/', (req, res) => {

    //받아온 정보들을 DB에 넣어 준다.
    const board = new Board(req.body)

    board.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.post('/boards', (req, res) => {
    
    Board.find()
	// populate : writer의 모든 정보를 가져온다
        .populate('writer')
        .exec((err, boards) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, boards })
    });
});


module.exports = router;